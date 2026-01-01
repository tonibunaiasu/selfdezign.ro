# SelfDezign Deployment Pipeline

## Architecture

```
Manus (Local Development)
    ↓
GitHub (tonibunaiasu/selfdezign.ro)
    ↓
GitHub Actions (deploy-to-vps.yml)
    ↓
VPS (31.97.125.27)
    ↓
Docker Container (selfdezign-app)
    ↓
Nginx Reverse Proxy
    ↓
selfdezign.ro (Public Website)
```

## Automated Deployment Flow

1. **Push to GitHub**: Commit changes to `main` branch
2. **GitHub Actions Triggered**: `deploy-to-vps.yml` workflow starts
3. **VPS Deployment**: 
   - Fetches latest code from GitHub
   - Builds Docker image
   - Stops old container
   - Starts new container
4. **Health Verification**: Checks if website is online
5. **Notification**: Deployment success/failure logged

## Health Check Endpoints

### `/health` - Full System Health
Returns overall system status with database connectivity check.

**Response (200 - Healthy):**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-02T22:00:00.000Z",
  "checks": {
    "server": true,
    "database": true,
    "version": "1.0.0"
  }
}
```

### `/health/live` - Liveness Probe
Returns 200 if server is running (Kubernetes-compatible).

### `/health/ready` - Readiness Probe
Returns 200 if server is ready to accept traffic (database connected).

## Manual Deployment

If GitHub Actions fails, manually deploy:

```bash
ssh root@31.97.125.27
cd /opt/selfdezign
git fetch origin main
git reset --hard origin/main
docker build -t selfdezign-app:latest .
docker stop selfdezign-app 2>/dev/null || true
docker rm selfdezign-app 2>/dev/null || true
docker run -d --name selfdezign-app -p 3000:3000 -e NODE_ENV=production selfdezign-app:latest
```

## Troubleshooting

### Website Returns 502 Bad Gateway
1. Check container status: `docker ps | grep selfdezign-app`
2. View logs: `docker logs selfdezign-app`
3. Verify port: `docker port selfdezign-app`

### Database Connection Issues
- Check `/health` endpoint
- Verify `DATABASE_URL` environment variable
- Ensure database is accessible from VPS

### GitHub Actions Failure
1. Check workflow logs in GitHub Actions tab
2. Verify VPS credentials in GitHub Secrets
3. Test SSH connectivity manually

## GitHub Secrets Required

Add these to GitHub repository settings:
- `VPS_HOST`: 31.97.125.27
- `VPS_USER`: root
- `VPS_PASSWORD`: [VPS password]

## Monitoring

Monitor deployments:
- GitHub Actions tab: https://github.com/tonibunaiasu/selfdezign.ro/actions
- Website health: https://selfdezign.ro/health
- Container logs: `docker logs -f selfdezign-app`

## Version Control

All deployments are tied to Git commits. To rollback:
```bash
git revert <commit-hash>
git push origin main
# GitHub Actions will automatically deploy the reverted version
```
