#!/usr/bin/env bash
set -euo pipefail

# Bounded LRU + age-based ISR disk-cache pruner for self-hosted Next.js standalone releases.
# Guards against unbounded growth of .next/server/app/services on the GCP VM while keeping
# .js, .json manifests, server.js, and .next/static completely untouched.

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

LOCK_FILE="/tmp/henotic-isr-prune.lock"
if command -v flock >/dev/null 2>&1; then
  exec 9>"$LOCK_FILE"
  if ! flock -n 9; then
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [isr-prune] Another prune instance is running; skipping."
    exit 0
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

dir_size_mb() {
  local dir="$1"
  du -sm "$dir" 2>/dev/null | awk '{print $1 + 0}'
}

dir_size_kb() {
  local dir="$1"
  du -sk "$dir" 2>/dev/null | awk '{print $1 + 0}'
}

list_isr_files() {
  local services_dir="$1"
  # Only match regular Next.js ISR route output files — never .js, .json, or build manifests.
  find "$services_dir" -type f \( \
    -name '*.prefetch.rsc' -o \
    -name '*.segment.rsc' -o \
    -name '*.html' -o \
    -name '*.rsc' -o \
    -name '*.meta' -o \
    -name '*.body' \
  \) -printf '%T@\t%s\t%p\n' 2>/dev/null || true
}

prune_services_cache() {
  local role="$1"
  local release_dir="$2"
  local cap_mb="$3"
  local target_mb="$4"
  local services_dir="$release_dir/.next/server/app/services"

  if [[ ! -d "$services_dir" ]]; then
    return 0
  fi

  local before_mb before_kb now_epoch cutoff_epoch removed_count=0
  before_mb="$(dir_size_mb "$services_dir")"
  before_kb="$(dir_size_kb "$services_dir")"

  # Emergency zero-tempfile clear: avoids mktemp/sort failing with ENOSPC when disk or inodes >= EMERGENCY_PCT
  if (( DISK_PCT >= EMERGENCY_PCT || INODE_PCT >= EMERGENCY_PCT )); then
    find "$services_dir" -type f \( \
      -name '*.prefetch.rsc' -o \
      -name '*.segment.rsc' -o \
      -name '*.html' -o \
      -name '*.rsc' -o \
      -name '*.meta' -o \
      -name '*.body' \
    \) -delete 2>/dev/null || true
    find "$services_dir" -mindepth 1 -type d -empty -delete 2>/dev/null || true
    local after_emg_mb
    after_emg_mb="$(dir_size_mb "$services_dir")"
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [isr-prune] EMERGENCY disk=${DISK_PCT}% inodes=${INODE_PCT}% (${role} $(basename "$release_dir")): before=${before_mb}MB after=${after_emg_mb}MB (in-place clear)"
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
    list_isr_files "$services_dir" | awk -F'\t' -v cutoff="$cutoff_epoch" '
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
  current_kb="$(dir_size_kb "$services_dir")"
  cap_kb=$(( cap_mb * 1024 ))
  target_kb=$(( target_mb * 1024 ))

  if (( current_kb > cap_kb )); then
    list_isr_files "$services_dir" | awk -F'\t' '
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

  find "$services_dir" -mindepth 1 -type d -empty -delete 2>/dev/null || true

  local after_mb
  after_mb="$(dir_size_mb "$services_dir")"
  echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [isr-prune] disk=${DISK_PCT}% (${role} $(basename "$release_dir")): before=${before_mb}MB (${before_kb}KB) after=${after_mb}MB cap=${cap_mb}MB target=${target_mb}MB removed_files=${removed_count}"

  rm -f "$tmp_expired" "$tmp_stems" "$tmp_evict"
  trap - RETURN
}

ACTIVE_RELEASE=""
if [[ -L "$CURRENT_LINK" || -d "$CURRENT_LINK" ]]; then
  ACTIVE_RELEASE="$(readlink -f "$CURRENT_LINK" 2>/dev/null || true)"
fi

if [[ -n "$ACTIVE_RELEASE" && -d "$ACTIVE_RELEASE" ]]; then
  prune_services_cache "active" "$ACTIVE_RELEASE" "$ACTIVE_CAP_MB" "$ACTIVE_TARGET_MB"
fi

if [[ -d "$RELEASES_DIR" ]]; then
  for rel in "$RELEASES_DIR"/*/; do
    [[ -d "$rel" ]] || continue
    rel_real="$(readlink -f "${rel%/}" 2>/dev/null || true)"
    [[ -n "$rel_real" ]] || continue
    if [[ -n "$ACTIVE_RELEASE" && "$rel_real" == "$ACTIVE_RELEASE" ]]; then
      continue
    fi
    prune_services_cache "inactive" "$rel_real" "$INACTIVE_ISR_CAP_MB" "$INACTIVE_ISR_TARGET_MB"
  done
fi
