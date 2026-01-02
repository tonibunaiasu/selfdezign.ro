#!/bin/bash

# VPS Diagnostic Script - Troubleshoot ERR_TOO_MANY_REDIRECTS
# Run this first to see what's happening on the VPS

echo "========================================"
echo "SELFDEZIGN.RO VPS DIAGNOSTIC REPORT"
echo "========================================"
echo ""

echo "[1] Checking Node.js Server Status"
echo "---"
if pgrep -f "node" > /dev/null; then
  echo "✓ Node.js process is running"
  ps aux | grep "node" | grep -v grep
else
  echo "✗ ERROR: Node.js is NOT running!"
  echo "  This is why the website shows ERR_TOO_MANY_REDIRECTS"
fi
echo ""

echo "[2] Checking Project Directory"
echo "---"
if [ -d "/root/selfdezign.ro" ]; then
  echo "✓ Project directory exists at /root/selfdezign.ro"
  cd /root/selfdezign.ro
  echo "  Current branch: $(git branch --show-current)"
  echo "  Latest commit: $(git log -1 --oneline)"
else
  echo "✗ ERROR: Project directory not found"
fi
echo ""

echo "[3] Checking dist Build"
echo "---"
if [ -d "/root/selfdezign.ro/dist" ]; then
  echo "✓ Build directory exists"
  echo "  Size: $(du -sh /root/selfdezign.ro/dist)"
  echo "  Last modified: $(stat -c %y /root/selfdezign.ro/dist | cut -d. -f1)"
else
  echo "✗ ERROR: No dist directory (build never happened)"
  echo "  Fix: Run 'npm run build' to create the build"
fi
echo ""

echo "[4] Checking Port 3000"
echo "---"
if lsof -i :3000 > /dev/null 2>&1; then
  echo "✓ Port 3000 is listening"
  lsof -i :3000 | tail -1
else
  echo "✗ ERROR: Port 3000 is NOT listening"
  echo "  The server isn't responding to requests"
fi
echo ""

echo "[5] Checking Recent Logs"
echo "---"
if [ -f "/root/selfdezign.ro/nohup.out" ]; then
  echo "✓ Log file found (nohup.out)"
  echo "  Last 10 lines:"
  tail -10 /root/selfdezign.ro/nohup.out
else
  echo "ⓘ No nohup.out file (check with: pm2 logs if using pm2)"
fi
echo ""

echo "[6] Git Status"
echo "---"
cd /root/selfdezign.ro 2>/dev/null
git status
echo ""

echo "[7] Environment"
echo "---"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Disk space: $(df -h / | tail -1 | awk '{print $4 " free"}')"
echo ""

echo "========================================"
echo "RECOMMENDED NEXT STEPS:"
echo "========================================"
echo ""
echo "If Node is running:"
echo "  → Check logs: tail -f nohup.out"
echo "  → Verify Cloudflare SSL Mode is 'Full (Strict)'"
echo ""
echo "If Node is NOT running:"
echo "  → Run deployment: bash scripts/deploy-vps-direct.sh"
echo ""
echo "If build doesn't exist:"
echo "  → 1. cd /root/selfdezign.ro"
echo "  → 2. git pull origin main"
echo "  → 3. npm install"
echo "  → 4. npm run build"
echo "  → 5. npm start (or pm2 start ecosystem.config.js)"
echo ""
