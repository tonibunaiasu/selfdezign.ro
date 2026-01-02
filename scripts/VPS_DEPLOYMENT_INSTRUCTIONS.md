# VPS Deployment Instructions - selfdezign.ro

## Problem Summary
The website selfdezign.ro is showing **ERR_TOO_MANY_REDIRECTS** due to a mismatch between:
- Cloudflare's "Flexible" SSL mode (HTTP to origin)
- Server code that redirects HTTP → HTTPS

This creates an infinite redirect loop.

## Solution Implemented
The code has been fixed with:
1. **Cloudflare-aware middleware** in `server/_core/index.ts`
2. **Proper SSL configuration** for Full (Strict) SSL mode
3. **Environment variables** configured correctly

## VPS Access Credentials

```
IP Address:     31.97.125.27
Username:       root
Password/Key:   X-l8KtLMKMbeGAOD9q21
Port:           22
```

## Quick Deployment (Recommended)

### Step 1: SSH into the VPS
```bash
ssh -p 22 root@31.97.125.27
# Password: X-l8KtLMKMbeGAOD9q21
```

### Step 2: Run the deployment script
```bash
cd /root/selfdezign.ro
bash scripts/deploy-vps-direct.sh
```

The script will:
- Pull latest code from GitHub (with Cloudflare fixes)
- Install npm dependencies
- Build the TypeScript application
- Restart the Node.js server
- Verify the deployment

## Manual Deployment (If needed)

If the script fails, execute these commands manually:

```bash
cd /root/selfdezign.ro

# Pull latest code
git pull origin main --no-rebase

# Install dependencies
npm install

# Build application (fix TypeScript errors if they appear)
npm run build

# Stop old server
pkill -f "node.*dist" || true
sleep 2

# Start new server
pm2 start ecosystem.config.js --update-env || npm start
```

## Verify Deployment

After deployment, verify the fix worked:

```bash
# Test from VPS
curl -I https://selfdezign.ro

# Should return 200 OK, not 302 redirects
```

Or visit: https://selfdezign.ro (should work in browser without ERR_TOO_MANY_REDIRECTS)

## Troubleshooting

### Build Errors
If build fails with TypeScript errors:
```bash
# Check the error details
npm run build 2>&1 | tail -50

# Common issues:
# - Missing .env file
# - Port 3000 already in use
# - Old Node processes still running
```

### Server Won't Start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill any hanging processes
pkill -f "node"

# Check server logs
pm2 logs selfdezign
# or
tail -f nohup.out
```

### Website Still Shows Error
```bash
# Verify Cloudflare SSL Mode
# 1. Go to Cloudflare Dashboard → selfdezign.ro domain
# 2. SSL/TLS → Overview → Encryption level
# 3. Should be set to "Full (Strict)"

# Check environment variables
cat /root/selfdezign.ro/.env

# Should have:
# NODE_ENV=production
# NEXTAUTH_SECRET=<your-secret>
# DATABASE_URL=<your-url>
```

## Post-Deployment Checks

✓ Check the website loads: https://selfdezign.ro
✓ Verify no redirect errors
✓ Test SSL certificate is valid
✓ Check server logs for errors
✓ Monitor error tracking (if enabled)

## Need Help?

If deployment fails:
1. Check the error messages in the deployment script output
2. Review server logs: `pm2 logs` or `tail -f nohup.out`
3. Verify all files were pulled from GitHub: `git status`
4. Confirm Node.js and npm versions match requirements
5. Check disk space: `df -h`
6. Review Cloudflare configuration
