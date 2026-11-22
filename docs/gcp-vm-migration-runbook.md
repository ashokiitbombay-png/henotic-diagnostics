# GCP VM Migration Runbook (`vercel` → `henotic-nextjs-vm`)

Target infrastructure & recorded access details:
- **VM Name**: `henotic-nextjs-vm` (Instance ID `2029526192489311940`)
- **Zone**: `asia-south1-c`
- **Machine Type**: `e2-standard-2` (2 vCPUs, 8 GB RAM, 80 GB Balanced SSD)
- **OS**: Debian 13 (Trixie) `x86_64`
- **`GCP_VM_IP` (Reserved External IP)**: `34.100.203.56` (`nextjs-reserve-ip`)
- **`GCP_VM_USER` (SSH User)**: `ashokiitbombay`
- **App Directory**: `/var/www/henotic-diagnostics`
- **Production Domains**: `www.henoticdiagnostics.com` (canonical), `henoticdiagnostics.com` (301 → `www`)
- **GitHub Deploy Keys Settings**: `https://github.com/ashokiitbombay-png/henotic-diagnostics/settings/keys`
- **GitHub Deploy Key Title**: `gcp-vm-henotic` (Write access enabled)
- **GitHub Deploy Key Public Key**: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOC9gxlczBnD+wkCoa3+Bhn2sxqx9wuZb1xsOlgz3Wio gcp-vm-github`
- **GitHub Actions Secrets Settings**: `https://github.com/ashokiitbombay-png/henotic-diagnostics/settings/secrets/actions`
- **GitHub Actions Repository Secrets**: `GCP_VM_IP` (`34.100.203.56`), `GCP_VM_USER` (`ashokiitbombay`), `GCP_SSH_KEY` (private key from `~/.ssh/github_deploy_key`, stored only in GitHub Secrets)
- **GitHub Actions SSH Key Public Key (`~/.ssh/github_deploy_key.pub`)**: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEMrFpGLduMaM7zlkHLav77VzIX1bnqpytwglTX4S445 github-actions@henotic-nextjs-vm`

---

## 1. One-Shot VM Bootstrap (`ashokiitbombay@henotic-nextjs-vm`)

First, stage from branch `experiment-pseo-routing` while keeping `main` protected until staging passes.

### Option A — Repository is public (or HTTPS accessible)

```bash
sudo mkdir -p /var/www/henotic-diagnostics
sudo chown -R "$USER:$USER" /var/www/henotic-diagnostics
git clone --branch experiment-pseo-routing --single-branch \
  https://github.com/ashokiitbombay-png/henotic-diagnostics.git \
  /var/www/henotic-diagnostics
cd /var/www/henotic-diagnostics
chmod +x deploy/gcp-vm/setup-vm.sh deploy/gcp-vm/deploy.sh deploy/gcp-vm/rollback.sh
./deploy/gcp-vm/setup-vm.sh
```

### Option B — Repository is private (use GitHub Deploy Key `gcp-vm-henotic`)

Recorded VM public key (`gcp-vm-henotic`):

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOC9gxlczBnD+wkCoa3+Bhn2sxqx9wuZb1xsOlgz3Wio gcp-vm-github
```

