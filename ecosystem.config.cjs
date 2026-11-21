const fs = require('fs');
const path = require('path');

/**
 * Lightweight .env.local parser for PM2 so runtime secrets stay on the VM
 * without requiring an external dotenv dependency.
 * Explicitly excludes Vercel/Turbo/Nx build-only variables.
 */
function loadEnvFile(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;

  const excludedKeyPattern = /^(?:VERCEL(?:_|$)|TURBO_|NX_DAEMON$)/;
  const content = fs.readFileSync(filePath, 'utf8');

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const normalized = line.startsWith('export ') ? line.slice(7).trim() : line;
    const eqIndex = normalized.indexOf('=');
    if (eqIndex <= 0) continue;

    const key = normalized.slice(0, eqIndex).trim();
    if (!key || excludedKeyPattern.test(key)) continue;

    let value = normalized.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

const localEnv = loadEnvFile(path.join(__dirname, '.env.local'));

module.exports = {
  apps: [
    {
      name: 'henotic-web',
      script: '/var/www/henotic-diagnostics/current/server.js',
      cwd: '/var/www/henotic-diagnostics/current',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      kill_timeout: 10000,
      listen_timeout: 15000,
      merge_logs: true,
      out_file: '/var/log/pm2/henotic-web-out.log',
      error_file: '/var/log/pm2/henotic-web-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      env: {
        ...localEnv,
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
        LEAD_DATA_DIR: '/var/www/henotic-diagnostics/data',
        NEXT_TELEMETRY_DISABLED: '1',
      },
    },
  ],
};
