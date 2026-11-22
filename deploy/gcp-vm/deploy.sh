#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/henotic-diagnostics"
RELEASES_DIR="$APP_DIR/.live-releases"
CURRENT_LINK="$APP_DIR/current"
DATA_DIR="$APP_DIR/data"
KEEP_RELEASES=2

cd "$APP_DIR"
mkdir -p "$RELEASES_DIR" "$DATA_DIR"

# Load .env.local for build-time Next.js configuration and NEXT_PUBLIC_* vars
if [[ -f "$APP_DIR/.env.local" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%$'\r'}"
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
    [[ "$line" == export\ * ]] && line="${line#export }"
    if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
      key="${BASH_REMATCH[1]}"
      val="${BASH_REMATCH[2]}"
      if [[ "$val" =~ ^\"(.*)\"$ ]]; then
        val="${BASH_REMATCH[1]}"
      elif [[ "$val" =~ ^\'(.*)\'$ ]]; then
        val="${BASH_REMATCH[1]}"
      fi
      export "$key=$val"
    fi
  done < "$APP_DIR/.env.local"
fi

# Strip Vercel/Turbo/Nx environment flags so static build output behaves strictly as self-hosted GCP VM
for v in $(env | awk -F= '/^(VERCEL($|_)|TURBO_|NX_DAEMON$)/ {print $1}'); do
  unset "$v" || true
done

echo "📦 Installing production & build dependencies..."
NODE_ENV=development npm install

echo "🏗️ Building Next.js standalone production bundle..."
NODE_OPTIONS="--max-old-space-size=4096" NEXT_TELEMETRY_DISABLED=1 npm run build

echo "📂 Copying public assets and static chunks into standalone bundle..."
rm -rf .next/standalone/public
cp -r public .next/standalone/public

mkdir -p .next/standalone/.next
rm -rf .next/standalone/.next/static
cp -r .next/static .next/standalone/.next/static

if [[ -f "src/lib/wordpress/failsafe-cache.json" && ! -f ".next/standalone/src/lib/wordpress/failsafe-cache.json" ]]; then
  mkdir -p .next/standalone/src/lib/wordpress
  cp "src/lib/wordpress/failsafe-cache.json" ".next/standalone/src/lib/wordpress/failsafe-cache.json"
fi

RELEASE_ID="$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"

echo "🔄 Activating release $RELEASE_ID..."
mv .next/standalone "$RELEASE_DIR"
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"

if pm2 describe henotic-web >/dev/null 2>&1; then
  echo "♻️ Reloading PM2 cluster (henotic-web)..."
  pm2 reload "$APP_DIR/ecosystem.config.cjs" --only henotic-web --update-env
else
  echo "🚀 Starting PM2 cluster (henotic-web)..."
  pm2 start "$APP_DIR/ecosystem.config.cjs" --only henotic-web
  pm2 save
fi

echo "🩺 Waiting for http://127.0.0.1:3000/api/health..."
HEALTHY=false
for attempt in $(seq 1 20); do
  if curl -sf "http://127.0.0.1:3000/api/health" >/dev/null 2>&1; then
    HEALTHY=true
    echo "✅ Health check passed (attempt $attempt/20)"
    break
  fi
  sleep 1.5
done

if [[ "$HEALTHY" != "true" ]]; then
  echo "❌ Health check failed after 20 attempts! Keeping previous releases intact for rollback." >&2
  pm2 logs henotic-web --lines 40 --nostream || true
  exit 1
fi

ACTIVE_RELEASE="$(readlink -f "$CURRENT_LINK" || true)"
mapfile -t RELEASES < <(ls -1dt "$RELEASES_DIR"/*/ 2>/dev/null || true)
if (( ${#RELEASES[@]} > KEEP_RELEASES )); then
  for old_rel in "${RELEASES[@]:KEEP_RELEASES}"; do
    old_rel="${old_rel%/}"
    if [[ -n "$ACTIVE_RELEASE" && "$(readlink -f "$old_rel")" == "$ACTIVE_RELEASE" ]]; then
      continue
    fi
    echo "🧹 Pruning old release: $old_rel"
    rm -rf "$old_rel"
  done
fi

echo "🧹 Enforcing ISR disk-cache cap and hourly prune cron..."
chmod +x "$APP_DIR/deploy/gcp-vm/prune-isr-cache.sh" || true
bash "$APP_DIR/deploy/gcp-vm/prune-isr-cache.sh" || true

if command -v crontab >/dev/null 2>&1; then
  ISR_CRON_LINE="15 * * * * /var/www/henotic-diagnostics/deploy/gcp-vm/prune-isr-cache.sh >> /var/log/pm2/isr-prune.log 2>&1"
  EXISTING_CRON="$(crontab -l 2>/dev/null || true)"
  if ! printf '%s\n' "$EXISTING_CRON" | grep -qxF "$ISR_CRON_LINE"; then
    FILTERED_CRON="$(printf '%s\n' "$EXISTING_CRON" | grep -vF "prune-isr-cache.sh" || true)"
    {
      [[ -n "$FILTERED_CRON" ]] && printf '%s\n' "$FILTERED_CRON"
      printf '%s\n' "$ISR_CRON_LINE"
    } | crontab - || true
  fi
fi

echo "🎉 Deployment complete: $RELEASE_ID"
