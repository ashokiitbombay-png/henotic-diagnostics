#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/henotic-diagnostics"
RELEASES_DIR="$APP_DIR/.live-releases"
CURRENT_LINK="$APP_DIR/current"

if [[ ! -d "$RELEASES_DIR" ]]; then
  echo "❌ Releases directory not found: $RELEASES_DIR" >&2
  exit 1
fi

ACTIVE_RELEASE="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"
mapfile -t RELEASES < <(ls -1dt "$RELEASES_DIR"/*/ 2>/dev/null || true)

if (( ${#RELEASES[@]} < 2 )); then
  echo "❌ No previous release available in $RELEASES_DIR to roll back to." >&2
  exit 1
fi

PREV_RELEASE=""
for idx in "${!RELEASES[@]}"; do
  rel="${RELEASES[$idx]%/}"
  rel_real="$(readlink -f "$rel")"
  if [[ "$rel_real" == "$ACTIVE_RELEASE" ]]; then
    next_idx=$((idx + 1))
    if (( next_idx < ${#RELEASES[@]} )); then
      PREV_RELEASE="${RELEASES[$next_idx]%/}"
    fi
    break
  fi
done

# Fallback: if active symlink target wasn't in sorted list, pick newest non-active release
if [[ -z "$PREV_RELEASE" ]]; then
  for rel in "${RELEASES[@]}"; do
    rel="${rel%/}"
    if [[ "$(readlink -f "$rel")" != "$ACTIVE_RELEASE" ]]; then
      PREV_RELEASE="$rel"
      break
    fi
  done
fi

if [[ -z "$PREV_RELEASE" || ! -f "$PREV_RELEASE/server.js" ]]; then
  echo "❌ Valid previous release with server.js could not be located." >&2
  exit 1
fi

echo "⏪ Rolling back from ${ACTIVE_RELEASE:-none} -> $PREV_RELEASE"
ln -sfn "$PREV_RELEASE" "$CURRENT_LINK"
pm2 reload "$APP_DIR/ecosystem.config.cjs" --only henotic-web --update-env

for attempt in $(seq 1 20); do
  if curl -sf "http://127.0.0.1:3000/api/health" >/dev/null 2>&1; then
    echo "✅ Rollback healthy on attempt $attempt/20 ($PREV_RELEASE)"
    exit 0
  fi
  sleep 1.5
done

echo "❌ Health check failed after rollback!" >&2
pm2 logs henotic-web --lines 40 --nostream || true
exit 1
