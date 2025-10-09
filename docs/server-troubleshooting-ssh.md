# Server Troubleshooting Guide - SSH Session
**Run these commands on your live server via SSH**

## Step 1: Check PM2 Status (CRITICAL)
```bash
cd /var/www/jangid-platform

# Check if services are running
pm2 list
```

**What to look for:**
- ✅ `jangid-api` status should be `online` (not `errored` or `stopped`)
- ✅ `jangid-web` status should be `online`
- ❌ If status is `errored` → Services crashed, check logs in Step 2
- ❌ If not in list → Services not started, check Step 8

---

## Step 2: Check API Logs (MOST IMPORTANT)
```bash
# See last 50 lines of API logs
pm2 logs jangid-api --lines 50 --nostream

# Or watch logs live
pm2 logs jangid-api
```

**What to look for:**
- ❌ `Prisma` errors → Database connection issue (go to Step 4)
- ❌ `JWT` errors → JWT_SECRET not set (go to Step 5)
- ❌ `ECONNREFUSED` → Database not running (go to Step 4)
- ❌ `bcrypt` errors → Module not compiled correctly
- ❌ `Cannot find module` → npm install didn't complete
- ✅ `Application is running on: http://0.0.0.0:4000` → API started successfully

---

## Step 3: Test API Endpoints
```bash
# Test health endpoint
curl http://localhost:4000/api/health

# Test if API is listening
curl -I http://localhost:4000

# Try a login (replace with real credentials)
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"your-password"}'
```

**What to look for:**
- ❌ `Connection refused` → API not running
- ❌ `502 Bad Gateway` → API crashed or not responding
- ❌ `500 Internal Server Error` → Check logs (Step 2)
- ✅ `200 OK` with `{"status":"ok"}` → API is healthy

---

## Step 4: Check Database Connection
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# If not running, start it
sudo systemctl start postgresql

# Check DATABASE_URL environment variable
pm2 env jangid-api | grep DATABASE_URL

# Test database connection with Prisma
cd /var/www/jangid-platform
npx prisma db pull --schema prisma/schema.prisma
```

**What to look for:**
- ❌ `Unit postgresql.service could not be found` → PostgreSQL not installed
- ❌ `inactive (dead)` → PostgreSQL not running
- ❌ `DATABASE_URL` empty → Environment variable not set
- ✅ `active (running)` → Database is running

---

## Step 5: Check Environment Variables
```bash
# Check critical environment variables
pm2 env jangid-api | grep -E "DATABASE_URL|JWT_SECRET|NODE_ENV|CORS_ORIGIN"

# If empty, check .env file
cat /var/www/jangid-platform/.env
```

**What to look for:**
- ❌ `JWT_SECRET` empty or missing → Login will fail
- ❌ `DATABASE_URL` empty → Database connection will fail
- ❌ `NODE_ENV` not set to `production` → Using wrong config

**Required variables:**
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/your-database
JWT_SECRET=your-secret-key-here
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

---

## Step 6: Check Prisma Status
```bash
cd /var/www/jangid-platform

# Check if Prisma client is generated
ls -la node_modules/.prisma/client

# Check migration status
npx prisma migrate status

# If client not generated
npx prisma generate

# If migrations not applied
npx prisma migrate deploy
```

**What to look for:**
- ❌ `node_modules/.prisma/client` doesn't exist → Run `npx prisma generate`
- ❌ `pending migrations` → Run `npx prisma migrate deploy`
- ✅ `Database schema is up to date` → Migrations are good

---

## Step 7: Check Node Modules
```bash
cd /var/www/jangid-platform

# Check if dependencies are installed
ls -la node_modules/@prisma/client
ls -la node_modules/bcryptjs

# If missing, reinstall
npm install --legacy-peer-deps
```

---

## Step 8: Restart Services (If Needed)
```bash
# If services are crashed or need restart
pm2 restart jangid-api
pm2 restart jangid-web

# If services not in PM2 at all
cd /var/www/jangid-platform
pm2 start ecosystem.config.cjs --env production
pm2 save
```

---

## Step 9: Run Automated Database Check
I created a comprehensive script for you:

```bash
cd /var/www/jangid-platform

# Make sure script is executable
chmod +x scripts/check-database.sh

# Run the database diagnostic
bash scripts/check-database.sh
```

This will check:
- ✅ DATABASE_URL is set
- ✅ PostgreSQL is running
- ✅ Prisma client is generated
- ✅ Migrations are applied
- ✅ Connection works

---

## Common Issues & Quick Fixes

### Issue A: "Cannot connect to database"
```bash
# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Check it's running
sudo systemctl status postgresql
```

### Issue B: "JWT_SECRET not set"
```bash
# Edit PM2 ecosystem config
nano /var/www/jangid-platform/ecosystem.config.cjs

# Add to env_production:
# JWT_SECRET: 'your-secure-random-string-here'

# Restart
pm2 restart jangid-api
```

### Issue C: "Prisma client not generated"
```bash
cd /var/www/jangid-platform
npx prisma generate
pm2 restart jangid-api
```

### Issue D: "Migrations not applied"
```bash
cd /var/www/jangid-platform
npx prisma migrate deploy
pm2 restart jangid-api
```

### Issue E: "bcrypt error"
```bash
cd /var/www/jangid-platform
npm rebuild bcryptjs
pm2 restart jangid-api
```

---

## Complete Diagnostic Command (Copy-Paste Friendly)
```bash
#!/bin/bash
echo "=== 1. PM2 Status ==="
pm2 list

echo -e "\n=== 2. Recent API Logs ==="
pm2 logs jangid-api --lines 30 --nostream

echo -e "\n=== 3. API Health Check ==="
curl -s http://localhost:4000/api/health || echo "API not responding"

echo -e "\n=== 4. PostgreSQL Status ==="
sudo systemctl status postgresql | grep Active

echo -e "\n=== 5. Environment Variables ==="
pm2 env jangid-api | grep -E "DATABASE_URL|JWT_SECRET|NODE_ENV" | sed 's/=.*/=***HIDDEN***/'

echo -e "\n=== 6. Prisma Client Check ==="
[ -d node_modules/.prisma/client ] && echo "✓ Generated" || echo "✗ Not generated"

echo -e "\n=== 7. Migration Status ==="
npx prisma migrate status 2>&1 | grep -E "up to date|pending"

echo -e "\n=== 8. Git Status ==="
git log -1 --oneline
```

Save this as `quick-check.sh` and run:
```bash
bash quick-check.sh
```

---

## What to Share With Me

After running the diagnostics, share:

1. **PM2 status:** Output of `pm2 list`
2. **API logs:** Last 30 lines of `pm2 logs jangid-api`
3. **API health:** Output of `curl http://localhost:4000/api/health`
4. **Any error messages** you see in red

This will help me identify the exact issue! 🔍
