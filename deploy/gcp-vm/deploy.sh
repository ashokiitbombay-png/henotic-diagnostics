#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/henotic-diagnostics"
RELEASES_DIR="$APP_DIR/.live-releases"
CURRENT_LINK="$APP_DIR/current"
DATA_DIR="$APP_DIR/data"
KEEP_RELEASES=2

cd "$APP_DIR"
mkdir -p "$RELEASES_DIR" "$DATA_DIR"

if [[ ! -s "$APP_DIR/.env.local" ]]; then
  echo "❌ Refusing to deploy: $APP_DIR/.env.local is missing or empty (runtime secrets would be wiped)." >&2
  exit 1
fi

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

# Clean any leftover build artifacts from prior interrupted builds before installing & rebuilding
rm -rf "$APP_DIR/.next" || true

echo "📦 Installing production & build dependencies..."
NODE_ENV=development npm ci

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

PREV_RELEASE="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"
RELEASE_ID="$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"

echo "🔄 Activating release $RELEASE_ID..."
mv .next/standalone "$RELEASE_DIR"
if [[ ! -s "$APP_DIR/.env.local" ]]; then
  echo "❌ Refusing to activate release $RELEASE_ID: $APP_DIR/.env.local is missing or empty." >&2
  rm -rf "$RELEASE_DIR" || true
  exit 1
fi
cp "$APP_DIR/.env.local" "$RELEASE_DIR/.env.local"
chmod 600 "$RELEASE_DIR/.env.local"
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"

# Purge leftover .next build cache & npm download cache immediately (live PM2 runs from $CURRENT_LINK)
rm -rf "$APP_DIR/.next" "$HOME/.npm/_cacache" "$HOME/.npm/_logs" 2>/dev/null || true

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
  echo "❌ Health check failed after 20 attempts!" >&2
  pm2 logs henotic-web --lines 40 --nostream || true
  if [[ -n "$PREV_RELEASE" && -d "$PREV_RELEASE" && -f "$PREV_RELEASE/server.js" && "$PREV_RELEASE" != "$RELEASE_DIR" ]]; then
    echo "⏪ Automatically rolling back to previous healthy release: $PREV_RELEASE" >&2
    ln -sfn "$PREV_RELEASE" "$CURRENT_LINK"
    pm2 reload "$APP_DIR/ecosystem.config.cjs" --only henotic-web --update-env || true
    rm -rf "$RELEASE_DIR" || true
    for rb_attempt in $(seq 1 15); do
      if curl -sf "http://127.0.0.1:3000/api/health" >/dev/null 2>&1; then
        echo "✅ Automatic rollback succeeded ($PREV_RELEASE)" >&2
        break
      fi
      sleep 1
    done
  else
    echo "⚠️ No valid previous release available for automatic rollback; keeping current state." >&2
  fi
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

echo "🧹 Enforcing ISR disk-cache cap, 10-minute prune cron & daily lead backup cron..."
chmod +x "$APP_DIR/deploy/gcp-vm/prune-isr-cache.sh" "$APP_DIR/deploy/gcp-vm/backup-leads.sh" || true

ensure_cron_job() {
  local marker="$1"
  local cron_line="$2"
  local existing filtered
  existing="$(crontab -l 2>/dev/null || true)"
  if ! printf '%s\n' "$existing" | grep -qxF "$cron_line"; then
    filtered="$(printf '%s\n' "$existing" | grep -vF "$marker" || true)"
    {
      [[ -n "$filtered" ]] && printf '%s\n' "$filtered"
      printf '%s\n' "$cron_line"
    } | crontab - || true
  fi
}

remove_cron_job() {
  local marker="$1"
  local existing filtered
  existing="$(crontab -l 2>/dev/null || true)"
  if printf '%s\n' "$existing" | grep -qF "$marker"; then
    filtered="$(printf '%s\n' "$existing" | grep -vF "$marker" || true)"
    if [[ -n "$filtered" ]]; then
      printf '%s\n' "$filtered" | crontab - || true
    else
      crontab -r 2>/dev/null || true
    fi
  fi
}

