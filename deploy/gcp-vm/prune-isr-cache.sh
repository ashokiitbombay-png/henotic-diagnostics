#!/usr/bin/env bash
set -euo pipefail

# Bounded LRU + age-based ISR disk-cache pruner for self-hosted Next.js 16.4.6 standalone releases.
# Covers all three Next.js 16 runtime ISR/fetch cache directories on the GCP VM:
#   - .next/server/route-cache
#   - .next/cache
#   - .next/server/app/services (strictly ISR route outputs; never .js/.json/manifests)
# Keeps server.js, runtime .env.local, .next/static, public/, and data/ completely untouched.

APP_DIR="${APP_DIR:-/var/www/henotic-diagnostics}"
CURRENT_LINK="$APP_DIR/current"
RELEASES_DIR="$APP_DIR/.live-releases"

MAX_ISR_CACHE_MB="${MAX_ISR_CACHE_MB:-1536}"
TARGET_ISR_CACHE_MB="${TARGET_ISR_CACHE_MB:-1024}"
INACTIVE_ISR_CAP_MB="${INACTIVE_ISR_CAP_MB:-128}"
INACTIVE_ISR_TARGET_MB="${INACTIVE_ISR_TARGET_MB:-64}"
MAX_AGE_DAYS="${MAX_AGE_DAYS:-7}"
DISK_WARN_PCT="${DISK_WARN_PCT:-75}"
INODE_WARN_PCT="${INODE_WARN_PCT:-75}"
EMERGENCY_PCT="${EMERGENCY_PCT:-90}"

# Resilient flock lock acquisition (handles Debian 13 fs.protected_regular=2 in /tmp)
LOCK_FILE="/tmp/henotic-isr-prune.lock"
LOCK_HELD=false
if command -v flock >/dev/null 2>&1; then
  if exec 9>"$LOCK_FILE" 2>/dev/null; then
    LOCK_HELD=true
  elif [[ -d "$APP_DIR" ]] && exec 9>"$APP_DIR/.isr-prune.lock" 2>/dev/null; then
    LOCK_HELD=true
  fi
  if [[ "$LOCK_HELD" == "true" ]]; then
    if ! flock -n 9; then
      echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [isr-prune] Another prune instance is running; skipping."
      exit 0
    fi
  fi
fi

# Inspect filesystem usage (disk blocks + inodes) where APP_DIR resides (fallback to /)
DF_TARGET="$APP_DIR"
[[ -d "$DF_TARGET" ]] || DF_TARGET="/"
DISK_PCT="$(df -P "$DF_TARGET" | awk 'NR==2 {gsub(/%/, "", $5); print $5 + 0}')"
INODE_PCT="$(df -Pi "$DF_TARGET" | awk 'NR==2 {gsub(/%/, "", $5); print $5 + 0}')"

ACTIVE_CAP_MB="$MAX_ISR_CACHE_MB"
ACTIVE_TARGET_MB="$TARGET_ISR_CACHE_MB"
if (( DISK_PCT >= DISK_WARN_PCT || INODE_PCT >= INODE_WARN_PCT )); then
  (( ACTIVE_CAP_MB > 768 )) && ACTIVE_CAP_MB=768
  (( ACTIVE_TARGET_MB > 384 )) && ACTIVE_TARGET_MB=384
  if [[ -d /var/cache/nginx/henotic ]]; then
    find /var/cache/nginx/henotic -type f -mmin +120 -delete 2>/dev/null || true
  fi
fi

if (( ACTIVE_TARGET_MB > ACTIVE_CAP_MB )); then
  ACTIVE_TARGET_MB="$ACTIVE_CAP_MB"
fi
if (( INACTIVE_ISR_TARGET_MB > INACTIVE_ISR_CAP_MB )); then
  INACTIVE_ISR_TARGET_MB="$INACTIVE_ISR_CAP_MB"
fi

has_any_cache_dir() {
  local release_dir="$1"
  [[ -d "$release_dir/.next/server/route-cache" || -d "$release_dir/.next/cache" || -d "$release_dir/.next/server/app/services" ]]
}

