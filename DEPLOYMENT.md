# Deployment Setup

## Webhook-based Auto-Deployment

This repository uses a webhook-based deployment system to automatically deploy the SelfDezign website when code is pushed to the main branch.

### Architecture

1. **GitHub** → Detects code push to main branch
2. **GitHub Actions** → Runs `webhook-deploy.yml` workflow
3. **Webhook Call** → Sends request to VPS webhook receiver
4. **VPS Script** → Executes `deploy.sh` to pull code and rebuild Docker container
5. **Website** → Updates with new version

### Files

- `deploy.sh` - VPS deployment script (runs on VPS)
- `.github/workflows/webhook-deploy.yml` - GitHub Actions workflow

### VPS Setup

Webhook receiver running on: `http://VPS_IP:8888/webhook`

Status: ✓ Configured

Deploy logs: `/tmp/deploy.log`
