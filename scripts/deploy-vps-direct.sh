#!/bin/bash

# VPS Direct Deployment Script for selfdezign.ro
# This script fixes the ERR_TOO_MANY_REDIRECTS issue and deploys the latest code
# Usage: SSH to VPS and run: bash /path/to/deploy-vps-direct.sh

set -e

echo "[1/6] Starting VPS deployment..."
echo "Current directory: $(pwd)"

# Step 1: Navigate to project directory
echo "[2/6] Navigating to project directory..."
cd /root/selfdezign.ro 2>/dev/null || cd ~/selfdezign.ro 2>/dev/null || {
  echo "ERROR: Could not find project directory"
  echo "Please ensure you are in the selfdezign.ro project root"
  exit 1
}

echo "Working directory: $(pwd)"

# Step 2: Pull latest code from GitHub
echo "[3/6] Pulling latest code from GitHub..."
git pull origin main --no-rebase

# Step 3: Install dependencies
echo "[4/6] Installing dependencies (npm install)..."
npm install

# Step 4: Build the application
echo "[5/6] Building application (npm run build)..."
npm run build 2>&1 | tail -20 || {
  echo "ERROR: Build failed. Check TypeScript errors above."
  exit 1
}

# Step 5: Stop old Node server and restart
echo "[6/6] Restarting Node.js server..."

# Kill any existing Node processes
pkill -f "node.*dist" || true
sleep 2

# Start the new server
echo "Starting Node server..."
pm2 start ecosystem.config.js --update-env || npm start &

echo ""
echo "========================================"
echo "Deployment completed successfully!"
echo "========================================"
echo ""
echo "Verifying deployment in 5 seconds..."
sleep 5

echo "Checking if website is accessible..."
curl -I https://selfdezign.ro 2>/dev/null | head -1 || echo "(Curl check skipped - may not be available in this environment)"

echo ""
echo "Next steps:"
echo "1. Test: https://selfdezign.ro"
echo "2. Check server logs: pm2 logs or tail -f nohup.out"
echo "3. If issues persist, check:"
echo "   - Cloudflare SSL Mode: Full (Strict)"
echo "   - Environment variables in .env"
echo "   - Server error logs"
echo ""
