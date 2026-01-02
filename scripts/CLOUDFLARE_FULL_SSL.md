# Cloudflare Full SSL Setup Guide for SelfDezign

## Overview

This guide explains how to migrate from **Cloudflare Flexible SSL** (Free plan) to **Cloudflare Full (strict) SSL** for maximum security and trust.

### Comparison

| Aspect | Flexible | Full | Full (strict) |
|--------|----------|------|---------------|
| **Mode** | Browser→Cloudflare: HTTPS<br/>Cloudflare→Origin: HTTP | Browser→Cloudflare: HTTPS<br/>Cloudflare→Origin: HTTPS | Same as Full |
| **Cert on Origin** | ❌ No | ✅ Yes | ✅ Required |
| **Security** | ⚠️ Medium | 🟡 Good | 🟢 Excellent |
| **Trust** | Only Cloudflare | Cloudflare + Origin | Cloudflare + Origin |
| **Cost** | 🆓 Free | 🆓 Free | 🆓 Free |
| **Setup Time** | 5 min | 20 min | 20 min |

---

## Step-by-Step Setup

### 1. Generate Cloudflare Origin Certificate

1. Go to **Cloudflare Dashboard** → **SSL/TLS** → **Origin Server**
2. Click **Create Certificate**
3. Keep default settings:
   - Hostnames: `selfdezign.ro`, `*.selfdezign.ro`
   - Validity: 15 years (auto-generated)
4. Download both files:
   - `.crt` file (certificate)
   - `.key` file (private key)

### 2. Upload Certificates to VPS

From your local machine:

```bash
# Copy certificate files to VPS
scp /path/to/your/certificate.crt user@your-vps-ip:/tmp/
scp /path/to/your/private.key user@your-vps-ip:/tmp/
```

### 3. Run Setup Script

On your VPS, run the automated setup script:

```bash
cd /var/www/selfdezign
bash scripts/setup-cloudflare-ssl.sh /tmp/certificate.crt /tmp/private.key
```

The script will:
- Create SSL directory: `/etc/nginx/ssl/`
- Copy certificates with proper permissions
- Configure Nginx with modern SSL/TLS settings
- Enable HTTP/2 and HSTS
- Create HTTP→HTTPS redirect
- Restart Nginx

### 4. Configure Cloudflare Dashboard

1. **SSL/TLS** → **Encryption mode**
2. Select **"Full (strict)"**
3. Go to **Edge Certificates** and enable:
   - ✅ Always Use HTTPS
   - ✅ HSTS (HTTP Strict-Transport-Security)
   - ✅ Opportunistic Encryption
   - ✅ Automatic HTTPS Rewrites

### 5. Test the Setup

```bash
# Check SSL certificate
curl -i https://selfdezign.ro

# Should return 200 OK with proper SSL headers

# Verify HSTS header
curl -i https://selfdezign.ro | grep Strict-Transport
# Output: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Test HTTP redirect
curl -i http://selfdezign.ro
# Should return 301 Moved Permanently to HTTPS
```

---

## What Changed

### Before (Flexible SSL)
```
Visitor (HTTPS)
     ↓
Cloudflare (decrypts HTTPS)
     ↓
Origin receives HTTP
     ↓
Server responds on HTTP
```

⚠️ **Issue**: Unencrypted traffic inside Cloudflare network

### After (Full SSL)
```
Visitor (HTTPS)
     ↓
Cloudflare (decrypts, verifies origin cert)
     ↓
Origin receives HTTPS
     ↓
Server responds on HTTPS (with Cloudflare Origin Cert)
```

✅ **Benefit**: End-to-end HTTPS encryption + origin certificate verification

---

## Server-Side Changes

No code changes required! The existing middleware in `server/_core/index.ts` now **can simplify**:

```typescript
// Old (for Flexible SSL):
const isBehindCloudflare = req.headers['cf-ray'] || req.headers['cf-connecting-ip'];
if (isProduction && !isBehindCloudflare && req.protocol === 'http') {
  return res.redirect(301, `https://${req.headers.host}${req.url}`);
}

// New (for Full SSL - optional):
if (process.env.NODE_ENV === 'production' && req.protocol === 'http') {
  return res.redirect(301, `https://${req.headers.host}${req.url}`);
}
```

But the old code **continues to work perfectly** - no migration needed.

---

## Monitoring

```bash
# Check Nginx status
sudo systemctl status nginx

# View SSL certificate info
sudo openssl x509 -in /etc/nginx/ssl/selfdezign.crt -text -noout

# Watch error logs
sudo tail -f /var/log/nginx/error.log

# Check certificate renewal (valid for 15 years)
sudo openssl x509 -in /etc/nginx/ssl/selfdezign.crt -noout -dates
```

---

## Troubleshooting

### "SSL_ERROR_RX_RECORD_TOO_LONG"
- Cause: Nginx listening on port 80 but config expects HTTPS
- Fix: Restart Nginx: `sudo systemctl restart nginx`

### "SSL certificate problem: self signed certificate"
- Cause: Cloudflare not yet updated to Full SSL mode
- Fix: Wait 5-10 minutes for Cloudflare to propagate settings

### "Certificate verification failed"
- Cause: Origin certificate path incorrect
- Fix: Check paths in Nginx config: `sudo cat /etc/nginx/sites-enabled/selfdezign`

---

## Benefits

✅ **Maximum Security**: Encrypt entire path visitor → Cloudflare → origin  
✅ **Trust Indicator**: Browser shows HTTPS trust for full path  
✅ **Compliance**: Meets enterprise security standards  
✅ **Future-Proof**: Protects against Cloudflare network breaches  
✅ **No Extra Cost**: Free on Cloudflare Free plan  
✅ **Performance**: HTTP/2 over HTTPS is faster than HTTP  

---

## Rollback (If Needed)

If you need to revert to Flexible SSL:

1. Cloudflare Dashboard → **SSL/TLS** → **Encryption mode** → Select **"Flexible"**
2. On VPS: `sudo systemctl restart nginx`
3. The old config still works for HTTP origin

---

## References

- [Cloudflare Origin Certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
- [SSL/TLS Encryption Modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-tls-modes/)
- [HSTS Preload](https://hstspreload.org/)
- [Nginx SSL Best Practices](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)
