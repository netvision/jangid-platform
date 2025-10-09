# Deployment Issues - October 9, 2025

## Issue 1: Auto-Triggering Every Minute ⚠️

### Symptoms
- GitHub Actions workflow triggering automatically every minute
- Last trigger was successful, but keeps re-triggering

### Analysis
✅ **Checked:** Workflow configuration
- No `schedule` or `cron` trigger found
- Only triggers on: `push` to `main` branch and `workflow_dispatch` (manual)

✅ **Checked:** Deploy script
- Does NOT push any changes to git
- Does NOT modify any tracked files
- Should NOT trigger workflow

### Possible Causes

#### 1. PM2 or Deploy Script Creating Files
If the deploy script is creating/modifying tracked files on the server, it might accidentally commit them:
- Log files
- Build artifacts
- Generated files
- Lock files

#### 2. Another Process Pushing
- Automated bot or cron job pushing to main
- Another developer/system pushing repeatedly
- CI/CD from another service

#### 3. GitHub Actions Stuck in Loop
- Workflow might be failing and retrying
- Action error causing re-queue

### Diagnostic Steps Needed

**Please check:**

1. **GitHub Actions Page:**
   - Go to: https://github.com/netvision/jangid-platform/actions
   - How many workflow runs do you see in the last 10 minutes?
   - Are they all for the same commit (`544f131`)?
   - What's the status of each run?

2. **Check Server:**
   ```bash
   # SSH to server
   ssh your-server
   
   # Check if git status is clean
   cd /var/www/jangid-platform
   git status
   
   # Check PM2 logs
   pm2 logs --lines 50
   ```

3. **Check GitHub:**
   ```bash
   # On local machine
   git log --oneline -20
   # Are there new commits we didn't make?
   ```

---

## Issue 2: Login Error ❌

### Symptoms
- Login giving errors after successful deployment
- Exact error message unknown

### Potential Root Causes

#### 1. Environment Variables Missing
The API needs these environment variables:
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-here
CORS_ORIGIN=https://your-domain.com
NODE_ENV=production
PORT=4000
```

**Most likely cause:** `JWT_SECRET` not set or changed

#### 2. Prisma Client Not Generated
- If `npx prisma generate` failed during deployment
- Database connection issue

#### 3. Database Connection
- PostgreSQL not running
- Wrong DATABASE_URL
- Firewall blocking connection
- Migration failed

#### 4. CORS Issue
- API not allowing web app origin
- CORS_ORIGIN misconfigured

### Diagnostic Steps Needed

**Please provide:**

1. **What's the exact error message?**
   - Browser console error?
   - Network tab in DevTools showing what?
   - Status code (401, 500, 503)?

2. **Check API logs:**
   ```bash
   # On server
   pm2 logs jangid-api --lines 50
   ```

3. **Test API directly:**
   ```bash
   # On server
   curl http://localhost:4000/api/health
   
   # Try login endpoint
   curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   ```

4. **Check environment:**
   ```bash
   # On server
   pm2 env jangid-api | grep -E "JWT_SECRET|DATABASE_URL|CORS"
   ```

### Common Login Error Scenarios

#### Scenario A: 401 Unauthorized
**Error in browser:** "Invalid credentials"
**Cause:** Password incorrect OR database query failing
**Fix:** Check database connection and user exists

#### Scenario B: 500 Internal Server Error
**Error in logs:** Prisma error or JWT error
**Causes:**
- Missing JWT_SECRET
- Prisma client not generated
- Database connection failed
**Fix:** Check environment variables and run `npx prisma generate`

#### Scenario C: Network Error / CORS
**Error in browser:** CORS policy error or network failed
**Causes:**
- API not running
- CORS_ORIGIN wrong
- Port closed
**Fix:** Check API is running on port 4000, check CORS settings

#### Scenario D: bcrypt Error
**Error in logs:** "bcrypt" or "salt" error
**Cause:** bcrypt native module not compiled for production server
**Fix:** Rebuild dependencies on server

---

## Quick Diagnostic Commands

### All-in-One Server Check
```bash
#!/bin/bash
echo "=== Git Status ==="
cd /var/www/jangid-platform
git status
echo ""

echo "=== Last Commit ==="
git log -1 --oneline
echo ""

echo "=== PM2 Status ==="
pm2 list
echo ""

echo "=== API Health ==="
curl -s http://localhost:4000/api/health || echo "API not responding"
echo ""

echo "=== Web Health ==="
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000
echo ""

echo "=== Environment Check ==="
pm2 env jangid-api | grep -E "JWT_SECRET|DATABASE_URL|CORS|NODE_ENV" | sed 's/JWT_SECRET=.*/JWT_SECRET=***HIDDEN***/'
echo ""

echo "=== Recent API Logs ==="
pm2 logs jangid-api --lines 20 --nostream
```

Save this as `check-deployment.sh` and run it.

---

## Next Steps

**To resolve these issues, I need:**

1. **For auto-triggering:**
   - Screenshot or list of recent GitHub Actions runs
   - Confirmation if they're all the same commit or different commits

2. **For login error:**
   - Exact error message from browser console
   - API logs from PM2 (`pm2 logs jangid-api`)
   - Output of `curl http://localhost:4000/api/health`

**Once you provide this information, I can:**
- Fix the auto-trigger issue (likely need to stop a webhook or fix git state)
- Fix the login error (likely environment variable or database issue)

---

## Temporary Workarounds

### Stop Auto-Triggering (If Urgent)
If deployments are causing issues, you can temporarily disable the workflow:

1. Go to: https://github.com/netvision/jangid-platform/actions
2. Click on "Deploy to Production" workflow
3. Click the "..." menu → "Disable workflow"

### Fix Login Manually
If JWT_SECRET is the issue:

```bash
# On server
cd /var/www/jangid-platform

# Set environment variable
export JWT_SECRET="your-secure-random-string-here"

# Restart API
pm2 restart jangid-api
```

Better: Add to PM2 ecosystem config:
```javascript
// ecosystem.config.cjs
env_production: {
  NODE_ENV: 'production',
  JWT_SECRET: 'your-secure-random-string',
  // ... other vars
}
```

---

**Please provide the diagnostic information above and I'll help fix both issues! 🔧**
