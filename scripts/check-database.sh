#!/usr/bin/env bash
# Database Health Check Script
# Run this on your server to diagnose database and Prisma issues

set -e

APP_DIR="${1:-/var/www/jangid-platform}"
cd "$APP_DIR"

echo "=================================="
echo "DATABASE HEALTH CHECK"
echo "=================================="
echo ""

# Load environment if available
if [ -f .env ]; then
  echo "✓ Found .env file"
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠ No .env file found in $APP_DIR"
fi

echo ""
echo "=== 1. DATABASE URL CHECK ==="
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is NOT set!"
  echo "   Check your .env file or PM2 environment"
else
  # Mask password in output
  MASKED_URL=$(echo "$DATABASE_URL" | sed -E 's/:([^@:]+)@/:***@/')
  echo "✓ DATABASE_URL is set: $MASKED_URL"
fi

echo ""
echo "=== 2. POSTGRESQL SERVER CHECK ==="
# Try to connect with psql if available
if command -v psql >/dev/null 2>&1; then
  echo "✓ psql command is available"
  
  if [ -n "$DATABASE_URL" ]; then
    echo "Testing connection..."
    if psql "$DATABASE_URL" -c "SELECT version();" 2>/dev/null; then
      echo "✅ PostgreSQL connection SUCCESS!"
    else
      echo "❌ Cannot connect to PostgreSQL"
      echo "   Possible issues:"
      echo "   - PostgreSQL server is not running"
      echo "   - Wrong credentials in DATABASE_URL"
      echo "   - Firewall blocking connection"
      echo "   - Database does not exist"
    fi
  else
    echo "⚠ Skipping connection test (no DATABASE_URL)"
  fi
else
  echo "⚠ psql not installed, trying with Prisma..."
fi

echo ""
echo "=== 3. POSTGRESQL SERVICE STATUS ==="
# Check if PostgreSQL is running
if command -v systemctl >/dev/null 2>&1; then
  if systemctl is-active --quiet postgresql; then
    echo "✅ PostgreSQL service is RUNNING"
    systemctl status postgresql | grep "Active:"
  else
    echo "❌ PostgreSQL service is NOT running"
    echo "   Start it with: sudo systemctl start postgresql"
  fi
elif command -v service >/dev/null 2>&1; then
  if service postgresql status >/dev/null 2>&1; then
    echo "✅ PostgreSQL service is RUNNING"
  else
    echo "❌ PostgreSQL service is NOT running"
    echo "   Start it with: sudo service postgresql start"
  fi
else
  echo "⚠ Cannot check service status (no systemctl or service command)"
fi

echo ""
echo "=== 4. PRISMA CLIENT CHECK ==="
if [ -d "node_modules/@prisma/client" ]; then
  echo "✓ @prisma/client is installed"
else
  echo "❌ @prisma/client NOT found in node_modules"
  echo "   Run: npm install"
fi

if [ -d "node_modules/.prisma/client" ]; then
  echo "✓ Prisma client is generated"
  SCHEMA_HASH=$(cat node_modules/.prisma/client/schema.prisma 2>/dev/null | grep -E "generator|datasource" | head -5)
  if [ -n "$SCHEMA_HASH" ]; then
    echo "   Generated from schema"
  fi
else
  echo "❌ Prisma client NOT generated"
  echo "   Run: npx prisma generate"
fi

echo ""
echo "=== 5. PRISMA SCHEMA CHECK ==="
if [ -f "prisma/schema.prisma" ]; then
  echo "✓ prisma/schema.prisma exists"
  
  # Show database provider
  PROVIDER=$(grep "provider" prisma/schema.prisma | head -1 | awk '{print $3}' | tr -d '"')
  echo "   Database provider: $PROVIDER"
  
  # Count models
  MODEL_COUNT=$(grep -c "^model " prisma/schema.prisma || echo "0")
  echo "   Models defined: $MODEL_COUNT"
