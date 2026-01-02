# SSH from Windows PowerShell - VPS Deployment Guide

## Problem
You tried to use `ssh` in PowerShell but got a WSL error. This guide shows how to connect directly from PowerShell WITHOUT needing WSL.

## Solution: Use SSH Built-in to Windows (PowerShell 7.1+)

Windows 10/11 now include OpenSSH client built-in. You can SSH directly from PowerShell.

### Step 1: Confirm SSH is Available

In PowerShell, type:
```powershell
ssh -V
```

If you see a version number (like `OpenSSH_8.1p1`), you're ready to go!

If you get "ssh: The term 'ssh' is not recognized":
- You need to install OpenSSH. See section below.

### Step 2: Connect to VPS from PowerShell

Copy and paste this in PowerShell:

```powershell
ssh -p 22 root@31.97.125.27
```

When prompted for password, enter:
```
X-l8KtLMKMbeGAOD9q21
```

### Step 3: Run Diagnostic on VPS

Once connected (you'll see `root@vps:~#`), run:

```bash
bash scripts/vps-diagnostic.sh
```

This will show you:
- If Node.js is running ✓/✗
- If the build exists ✓/✗
- If port 3000 is listening ✓/✗
- Recent errors from logs

### Step 4: Deploy the Fix

If diagnostic shows issues, run:

```bash
cd /root/selfdezign.ro
bash scripts/deploy-vps-direct.sh
```

## If SSH Not Available: Install OpenSSH

If `ssh -V` doesn't work, install OpenSSH:

### Option A: Via Settings (Windows 10/11)

1. Open **Settings** (Windows Key + I)
2. Go to **Apps > Optional Features**
3. Click **View features**
4. Search for **OpenSSH Client**
5. Click **OpenSSH Client** and select **Install**
6. Wait for installation to complete
7. Restart PowerShell
8. Now try `ssh -V`

### Option B: Via PowerShell (Admin)

1. Open PowerShell as Administrator (right-click, "Run as administrator")
2. Run:

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*' | Add-WindowsCapability -Online
```

3. Wait for installation
4. Restart PowerShell
5. Try `ssh -V`

## Complete Example: Full Deployment from Windows

```powershell
# Step 1: Connect to VPS
ssh -p 22 root@31.97.125.27
# Enter password: X-l8KtLMKMbeGAOD9q21

# Step 2: Navigate to project
cd /root/selfdezign.ro

# Step 3: Check status
bash scripts/vps-diagnostic.sh

# Step 4: Deploy fix
bash scripts/deploy-vps-direct.sh

# Step 5: Test
curl -I https://selfdezign.ro

# Step 6: Exit SSH
exit
```

## Troubleshooting

### "Connection refused"
- Check IP and port are correct: `31.97.125.27:22`
- Verify VPS is running and accepts SSH connections
- Try: `ping 31.97.125.27` first (may not respond to ping, but connection might still work)

### "Permission denied (publickey,password)"
- Double-check password: `X-l8KtLMKMbeGAOD9q21`
- Ensure you're using correct username: `root`

### "ssh: command not found"
- OpenSSH Client is not installed
- Follow "Install OpenSSH" section above

### Script Errors on VPS
If `bash scripts/deploy-vps-direct.sh` fails:

1. Check errors in output
2. Run diagnostic again: `bash scripts/vps-diagnostic.sh`
3. Check logs: `tail -50 /root/selfdezign.ro/nohup.out`
4. Try manual steps:

```bash
cd /root/selfdezign.ro
git pull origin main
npm install
npm run build
pkill -f "node.*dist" || true
npm start
```

## After Deployment

Once deployment completes:

1. Exit VPS: `exit`
2. Visit website: https://selfdezign.ro
3. Should load WITHOUT ERR_TOO_MANY_REDIRECTS

If still shows error:
- Check Cloudflare SSL Mode: Should be "Full (Strict)" not "Flexible"
- Clear browser cache
- Try in incognito/private window

## VPS Credentials

For reference:
```
IP:       31.97.125.27
Port:     22
User:     root
Password: X-l8KtLMKMbeGAOD9q21
```

## Need Help?

If you get stuck:
1. Copy the error message from PowerShell
2. Run `bash scripts/vps-diagnostic.sh` and save output
3. Include both in your troubleshooting request
