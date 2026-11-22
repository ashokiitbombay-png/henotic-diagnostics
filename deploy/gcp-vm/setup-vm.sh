#!/usr/bin/env bash
set -euo pipefail

# Idempotent bootstrap for henotic-nextjs-vm (Debian 13 Trixie, e2-standard-2, 8 GB RAM)
APP_DIR="/var/www/henotic-diagnostics"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "=== Step 1/8: Configure 4 GB swapfile & sysctl ==="
if ! swapon --show | grep -q '/swapfile'; then
  if [[ ! -f /swapfile ]]; then
    sudo fallocate -l 4G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
  fi
  sudo swapon /swapfile
fi

if ! grep -q '^/swapfile ' /etc/fstab; then
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
fi

echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-henotic.conf >/dev/null
sudo sysctl -p /etc/sysctl.d/99-henotic.conf

echo "=== Step 2/8: Install system packages ==="
sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
  curl ca-certificates gnupg git nginx certbot python3-certbot-nginx \
  ufw fail2ban build-essential unattended-upgrades

echo "=== Step 3/8: Install Node.js 22 LTS ==="
NEED_NODE=false
if ! command -v node >/dev/null 2>&1; then
  NEED_NODE=true
else
  NODE_MAJOR="$(node -v | sed -E 's/^v([0-9]+).*/\1/')"
  if (( NODE_MAJOR < 20 )); then
    NEED_NODE=true
  fi
fi

if [[ "$NEED_NODE" == "true" ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "Node.js version: $(node -v), npm version: $(npm -v)"

echo "=== Step 4/8: Install PM2, pm2-logrotate & systemd startup ==="
if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm install -g pm2
fi

sudo mkdir -p /var/log/pm2
sudo chown -R "$USER:$USER" /var/log/pm2

pm2 install pm2-logrotate || true
pm2 set pm2-logrotate:max_size 20M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true

STARTUP_CMD="$(pm2 startup systemd -u "$USER" --hp "$HOME" 2>&1 | grep -E '^[[:space:]]*sudo ' | tail -n 1 || true)"
if [[ -n "$STARTUP_CMD" ]]; then
  eval "$STARTUP_CMD"
fi

echo "=== Step 5/8: Configure UFW firewall ==="
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "=== Step 6/8: Prepare application, data, backup & Nginx cache directories ==="
sudo mkdir -p "$APP_DIR" "$APP_DIR/data" "$APP_DIR/backups" "$APP_DIR/.live-releases" /var/cache/nginx/henotic /var/www/html
sudo chown -R "$USER:$USER" "$APP_DIR"
chmod 700 "$APP_DIR/backups"
sudo usermod -aG www-data "$USER" || true
sudo chown -R www-data:www-data /var/cache/nginx/henotic
sudo chmod 775 /var/cache/nginx/henotic

echo "=== Step 7/8: Configure Ed25519 SSH key for GitHub Actions ==="
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"
DEPLOY_KEY="$HOME/.ssh/github_deploy_key"
if [[ ! -f "$DEPLOY_KEY" ]]; then
  ssh-keygen -t ed25519 -C "github-actions@henotic-nextjs-vm" -N "" -f "$DEPLOY_KEY"
fi

touch "$HOME/.ssh/authorized_keys"
chmod 600 "$HOME/.ssh/authorized_keys"
PUB_KEY="$(cat "${DEPLOY_KEY}.pub")"
if ! grep -qxF "$PUB_KEY" "$HOME/.ssh/authorized_keys"; then
  echo "$PUB_KEY" >> "$HOME/.ssh/authorized_keys"
fi

echo "=== Step 8/8: Install & reload Nginx reverse proxy + maintenance crons ==="
chmod +x "$REPO_ROOT/deploy/gcp-vm/prune-isr-cache.sh" "$REPO_ROOT/deploy/gcp-vm/backup-leads.sh" || true

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

if command -v crontab >/dev/null 2>&1; then
  ensure_cron_job "prune-isr-cache.sh" "15 * * * * /var/www/henotic-diagnostics/deploy/gcp-vm/prune-isr-cache.sh >> /var/log/pm2/isr-prune.log 2>&1"
  ensure_cron_job "backup-leads.sh" "30 2 * * * /var/www/henotic-diagnostics/deploy/gcp-vm/backup-leads.sh >> /var/log/pm2/backup-leads.log 2>&1"
fi

NGINX_SITE_FILE="/etc/nginx/sites-available/henotic-diagnostics"
if [[ -f "$NGINX_SITE_FILE" ]] && grep -qE 'ssl_certificate|managed by Certbot|listen[[:space:]]+(\[::\]:)?443' "$NGINX_SITE_FILE"; then
  echo "⚠️  Existing Nginx site config has active TLS / Certbot 443 directives — skipping copy to preserve HTTPS config."
else
  sudo cp "$REPO_ROOT/deploy/gcp-vm/nginx-henotic.conf" "$NGINX_SITE_FILE"
fi
sudo ln -sfn "$NGINX_SITE_FILE" /etc/nginx/sites-enabled/henotic-diagnostics
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx

echo ""
echo "================================================================="
echo "✅ GCP VM setup complete!"
echo "================================================================="
echo "Next steps:"
echo "  1. Create & populate $APP_DIR/.env.local (WITHOUT VERCEL* vars)."
echo "  2. Run your first build & start PM2:"
echo "       cd $APP_DIR && chmod +x deploy/gcp-vm/deploy.sh deploy/gcp-vm/rollback.sh && ./deploy/gcp-vm/deploy.sh"
echo "  3. Verify locally on VM:"
echo "       curl -sf http://127.0.0.1:3000/api/health"
echo "       curl -I -A 'Mozilla/5.0' -H 'Host: www.henoticdiagnostics.com' http://127.0.0.1/"
echo "  4. Add GitHub Actions secrets in repo settings:"
echo "       GCP_VM_IP   = 34.100.203.56"
echo "       GCP_VM_USER = $USER"
echo "       GCP_SSH_KEY = output of: cat ~/.ssh/github_deploy_key"
echo "  5. After updating DNS A records to 34.100.203.56, enable HTTPS:"
echo "       sudo certbot --nginx -d www.henoticdiagnostics.com -d henoticdiagnostics.com"
echo "================================================================="