else
  echo "❌ prisma/schema.prisma NOT found"
fi

echo ""
echo "=== 6. MIGRATION STATUS ==="
if [ -d "prisma/migrations" ]; then
  MIGRATION_COUNT=$(ls -1 prisma/migrations | grep -v migration_lock.toml | wc -l | tr -d ' ')
  echo "✓ Migrations folder exists ($MIGRATION_COUNT migrations)"
  
  echo ""
  echo "Migration history:"
  ls -1 prisma/migrations | grep -v migration_lock.toml | tail -5
  
  echo ""
  echo "Checking if migrations are applied..."
  if [ -n "$DATABASE_URL" ]; then
    if npx prisma migrate status 2>&1 | tee /tmp/migrate-status.txt; then
      if grep -q "Database schema is up to date" /tmp/migrate-status.txt; then
        echo ""
        echo "✅ All migrations are APPLIED"
      elif grep -q "pending migration" /tmp/migrate-status.txt; then
        echo ""
        echo "⚠ PENDING MIGRATIONS detected!"
        echo "   Run: npx prisma migrate deploy"
      else
        echo ""
        echo "⚠ Migration status unclear, check output above"
      fi
    else
      echo ""
      echo "❌ Cannot check migration status (connection issue?)"
    fi
  else
    echo "⚠ Cannot check migration status (no DATABASE_URL)"
  fi
else
  echo "⚠ No migrations folder found"
fi

echo ""
echo "=== 7. DATABASE CONNECTION TEST (via Prisma) ==="
if [ -n "$DATABASE_URL" ]; then
  echo "Testing Prisma connection..."
  
  # Create a temporary test script
  cat > /tmp/test-prisma.js << 'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('✅ Prisma connection SUCCESS!')
    
    const userCount = await prisma.user.count()
    console.log(`   Users in database: ${userCount}`)
    
    const categoryCount = await prisma.category.count()
    console.log(`   Categories in database: ${categoryCount}`)
    
  } catch (error) {
    console.log('❌ Prisma connection FAILED!')
    console.log('   Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
EOF

  if node /tmp/test-prisma.js 2>&1; then
    echo ""
  else
    echo "❌ Prisma connection test failed"
  fi
  
  rm -f /tmp/test-prisma.js
else
  echo "⚠ Skipping (no DATABASE_URL)"
fi

echo ""
echo "=== 8. PM2 ENVIRONMENT CHECK ==="
if command -v pm2 >/dev/null 2>&1; then
  echo "Checking PM2 environment for jangid-api..."
  if pm2 describe jangid-api >/dev/null 2>&1; then
    echo ""
    pm2 env jangid-api | grep -E "DATABASE_URL|JWT_SECRET|NODE_ENV|CORS" | sed 's/DATABASE_URL=.*/DATABASE_URL=***HIDDEN***/' | sed 's/JWT_SECRET=.*/JWT_SECRET=***HIDDEN***/'
  else
    echo "⚠ jangid-api not running in PM2"
  fi
else
  echo "⚠ PM2 not installed"
fi

echo ""
echo "=================================="
echo "DIAGNOSTIC SUMMARY"
echo "=================================="
echo ""
echo "Common Issues & Solutions:"
echo ""
echo "1. PostgreSQL not running:"
echo "   → sudo systemctl start postgresql"
echo ""
echo "2. DATABASE_URL not set:"
echo "   → Add to .env file or PM2 config"
echo "   → Format: postgresql://user:pass@localhost:5432/dbname"
echo ""
echo "3. Prisma client not generated:"
echo "   → npx prisma generate"
echo ""
echo "4. Migrations not applied:"
echo "   → npx prisma migrate deploy"
echo ""
echo "5. Database doesn't exist:"
echo "   → createdb your-database-name"
echo "   → Then: npx prisma migrate deploy"
echo ""
echo "=================================="

# Cleanup
rm -f /tmp/migrate-status.txt
