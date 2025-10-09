#!/usr/bin/env bash
# GitHub Actions Diagnostic Script

echo "🔍 GitHub Actions Diagnostic Check"
echo "=================================="
echo ""

# Check if workflow file exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ Workflow file exists: .github/workflows/deploy.yml"
else
    echo "❌ Workflow file NOT FOUND!"
    exit 1
fi

# Check if git is in a valid repo
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "✅ Git repository detected"
else
    echo "❌ Not in a git repository"
    exit 1
fi

# Get current branch
BRANCH=$(git branch --show-current)
echo "📍 Current branch: $BRANCH"

# Get latest commit
COMMIT=$(git rev-parse HEAD)
echo "📝 Latest commit: $COMMIT"

# Check remote
REMOTE=$(git remote get-url origin 2>/dev/null || echo "No remote")
echo "🌐 Remote URL: $REMOTE"

# Check if latest commit is pushed
if git diff --quiet origin/$BRANCH HEAD 2>/dev/null; then
    echo "✅ Branch is up to date with remote"
else
    echo "⚠️  Local branch has unpushed changes"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Visit: https://github.com/netvision/jangid-platform/actions"
echo "2. Check if Actions are enabled in Settings → Actions"
echo "3. Verify secrets exist: Settings → Secrets and variables → Actions"
echo "   Required secrets:"
echo "   - DEPLOY_HOST"
echo "   - DEPLOY_USER"
echo "   - DEPLOY_SSH_KEY"
echo ""
echo "💡 To manually trigger deployment:"
echo "   Go to: Actions → Deploy to Production → Run workflow"
echo ""
echo "📚 Full debugging guide: docs/github-actions-debugging.md"