if sudo -n true 2>/dev/null; then
  sudo -n install -m 0755 "$APP_DIR/deploy/gcp-vm/prune-isr-cache.sh" /usr/local/bin/prune-isr-cache.sh
  printf '%s\n' \
    'SHELL=/bin/bash' \
    'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' \
    '*/10 * * * * root /usr/local/bin/prune-isr-cache.sh >> /var/log/pm2/isr-prune.log 2>&1' \
    | sudo -n tee /etc/cron.d/henotic-prune-isr >/dev/null
  sudo -n chown root:root /etc/cron.d/henotic-prune-isr
  sudo -n chmod 0644 /etc/cron.d/henotic-prune-isr
  sudo -n /usr/local/bin/prune-isr-cache.sh || true
  if command -v crontab >/dev/null 2>&1; then
    remove_cron_job "prune-isr-cache.sh"
  fi
else
  bash "$APP_DIR/deploy/gcp-vm/prune-isr-cache.sh" || true
  if command -v crontab >/dev/null 2>&1; then
    ensure_cron_job "prune-isr-cache.sh" "*/10 * * * * /var/www/henotic-diagnostics/deploy/gcp-vm/prune-isr-cache.sh >> /var/log/pm2/isr-prune.log 2>&1"
  fi
fi

if command -v crontab >/dev/null 2>&1; then
  ensure_cron_job "backup-leads.sh" "30 2 * * * /var/www/henotic-diagnostics/deploy/gcp-vm/backup-leads.sh >> /var/log/pm2/backup-leads.log 2>&1"
fi

# Sync live Nginx cache directives safely without disturbing Certbot 443 TLS config, flush stale proxy cache, and purge Cloudflare if configured
NGINX_SITE_FILE="/etc/nginx/sites-available/henotic-diagnostics"
if [[ -f "$NGINX_SITE_FILE" ]] && sudo -n true 2>/dev/null; then
  sudo -n cp "$NGINX_SITE_FILE" "${NGINX_SITE_FILE}.bak"
  sudo -n sed -i -E \
    -e 's/max_size=(10g|2g)/max_size=1g/g' \
    -e 's/proxy_cache_valid[[:space:]]+200[[:space:]]+10m;/proxy_cache_valid 200 1h;/g' \
    -e 's/proxy_cache_valid[[:space:]]+301[[:space:]]+302[[:space:]]+1h;/proxy_cache_valid 301 302 308 1h;/g' \
    "$NGINX_SITE_FILE"
  if sudo -n nginx -t 2>/dev/null; then
    sudo -n systemctl reload nginx || true
    sudo -n rm -f "${NGINX_SITE_FILE}.bak"
    echo "🔧 Verified & reloaded Nginx config (max_size=1g, 200 TTL=1h)"
  else
    echo "⚠️ Nginx config test failed after patch; restoring backup!" >&2
    sudo -n mv "${NGINX_SITE_FILE}.bak" "$NGINX_SITE_FILE" || true
  fi
fi

if [[ -d /var/cache/nginx/henotic ]]; then
  find /var/cache/nginx/henotic -type f -delete 2>/dev/null || sudo -n find /var/cache/nginx/henotic -type f -delete 2>/dev/null || true
  echo "🧹 Flushed stale Nginx proxy cache entries under /var/cache/nginx/henotic"
fi

if [[ -n "${CLOUDFLARE_ZONE_ID:-}" && -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  CF_STATUS="$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}' || echo "000")"
  echo "☁️ Cloudflare cache purge HTTP status: $CF_STATUS"
else
  echo "ℹ️ CLOUDFLARE_ZONE_ID/CLOUDFLARE_API_TOKEN not set; skipping Cloudflare API purge."
fi

git gc --auto 2>/dev/null || true

echo "=== Post-deploy disk space (df -h /) ==="
df -h / || true

echo "🎉 Deployment complete: $RELEASE_ID"
