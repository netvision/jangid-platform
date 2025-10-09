# GitHub Actions Deployment Setup

## Issue Found
The `ecosystem.config.cjs` file was missing from the repository, which would cause PM2 to fail during deployment.

## What Was Fixed
1. ✅ Created `ecosystem.config.cjs` with proper PM2 configuration for both API and Web apps
2. ✅ Updated `.gitignore` to exclude logs and PM2 files

## Required GitHub Secrets
Your GitHub Actions workflow requires these secrets to be configured in your repository settings:

1. **DEPLOY_HOST** - Your Linode/Nanode server IP or hostname
2. **DEPLOY_USER** - SSH username (typically `root` or your user)
3. **DEPLOY_SSH_KEY** - Your private SSH key for authentication

### To verify secrets are set:
1. Go to: https://github.com/netvision/jangid-platform/settings/secrets/actions
2. Check that all three secrets exist
3. If any are missing, add them

## Deployment Flow
When you push to `main` branch:
1. GitHub Actions triggers
2. Connects to your server via SSH
3. Runs `/var/www/jangid-platform/scripts/deploy.sh main`
4. Script pulls latest code, builds, migrates DB, and reloads PM2

## Server Requirements
Make sure your Nanode has:
- Node.js installed (via nvm preferably)
- PM2 installed globally: `npm install -g pm2`
- Repository cloned at: `/var/www/jangid-platform`
- Logs directory exists: `/var/www/jangid-platform/logs`
- Environment variables set in `.env` file
- Database accessible

## Manual Deployment Test
SSH into your server and run:
```bash
cd /var/www/jangid-platform
bash scripts/deploy.sh main
```

## PM2 Configuration
The ecosystem file defines:
- **jangid-api**: NestJS API on port 4000
- **jangid-web**: Nuxt app on port 3000

### PM2 Commands
```bash
# Check status
pm2 list

# View logs
pm2 logs jangid-api
pm2 logs jangid-web

# Restart services
pm2 restart jangid-api
pm2 restart jangid-web

# Stop services
pm2 stop all

# Start services
pm2 start ecosystem.config.cjs
```

## Troubleshooting
If deployment fails:
1. Check GitHub Actions logs: https://github.com/netvision/jangid-platform/actions
2. SSH into server and check PM2 logs
3. Verify all secrets are set correctly
4. Ensure server has enough disk space and memory
5. Check if ports 3000 and 4000 are available

## Next Steps
1. Commit and push the new `ecosystem.config.cjs` file
2. Verify GitHub secrets are configured
3. Check GitHub Actions for any deployment errors
4. SSH into server to verify services are running