To enable write access (needed when pushing commits from the VM) or recreate the key:
1. Open [https://github.com/ashokiitbombay-png/henotic-diagnostics/settings/keys](https://github.com/ashokiitbombay-png/henotic-diagnostics/settings/keys).
2. Delete existing `gcp-vm-henotic` (if previously added without write access) and click **Add deploy key** with:
   - **Title**: `gcp-vm-henotic`
   - **Key**: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOC9gxlczBnD+wkCoa3+Bhn2sxqx9wuZb1xsOlgz3Wio gcp-vm-github`
   - Check **Allow write access** if you need to push commits from the VM.
3. If the keypair does not exist on a fresh VM, generate it with:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "gcp-vm-github" -N "" -f ~/.ssh/github_repo_deploy_key
cat ~/.ssh/github_repo_deploy_key.pub
```

Then configure SSH for GitHub and clone via SSH:

```bash
cat << 'EOF' >> ~/.ssh/config
Host github.com
  IdentityFile ~/.ssh/github_repo_deploy_key
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config

sudo mkdir -p /var/www/henotic-diagnostics
sudo chown -R "$USER:$USER" /var/www/henotic-diagnostics
git clone --branch experiment-pseo-routing --single-branch \
  git@github.com:ashokiitbombay-png/henotic-diagnostics.git \
  /var/www/henotic-diagnostics
cd /var/www/henotic-diagnostics
chmod +x deploy/gcp-vm/setup-vm.sh deploy/gcp-vm/deploy.sh deploy/gcp-vm/rollback.sh
./deploy/gcp-vm/setup-vm.sh
```

> **Note**: When using SSH `git@github.com:...`, GitHub Actions can later run `git fetch` / `git checkout` seamlessly without credentials prompts.

---

## 2. Environment Variables Checklist (`/var/www/henotic-diagnostics/.env.local`)

Create `/var/www/henotic-diagnostics/.env.local` (`chmod 600 /var/www/henotic-diagnostics/.env.local`) with your real production credentials.

### Required / Currently Used Keys
- `NEXT_PUBLIC_SITE_URL=https://www.henoticdiagnostics.com`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_APP_NAME`
- `WORDPRESS_API_URL=https://cms.henoticdiagnostics.com/graphql`
- `NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.henoticdiagnostics.com/graphql`
- `NEXT_PUBLIC_WORDPRESS_URL`
- `REVALIDATION_SECRET`
- `WEBHOOK_SIGNING_SECRET`
- `PAYLOAD_SECRET`
- `PAYLOAD_WEBHOOK_SECRET`
- `PAYLOAD_CMS_URL`
- `MONGODB_URI`
- `MONGODB_USERNAME`
- `MONGODB_PASSWORD`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_GTM_ID`

### Optional / Additional Keys (from `.env.example` & integrations)
- `ADMIN_EXPORT_TOKEN`, `ADMIN_TASK_TOKEN`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `ADMIN_EMAIL`
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`
- `WHATSAPP_API_URL`, `WHATSAPP_API_TOKEN`
- `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_FB_PIXEL_ID`, `NEXT_PUBLIC_TAWKTO_ID`, `NEXT_PUBLIC_TAWKTO_WIDGET_ID`, `NEXT_PUBLIC_GA4_ID`
- `CRM_API_URL`, `CRM_API_KEY`

> [!CAUTION]
> **DO NOT** copy `VERCEL`, `VERCEL_ENV`, `VERCEL_URL`, `VERCEL_OIDC_TOKEN`, `VERCEL_TARGET_ENV`, `VERCEL_GIT_*`, `TURBO_*`, or `NX_DAEMON` from local `vercel env pull` files into the VM `.env.local`. Setting `VERCEL=1` activates Vercel Analytics (`/_vercel/insights/script.js` 404s) and `/tmp` ephemeral lead storage instead of `/var/www/henotic-diagnostics/data`.

---

## 3. Initial Build, PM2 Start & Pre-DNS Staging Verification

Run the first deployment on the VM:

```bash
cd /var/www/henotic-diagnostics
./deploy/gcp-vm/deploy.sh
pm2 status
```

Verify directly on the VM (`34.100.203.56`) before changing any public DNS records:

```bash
# 1. Health check directly against Node.js & through Nginx
curl -sf http://127.0.0.1:3000/api/health
curl -sf http://127.0.0.1/api/health

# 2. Trailing slash & canonical URL checks (must return 200 without redirecting to /)
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/services/mri-scan

# 3. Verify 301/308 redirects match Vercel behavior
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/services/pet-scan
curl -sI -A "Mozilla/5.0" -H "Host: henoticdiagnostics.com" http://127.0.0.1/services/mri-scan

# 4. Verify Nginx proxy cache transitions MISS -> HIT on second browser GET
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/services/mri-scan | grep -i x-cache-status
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/services/mri-scan | grep -i x-cache-status

# 5. Verify sitemaps, sw.js, and booking-system
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/sitemap.xml
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/sw.js
curl -sI -A "Mozilla/5.0" -H "Host: www.henoticdiagnostics.com" http://127.0.0.1/booking-system
```

Optional browser smoke test from your local Windows machine: temporarily map `34.100.203.56 www.henoticdiagnostics.com` in `C:\Windows\System32\drivers\etc\hosts` and browse `http://www.henoticdiagnostics.com` (remove the hosts entry once tested).

---

## 4. GitHub Actions Secrets Setup

On the VM, print the generated private SSH deploy key (`~/.ssh/github_deploy_key`):

```bash
cat ~/.ssh/github_deploy_key
```

In [https://github.com/ashokiitbombay-png/henotic-diagnostics/settings/secrets/actions](https://github.com/ashokiitbombay-png/henotic-diagnostics/settings/secrets/actions) (**GitHub Repo → Settings → Secrets and variables → Actions → New repository secret**), configure:
- `GCP_VM_IP` = `34.100.203.56`
- `GCP_VM_USER` = `ashokiitbombay`
- `GCP_SSH_KEY` = full **private key** contents of `~/.ssh/github_deploy_key` (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`) — never commit the private key to Git.

Recorded matching public key (`~/.ssh/github_deploy_key.pub`, authorized in `~/.ssh/authorized_keys` on `henotic-nextjs-vm`):

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEMrFpGLduMaM7zlkHLav77VzIX1bnqpytwglTX4S445 github-actions@henotic-nextjs-vm
```

> [!IMPORTANT]
> The `ssh-ed25519 ... github-actions@henotic-nextjs-vm` string above is the **public key** (`~/.ssh/github_deploy_key.pub`) recorded safely here for verification. In GitHub Repository Secrets, `GCP_SSH_KEY` (used by `appleboy/ssh-action@v1.0.3` in `.github/workflows/deploy.yml`) **must** contain the corresponding **private key** printed by `cat ~/.ssh/github_deploy_key`.

You can test the GitHub Actions workflow before merging to `main` via **Actions → Deploy Henotic Diagnostics to GCP VM → Run workflow → branch: `experiment-pseo-routing`**.

---

## 5. Merge `experiment-pseo-routing` → `main`

Once pre-DNS staging passes cleanly:
1. Open a Pull Request from `experiment-pseo-routing` into `main` on GitHub and merge it.
2. Verify the `Deploy Henotic Diagnostics to GCP VM` workflow triggers automatically on push to `main` and succeeds.
3. Confirm the VM is tracking `main`:
   ```bash
   cd /var/www/henotic-diagnostics && git branch --show-current
   ```

---

## 6. Zero-Downtime DNS Cutover & HTTPS (Certbot)

1. **Lower DNS TTL**: At least 1–2 hours before cutover, lower the TTL on `@` and `www` DNS records to `300` seconds.
2. **Update DNS A Records**:
   - `@` (`henoticdiagnostics.com`) → `A` → `34.100.203.56`
   - `www` (`www.henoticdiagnostics.com`) → `A` → `34.100.203.56`
   - Remove Vercel CNAME (`cname.vercel-dns.com`) if replacing `www` with an `A` record.
3. **Wait for DNS propagation**, then provision Let's Encrypt TLS certificates via Certbot:
   ```bash
   sudo certbot --nginx -d www.henoticdiagnostics.com -d henoticdiagnostics.com
   ```
   Verify auto-renewal timer is active:
   ```bash
   sudo systemctl status certbot.timer
   sudo certbot renew --dry-run
   ```

---

## 7. GCP Egress Billing Optimization (Important for 500k Crawls)

GCP Compute Engine `asia-south1` internet egress costs roughly **\$0.12/GB** (after minimal free tier). During 500k-page Googlebot / Bingbot / user spikes, serving HTML and static assets directly from the VM can generate noticeable egress charges.

**Recommended setup (free)**:
1. Front `34.100.203.56` with **Cloudflare Free** (orange-cloud proxied DNS for `@` and `www`, SSL mode **Full (strict)** after Certbot is installed).
2. Benefits:
   - Bandwidth served from Cloudflare Edge cache incurs **\$0 GCP egress** (Cloudflare absorbs cacheable HTML, `/_next/static/*`, sitemaps, and public assets).
   - Cloudflare Bot Fight Mode / WAF blocks abusive scrapers before they ever hit `34.100.203.56`.
   - Ensure Cloudflare does **not** strip `User-Agent` or cache `/api/*`, `/sw.js`, `/booking-system/*`, or requests carrying `RSC` / `Next-Router-State-Tree` headers (Cloudflare respects `Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url` sent by Next.js 16).

---

## 8. Post-Cutover Verification & Rollback Checklist

- **SEO & URL parity**:
  - `https://www.henoticdiagnostics.com/services/mri-scan` returns HTTP `200` (no trailing slash redirect).
  - `https://www.henoticdiagnostics.com/services/mri-scan/` redirects cleanly matching `trailingSlash: false`.
  - `https://henoticdiagnostics.com/...` returns `301` → `https://www.henoticdiagnostics.com/...`.
  - `https://www.henoticdiagnostics.com/sitemap.xml` and `/sitemap/0.xml` return HTTP `200` (`application/xml`).
- **App functionality**:
  - `/booking-system`, `/sw.js`, `/api/health`, `/api/booking`, `/api/payment/create-order`, and `/api/revalidate/webhook` work as expected.
  - Persistent leads/payments/inquiries write to `/var/www/henotic-diagnostics/data/*.jsonl` (surviving deployments).
  - Check logs: `pm2 logs henotic-web --lines 100` and `sudo tail -n 50 /var/log/nginx/error.log`.
- **Instant Rollback**:
  If a bad release reaches production:
  ```bash
  cd /var/www/henotic-diagnostics && ./deploy/gcp-vm/rollback.sh
  ```
- **Vercel Teardown**:
  Keep Vercel project untouched (without active domain DNS) for **48–72 hours** as a warm fallback while DNS caches expire globally, then downgrade/remove the Vercel hosting deployment once GCP VM traffic and Search Console crawl stats remain healthy.
