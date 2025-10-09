#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/jangid-platform"
BRANCH="${1:-main}"

log() {
  printf "[deploy] %s\n" "$1"
}

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1090
  source "$HOME/.nvm/nvm.sh"
  nvm use --lts >/dev/null 2>&1 || true
fi

log "Starting deployment for branch '$BRANCH'"
cd "$APP_DIR"

log "Git repository updated externally, verifying..."
git log -1 --oneline

git submodule update --init --recursive >/dev/null 2>&1 || true

if [ -f package-lock.json ]; then
  log "Installing Node dependencies via npm ci"
  npm ci --legacy-peer-deps 2>&1 || npm install --legacy-peer-deps
else
  log "Installing Node dependencies via npm install"
  npm install --legacy-peer-deps
fi

log "Generating Prisma client"
npx prisma generate --schema prisma/schema.prisma

log "Building shared package"
npm run build --workspace @jangid/shared

log "Building API workspace"
npm run build --workspace @jangid/api

log "Building web workspace"
npm run build --workspace @jangid/web

log "Running database migrations"
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
  npx prisma migrate deploy --schema prisma/schema.prisma
else
  npx prisma db push --schema prisma/schema.prisma
fi

log "Reloading PM2 services"
if pm2 describe jangid-api >/dev/null 2>&1; then
  pm2 reload jangid-api
else
  pm2 start ecosystem.config.cjs --only jangid-api --env production
fi

if pm2 describe jangid-web >/dev/null 2>&1; then
  pm2 reload jangid-web
else
  pm2 start ecosystem.config.cjs --only jangid-web --env production
fi

pm2 save

log "Deployment complete"
