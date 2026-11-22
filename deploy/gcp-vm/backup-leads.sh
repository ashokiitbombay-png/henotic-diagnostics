#!/usr/bin/env bash
set -euo pipefail

# Daily off-box/local archive backup for persistent JSONL lead, payment, and inquiry logs.
# Uploads compressed tar.gz archives to GCS when GCS_BACKUP_BUCKET is configured, while
# maintaining local compressed archive retention in all cases.

APP_DIR="${APP_DIR:-/var/www/henotic-diagnostics}"
LOCK_FILE="/tmp/henotic-backup-leads.lock"

if command -v flock >/dev/null 2>&1; then
  exec 9>"$LOCK_FILE"
  if ! flock -n 9; then
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] Another backup instance is running; skipping."
    exit 0
  fi
fi

# Safely load only backup-related settings from .env.local without logging values
if [[ -f "$APP_DIR/.env.local" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    line="${line%$'\r'}"
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
    [[ "$line" == export\ * ]] && line="${line#export }"
    if [[ "$line" =~ ^(LEAD_DATA_DIR|GCS_BACKUP_BUCKET|BACKUP_RETENTION_DAYS|BACKUP_DIR)=(.*)$ ]]; then
      key="${BASH_REMATCH[1]}"
      val="${BASH_REMATCH[2]}"
      if [[ "$val" =~ ^\"(.*)\"$ ]]; then
        val="${BASH_REMATCH[1]}"
      elif [[ "$val" =~ ^\'(.*)\'$ ]]; then
        val="${BASH_REMATCH[1]}"
      fi
      if [[ -z "${!key:-}" ]]; then
        export "$key=$val"
      fi
    fi
  done < "$APP_DIR/.env.local"
fi

DATA_DIR="${LEAD_DATA_DIR:-$APP_DIR/data}"
BACKUP_DIR="${BACKUP_DIR:-$APP_DIR/backups}"
BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-30}"
GCS_BACKUP_BUCKET="${GCS_BACKUP_BUCKET:-}"

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"

if [[ ! -d "$DATA_DIR" ]]; then
  echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] Data directory not found ($DATA_DIR); nothing to back up."
  exit 0
fi

mapfile -t JSONL_FILES < <(find "$DATA_DIR" -maxdepth 1 -type f -name '*.jsonl' -printf '%f\n' 2>/dev/null || true)
if (( ${#JSONL_FILES[@]} == 0 )); then
  echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] No *.jsonl files in $DATA_DIR; skipping archive."
  exit 0
fi

TIMESTAMP="$(date -u +%Y%m%d-%H%M%S)"
ARCHIVE_PATH="$BACKUP_DIR/leads-${TIMESTAMP}.tar.gz"

tar -czf "$ARCHIVE_PATH" -C "$DATA_DIR" "${JSONL_FILES[@]}"
chmod 600 "$ARCHIVE_PATH"
ARCHIVE_SIZE="$(du -h "$ARCHIVE_PATH" | awk '{print $1}')"
echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] Created archive $ARCHIVE_PATH (${ARCHIVE_SIZE}, ${#JSONL_FILES[@]} file(s))."

if [[ -n "$GCS_BACKUP_BUCKET" ]]; then
  BUCKET_PATH="${GCS_BACKUP_BUCKET#gs://}"
  BUCKET_PATH="${BUCKET_PATH%/}"
  GCS_DEST="gs://${BUCKET_PATH}/leads/$(basename "$ARCHIVE_PATH")"

  if command -v gcloud >/dev/null 2>&1; then
    if gcloud storage cp "$ARCHIVE_PATH" "$GCS_DEST" --quiet; then
      echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] Uploaded to $GCS_DEST via gcloud storage."
    else
      echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] WARNING: GCS upload failed via gcloud storage; local archive retained at $ARCHIVE_PATH." >&2
    fi
  elif command -v gsutil >/dev/null 2>&1; then
    if gsutil -q cp "$ARCHIVE_PATH" "$GCS_DEST"; then
      echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] Uploaded to $GCS_DEST via gsutil."
    else
      echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] WARNING: GCS upload failed via gsutil; local archive retained at $ARCHIVE_PATH." >&2
    fi
  else
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] [backup-leads] WARNING: GCS_BACKUP_BUCKET configured but neither gcloud nor gsutil is installed; local archive retained." >&2
  fi
fi

if [[ "$BACKUP_RETENTION_DAYS" =~ ^[0-9]+$ ]] && (( BACKUP_RETENTION_DAYS > 0 )); then
  find "$BACKUP_DIR" -maxdepth 1 -type f -name 'leads-*.tar.gz' -mtime +"$BACKUP_RETENTION_DAYS" -delete 2>/dev/null || true
fi
