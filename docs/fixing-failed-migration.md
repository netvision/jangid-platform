# Fixing Failed Migration P3009 Error

## Problem
Prisma detected a failed migration in the `_prisma_migrations` table:
```
Error: P3009
The `20251004003002_init` migration started at 2025-10-09 16:29:47.539570 UTC failed
```

## Why This Happens
When a migration fails midway (e.g., database connection lost, syntax error, interrupted), Prisma marks it as "failed" in the `_prisma_migrations` table. This prevents new migrations from running.

## Solution Options

### Option 1: Mark Migration as Rolled Back (SAFEST)
If you're not sure about the database state:

```bash
cd /var/www/jangid-platform

# Mark the failed migration as rolled back
npx prisma migrate resolve --rolled-back "20251004003002_init"

# Now try applying migrations again
npx prisma migrate deploy

# If that works:
npx prisma generate
pm2 restart jangid-api
```

### Option 2: Mark Migration as Applied (If Schema is Correct)
If the tables already exist and the schema is correct:

```bash
cd /var/www/jangid-platform

# Check if tables exist
npx prisma db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"

# If tables exist, mark migration as applied
npx prisma migrate resolve --applied "20251004003002_init"

# Apply remaining migrations
npx prisma migrate deploy

# Restart
npx prisma generate
pm2 restart jangid-api
```

### Option 3: Reset Database (NUCLEAR - USE WITH CAUTION)
**⚠️ This will DELETE ALL DATA!** Only use if this is a fresh/test database:

```bash
cd /var/www/jangid-platform

# Reset database and apply all migrations
npx prisma migrate reset --force

# Restart
pm2 restart jangid-api
```

## Recommended Approach

### Step 1: Check Database State
```bash
cd /var/www/jangid-platform

# Check what tables exist
npx prisma db execute --stdin <<< "\dt"

# OR using psql
psql $DATABASE_URL -c "\dt"
```

**If you see tables like `User`, `Profile`, `Category`, etc.:**
→ Use **Option 2** (mark as applied)

**If database is empty or has incomplete tables:**
→ Use **Option 1** (mark as rolled back)

### Step 2: Check Migration History
```bash
# Check the _prisma_migrations table
npx prisma db execute --stdin <<< "SELECT migration_name, finished_at, rolled_back_at, applied_steps_count FROM _prisma_migrations ORDER BY started_at;"
```

This shows which migrations succeeded/failed.

### Step 3: Fix Based on State

**Scenario A: Init migration failed, no tables exist**
```bash
npx prisma migrate resolve --rolled-back "20251004003002_init"
npx prisma migrate deploy
npx prisma generate
pm2 restart jangid-api
```

**Scenario B: Init migration failed, but tables exist**
```bash
npx prisma migrate resolve --applied "20251004003002_init"
npx prisma migrate deploy
npx prisma generate
pm2 restart jangid-api
```

**Scenario C: Database has partial/wrong schema**
```bash
# If you have production data, DON'T reset!
# Instead, manually fix schema or create a new migration

# If no data (dev/test):
npx prisma migrate reset --force
pm2 restart jangid-api
```

## Quick Decision Tree

```
Do you have production data in the database?
│
├─ YES → DON'T use migrate reset!
│   │
│   └─ Do the tables exist (User, Profile, Category, etc.)?
│       │
│       ├─ YES → Mark as applied:
│       │         npx prisma migrate resolve --applied "20251004003002_init"
│       │         npx prisma migrate deploy
│       │
│       └─ NO → Mark as rolled back:
│                 npx prisma migrate resolve --rolled-back "20251004003002_init"
│                 npx prisma migrate deploy
│
└─ NO → Safe to reset:
          npx prisma migrate reset --force
```

## Verify After Fix

```bash
# Check migration status
npx prisma migrate status
# Should show: "Database schema is up to date!"

# Check API
pm2 logs jangid-api --lines 20

# Test endpoint
curl http://localhost:4000/api/categories
```

## Why Did This Happen?

Looking at the timestamp: `2025-10-09 16:29:47` - this happened today during one of the deployment attempts.

**Likely cause:**
1. Deploy script ran `npx prisma migrate deploy`
2. The `20251004003002_init` migration started
3. Something interrupted it (connection timeout, killed process, etc.)
4. Migration marked as failed in database
5. Now blocking all future migrations

## Prevention

The improved deploy script now has better error handling, but you can also:

1. **Use transactions:** Prisma migrations are transactional, but large migrations can timeout
2. **Increase timeout:** Set `statement_timeout` in PostgreSQL if migrations are slow
3. **Monitor during deploy:** Watch `pm2 logs` during deployment

## Need Help Deciding?

**Run this diagnostic on the server:**

```bash
#!/bin/bash
echo "=== Checking Database State ==="
cd /var/www/jangid-platform

echo -e "\n1. Migration History:"
npx prisma db execute --stdin <<< "SELECT migration_name, finished_at IS NOT NULL as finished, rolled_back_at IS NOT NULL as rolled_back FROM _prisma_migrations ORDER BY started_at;"

echo -e "\n2. Tables in Database:"
npx prisma db execute --stdin <<< "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"

echo -e "\n3. User Count:"
npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM \"User\";" 2>&1 || echo "User table doesn't exist"

echo -e "\n=== Recommendation ==="
if npx prisma db execute --stdin <<< "SELECT 1 FROM \"User\" LIMIT 1;" 2>/dev/null; then
  echo "✓ Tables exist - Use Option 2: mark as applied"
else
  echo "✗ Tables missing - Use Option 1: mark as rolled back"
fi
```

Save as `diagnose-migration.sh` and run it to see the recommendation.

---

**Most Common Fix (90% of cases):**
```bash
npx prisma migrate resolve --rolled-back "20251004003002_init"
npx prisma migrate deploy
npx prisma generate
pm2 restart jangid-api
```
