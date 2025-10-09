# Migration Fix - October 9, 2025

## Problem Identified ✅

**Error:** `The column Category.isActive does not exist in the current database`

**Root Cause:** Database migration `20251009025754_add_category_is_active` was not applied to production database.

**Impact:** 
- API is running but crashing on category queries
- Login likely works, but app shows errors when loading categories
- API has restarted 41 times trying to recover

## Immediate Fix (Run on Server)

```bash
cd /var/www/jangid-platform

# Step 1: Check what migrations are pending
npx prisma migrate status

# Step 2: Apply all pending migrations
npx prisma migrate deploy

# Step 3: Regenerate Prisma client
npx prisma generate

# Step 4: Restart API
pm2 restart jangid-api

# Step 5: Verify it's working
pm2 logs jangid-api --lines 20

# Step 6: Test the endpoint
curl http://localhost:4000/api/categories
```

## Expected Output

### Step 1 Output (migrate status):
```
Prisma Migrate detected that the following migrations have not been applied:

20251009025754_add_category_is_active
20251009120000_add_profile_theme_config
20251009120500_add_theme_description

To apply migrations, run:
  prisma migrate deploy
```

### Step 2 Output (migrate deploy):
```
Applying migration `20251009025754_add_category_is_active`
Applying migration `20251009120000_add_profile_theme_config`
Applying migration `20251009120500_add_theme_description`

Database schema is up to date!
```

### Step 5 Output (logs):
You should see:
```
[Nest] xxxxx  - 10/09/2025, X:XX:XX PM     LOG [NestApplication] Nest application successfully started
Server listening at http://0.0.0.0:4000
API ready at http://0.0.0.0:4000
```

**NO more errors about `Category.isActive`!**

### Step 6 Output (test):
```json
{
  "items": [
    {
      "id": "...",
      "name": "...",
      "slug": "...",
      "isActive": true
    }
  ]
}
```

## Why Did This Happen?

### Theory 1: Migration Command Failed Silently
The deploy script runs migrations, but if the DATABASE_URL was temporarily wrong or the database was unreachable, it might have failed without stopping the deployment.

### Theory 2: Timing Issue
The migration might have been added AFTER the last successful deployment, so it never ran.

### Theory 3: Script Error
The migration check `[ "$(ls -A prisma/migrations)" ]` might have issues with hidden files (like `._*` on macOS).

## Prevention - Deploy Script Improvement

I've updated `scripts/deploy.sh` to:
1. ✅ Add better logging for migrations
2. ✅ Exit on migration failure (so deployment stops if migrations fail)
3. ✅ Verify migrations completed successfully

**Changes made:**
```bash
if ! npx prisma migrate deploy --schema prisma/schema.prisma; then
  log "ERROR: Migration failed!"
  exit 1
fi
log "Migrations applied successfully"
```

Now if migrations fail, the deployment will stop and PM2 won't reload with broken code.

## Verification Checklist

After running the fix commands above:

- [ ] `pm2 list` shows jangid-api with ↺ count not increasing
- [ ] `pm2 logs jangid-api` shows NO errors
- [ ] `curl http://localhost:4000/api/health` returns `{"status":"ok"}`
- [ ] `curl http://localhost:4000/api/categories` returns categories array
- [ ] Login on web app works without errors

## Related Migrations to Check

You have 3 recent migrations:
1. `20251009025754_add_category_is_active` - Adds `isActive` column to Category
2. `20251009120000_add_profile_theme_config` - Adds theme config to Profile
3. `20251009120500_add_theme_description` - Adds description to Theme

All three need to be applied!

## Future Deployment

After you fix this manually, push the improved deploy script:

```bash
# On local machine
git add scripts/deploy.sh
git commit -m "Improve deploy script: fail fast on migration errors"
git push origin main
```

Now future deployments will stop if migrations fail, preventing this issue.

---

**Status:** Waiting for user to run migration commands on server and confirm fix works.