release_cache_size_kb() {
  local release_dir="$1"
  local -a dirs=()
  [[ -d "$release_dir/.next/server/route-cache" ]] && dirs+=("$release_dir/.next/server/route-cache")
  [[ -d "$release_dir/.next/cache" ]] && dirs+=("$release_dir/.next/cache")
  [[ -d "$release_dir/.next/server/app/services" ]] && dirs+=("$release_dir/.next/server/app/services")
  if (( ${#dirs[@]} == 0 )); then
    echo 0
    return 0
  fi
  du -sk "${dirs[@]}" 2>/dev/null | awk '{sum += $1} END {print sum + 0}'
}

list_release_cache_files() {
  local release_dir="$1"
  local route_cache_dir="$release_dir/.next/server/route-cache"
  local next_cache_dir="$release_dir/.next/cache"
  local services_dir="$release_dir/.next/server/app/services"

  if [[ -d "$route_cache_dir" ]]; then
    find "$route_cache_dir" -type f -printf '%T@\t%s\t%p\n' 2>/dev/null || true
  fi

  if [[ -d "$next_cache_dir" ]]; then
    find "$next_cache_dir" -type f -printf '%T@\t%s\t%p\n' 2>/dev/null || true
  fi

  if [[ -d "$services_dir" ]]; then
    # Only match regular Next.js ISR route output files — never .js, .json, or build manifests.
    find "$services_dir" -type f \( \
      -name '*.prefetch.rsc' -o \
      -name '*.segment.rsc' -o \
      -name '*.html' -o \
      -name '*.rsc' -o \
      -name '*.meta' -o \
      -name '*.body' \
    \) -printf '%T@\t%s\t%p\n' 2>/dev/null || true
  fi
}

cleanup_empty_cache_dirs() {
  local release_dir="$1"
  local d
  for d in \
    "$release_dir/.next/server/route-cache" \
    "$release_dir/.next/cache" \
    "$release_dir/.next/server/app/services"; do
    [[ -d "$d" ]] && find "$d" -mindepth 1 -type d -empty -delete 2>/dev/null || true
  done
}

emergency_clear_release_caches() {
  local release_dir="$1"
  local route_cache_dir="$release_dir/.next/server/route-cache"
  local next_cache_dir="$release_dir/.next/cache"
  local services_dir="$release_dir/.next/server/app/services"

  if [[ -d "$route_cache_dir" ]]; then
    find "$route_cache_dir" -type f -delete 2>/dev/null || true
  fi
  if [[ -d "$next_cache_dir" ]]; then
    find "$next_cache_dir" -type f -delete 2>/dev/null || true
  fi
  if [[ -d "$services_dir" ]]; then
    find "$services_dir" -type f \( \
      -name '*.prefetch.rsc' -o \
      -name '*.segment.rsc' -o \
      -name '*.html' -o \
      -name '*.rsc' -o \
      -name '*.meta' -o \
      -name '*.body' \
    \) -delete 2>/dev/null || true
  fi
  cleanup_empty_cache_dirs "$release_dir"

  if [[ -d /var/cache/nginx/henotic ]]; then
    find /var/cache/nginx/henotic -type f -delete 2>/dev/null || true
  fi
}

prune_release_caches() {
  local role="$1"
  local release_dir="$2"
  local cap_mb="$3"
  local target_mb="$4"

  if ! has_any_cache_dir "$release_dir"; then
    return 0
  fi

  local before_kb before_mb now_epoch cutoff_epoch removed_count=0
  before_kb="$(release_cache_size_kb "$release_dir")"
  before_mb=$(( before_kb / 1024 ))

  # Emergency zero-tempfile clear: avoids mktemp/sort failing with ENOSPC when disk or inodes >= EMERGENCY_PCT
  if (( DISK_PCT >= EMERGENCY_PCT || INODE_PCT >= EMERGENCY_PCT )); then
    emergency_clear_release_caches "$release_dir"
    local after_emg_kb after_emg_mb
    after_emg_kb="$(release_cache_size_kb "$release_dir")"
    after_emg_mb=$(( after_emg_kb / 1024 ))
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [isr-prune] EMERGENCY disk=${DISK_PCT}% inodes=${INODE_PCT}% (${role} $(basename "$release_dir")): before=${before_mb}MB (${before_kb}KB) after=${after_emg_mb}MB (in-place clear)"
    return 0
  fi

  now_epoch="$(date +%s)"
  cutoff_epoch=$(( now_epoch - MAX_AGE_DAYS * 86400 ))

  local tmp_expired tmp_stems tmp_evict
  tmp_expired="$(mktemp)"
  tmp_stems="$(mktemp)"
  tmp_evict="$(mktemp)"
  trap 'rm -f "$tmp_expired" "$tmp_stems" "$tmp_evict"' RETURN

  # Phase 1: Age-based eviction (evict entire route stem atomically if newest sibling > MAX_AGE_DAYS)
  if (( MAX_AGE_DAYS > 0 )); then
    list_release_cache_files "$release_dir" | awk -F'\t' -v cutoff="$cutoff_epoch" '
      function get_stem(p,   s) {
        s = p
        if (s ~ /\.prefetch\.rsc$/) { sub(/\.prefetch\.rsc$/, "", s); return s }
        if (s ~ /\.segment\.rsc$/) {
          sub(/\.segment\.rsc$/, "", s)
          sub(/\.segments\/.*$/, "", s)
          return s
        }
        sub(/\.(html|rsc|meta|body)$/, "", s)
        return s
      }
      {
        mtime = $1 + 0
        path = $3
        stem = get_stem(path)
        if (!(stem in max_mtime) || mtime > max_mtime[stem]) {
          max_mtime[stem] = mtime
        }
        files[stem] = (stem in files) ? (files[stem] "\n" path) : path
      }
      END {
        for (stem in max_mtime) {
          if (max_mtime[stem] < cutoff) {
            print files[stem]
          }
        }
      }
    ' > "$tmp_expired"

    if [[ -s "$tmp_expired" ]]; then
      local expired_lines
      expired_lines="$(wc -l < "$tmp_expired" | awk '{print $1 + 0}')"
      removed_count=$(( removed_count + expired_lines ))
      xargs -r -d '\n' rm -f -- < "$tmp_expired"
    fi
  fi

  # Phase 2: Size-cap eviction (LRU oldest-first by newest sibling mtime until <= target_mb)
  local current_kb cap_kb target_kb
  current_kb="$(release_cache_size_kb "$release_dir")"
  cap_kb=$(( cap_mb * 1024 ))
  target_kb=$(( target_mb * 1024 ))

  if (( current_kb > cap_kb )); then
    list_release_cache_files "$release_dir" | awk -F'\t' '
      function get_stem(p,   s) {
        s = p
        if (s ~ /\.prefetch\.rsc$/) { sub(/\.prefetch\.rsc$/, "", s); return s }
        if (s ~ /\.segment\.rsc$/) {
          sub(/\.segment\.rsc$/, "", s)
          sub(/\.segments\/.*$/, "", s)
          return s
        }
        sub(/\.(html|rsc|meta|body)$/, "", s)
        return s
      }
      {
        mtime = $1 + 0
        bytes = $2 + 0
        path = $3
        stem = get_stem(path)
        if (!(stem in max_mtime) || mtime > max_mtime[stem]) {
          max_mtime[stem] = mtime
        }
        stem_bytes[stem] += bytes
        if (stem in files) {
          files[stem] = files[stem] "\034" path
        } else {
          files[stem] = path
        }
      }
      END {
        for (stem in max_mtime) {
          printf "%.3f\t%d\t%s\n", max_mtime[stem], stem_bytes[stem], files[stem]
        }
      }
    ' | sort -n > "$tmp_stems"

    local need_kb=$(( current_kb - target_kb ))
    awk -F'\t' -v need_kb="$need_kb" '
      BEGIN { freed_bytes = 0; need_bytes = need_kb * 1024 }
      {
        if (freed_bytes >= need_bytes) exit 0
        freed_bytes += ($2 + 0)
        n = split($3, arr, "\034")
        for (i = 1; i <= n; i++) {
          if (arr[i] != "") print arr[i]
        }
      }
    ' "$tmp_stems" > "$tmp_evict"

    if [[ -s "$tmp_evict" ]]; then
      local evicted_lines
      evicted_lines="$(wc -l < "$tmp_evict" | awk '{print $1 + 0}')"
      removed_count=$(( removed_count + evicted_lines ))
      xargs -r -d '\n' rm -f -- < "$tmp_evict"
    fi
  fi

  cleanup_empty_cache_dirs "$release_dir"

  local after_kb after_mb
  after_kb="$(release_cache_size_kb "$release_dir")"
  after_mb=$(( after_kb / 1024 ))
  echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [isr-prune] disk=${DISK_PCT}% inodes=${INODE_PCT}% (${role} $(basename "$release_dir")): before=${before_mb}MB (${before_kb}KB) after=${after_mb}MB (${after_kb}KB) cap=${cap_mb}MB target=${target_mb}MB removed_files=${removed_count}"

  rm -f "$tmp_expired" "$tmp_stems" "$tmp_evict"
  trap - RETURN
}

ACTIVE_RELEASE=""
if [[ -L "$CURRENT_LINK" || -d "$CURRENT_LINK" ]]; then
  ACTIVE_RELEASE="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"
fi

if [[ -n "$ACTIVE_RELEASE" && -d "$ACTIVE_RELEASE" ]]; then
  prune_release_caches "active" "$ACTIVE_RELEASE" "$ACTIVE_CAP_MB" "$ACTIVE_TARGET_MB"
fi

if [[ -d "$RELEASES_DIR" ]]; then
  for rel in "$RELEASES_DIR"/*/; do
    [[ -d "$rel" ]] || continue
    rel_real="$(readlink -f "${rel%/}" 2>/dev/null || true)"
    [[ -n "$rel_real" ]] || continue
    if [[ -n "$ACTIVE_RELEASE" && "$rel_real" == "$ACTIVE_RELEASE" ]]; then
      continue
    fi
    prune_release_caches "inactive" "$rel_real" "$INACTIVE_ISR_CAP_MB" "$INACTIVE_ISR_TARGET_MB"
  done
fi
