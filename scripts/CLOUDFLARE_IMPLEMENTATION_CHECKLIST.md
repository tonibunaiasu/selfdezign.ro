# Cloudflare Full SSL Implementation Checklist

## Pre-Implementation (15 min)

### ☐ Preparation
- [ ] Backup current Nginx configuration: `sudo cp -r /etc/nginx /tmp/nginx.backup`
- [ ] Backup current SSL files (if any): `sudo cp -r /etc/nginx/ssl /tmp/ssl.backup`
- [ ] Review CLOUDFLARE_FULL_SSL.md
- [ ] Ensure SSH access to VPS working
- [ ] Ensure you have admin access to Cloudflare Dashboard

### ☐ Cloudflare Origin Certificate
- [ ] Go to Cloudflare Dashboard → SSL/TLS → Origin Server
- [ ] Click "Create Certificate"
- [ ] Set hostnames: `selfdezign.ro` + `*.selfdezign.ro`
- [ ] Validity: 15 years (default)
- [ ] Download `.crt` file
- [ ] Download `.key` file
- [ ] Store files in secure location on local machine

---

## Implementation (20 min)

### ☐ Step 1: Transfer Certificates to VPS

```bash
# From local machine
scp /path/to/certificate.crt user@your-vps-ip:/tmp/cert.crt
scp /path/to/private.key user@your-vps-ip:/tmp/key.key
```

- [ ] Both files transferred successfully
- [ ] Confirm files are on VPS: `ssh user@vps "ls -la /tmp/*.key /tmp/*.crt"`

### ☐ Step 2: Run Setup Script on VPS

```bash
# SSH into VPS
ssh user@your-vps-ip

# Run the script
cd /var/www/selfdezign
bash scripts/setup-cloudflare-ssl.sh /tmp/cert.crt /tmp/key.key
```

- [ ] Script runs without errors
- [ ] Nginx configuration test passes ("test successful")
- [ ] Nginx restarts successfully

### ☐ Step 3: Verify Local Nginx Configuration

```bash
# On VPS
sudo cat /etc/nginx/sites-enabled/selfdezign | head -20
```

- [ ] SSL certificate path correct: `/etc/nginx/ssl/selfdezign.crt`
- [ ] SSL key path correct: `/etc/nginx/ssl/selfdezign.key`
- [ ] HTTPS listening on port 443
- [ ] HTTP redirects to HTTPS

### ☐ Step 4: Verify Certificate Installation

```bash
# Check certificate details
sudo openssl x509 -in /etc/nginx/ssl/selfdezign.crt -text -noout | head -30

# Expected: Issuer = Cloudflare
```

- [ ] Certificate issued by Cloudflare
- [ ] Hostnames include `selfdezign.ro` and `*.selfdezign.ro`
- [ ] Not After: 15 years from now

### ☐ Step 5: Test HTTPS Connectivity

```bash
# From local machine - test origin directly (if not behind CF yet)
curl -i --insecure https://your-vps-ip
# or
curl -i --insecure -H "Host: selfdezign.ro" https://your-vps-ip

# Expected: 200 OK (or your normal response)
```

- [ ] HTTPS connection works
- [ ] No certificate validation errors (we're testing directly to origin)

---

## Cloudflare Configuration (5 min)

### ☐ SSL/TLS Encryption Mode

1. Go to Cloudflare Dashboard
2. Select your domain: `selfdezign.ro`
3. **SSL/TLS** → **Encryption Mode**

- [ ] Current mode is "Flexible" or similar
- [ ] Change to: **Full (strict)**
- [ ] Confirm change

### ☐ Edge Certificates Settings

**SSL/TLS** → **Edge Certificates**

- [ ] **Always Use HTTPS**: ✅ Enabled
- [ ] **HSTS**: ✅ Enabled
  - Max Age: 31536000 (1 year) or higher
  - Include Subdomains: ✅ Checked
  - Preload: ✅ Checked (optional, for HSTS preload list)
- [ ] **Opportunistic Encryption**: ✅ Enabled
- [ ] **Automatic HTTPS Rewrites**: ✅ Enabled

### ☐ Wait for Propagation

- [ ] Wait 5-10 minutes for Cloudflare to update DNS and certificate
- [ ] Monitor Cloudflare logs for any SSL errors

---

## Post-Implementation Testing (10 min)

### ☐ Test via Cloudflare

```bash
# From local machine - test via Cloudflare
curl -i https://selfdezign.ro

# Expected: 200 OK
```

- [ ] HTTPS works via Cloudflare
- [ ] Redirects work (HTTP → HTTPS)
- [ ] SSL certificate is valid (no warnings)

### ☐ Verify SSL Certificate Chain

```bash
# Test SSL certificate
openssl s_client -connect selfdezign.ro:443 -showcerts

# Or use online tool: https://www.ssllabs.com/ssltest/analyze.html
```

- [ ] SSL Labs grade: A or A+
- [ ] Certificate chain is complete
- [ ] No mixed content warnings

### ☐ Check HSTS Header

```bash
curl -i https://selfdezign.ro | grep -i "Strict-Transport"

# Expected:
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- [ ] HSTS header present
- [ ] Max-age is set correctly
- [ ] Include Subdomains is present

### ☐ Test HTTP Redirect

```bash
curl -i http://selfdezign.ro

# Expected: 301 Moved Permanently to https://...
```

- [ ] HTTP requests redirect to HTTPS
- [ ] Redirect is permanent (301)

### ☐ Browser Testing

- [ ] Open https://selfdezign.ro in browser
- [ ] Check for green lock icon (HTTPS trusted)
- [ ] Click on lock → Verify certificate
  - [ ] Certificate issued to: selfdezign.ro
  - [ ] Issuer: Cloudflare
  - [ ] Valid until: ~15 years from now
- [ ] Test all main pages load correctly
- [ ] Check browser console for no mixed content errors

---

## Monitoring & Maintenance

### ☐ Set Up Monitoring

```bash
# Monitor Nginx status
sudo systemctl status nginx

# Watch error logs
sudo tail -f /var/log/nginx/error.log

# Monitor certificate expiration
sudo openssl x509 -in /etc/nginx/ssl/selfdezign.crt -noout -dates
```

- [ ] Nginx running and healthy
- [ ] No SSL errors in logs
- [ ] Certificate not expired (valid for 15 years)

### ☐ Cloudflare Monitoring

- [ ] Set up Cloudflare email notifications for SSL issues
- [ ] Monitor Cloudflare Analytics for any SSL errors
- [ ] Check Cloudflare Logs for blocked requests

### ☐ Documentation

- [ ] Document VPS IP address in safe location
- [ ] Document Cloudflare Origin Certificate expiration date
- [ ] Save backup copies of `.crt` and `.key` files
- [ ] Update team documentation/wiki with new setup

---

## Troubleshooting

### Issue: "SSL_ERROR_RX_RECORD_TOO_LONG"

**Solution:**
```bash
sudo nginx -t  # Test config
sudo systemctl restart nginx  # Restart
```

- [ ] Issue resolved

### Issue: "SSL certificate problem: self signed certificate"

**Solution:**
1. Check Cloudflare SSL mode is "Full (strict)"
2. Wait 5-10 minutes for propagation
3. Clear browser cache
4. Test in incognito/private window

- [ ] Issue resolved

### Issue: Origin certificate not accepted

**Solution:**
```bash
# Verify certificate is from Cloudflare
sudo openssl x509 -in /etc/nginx/ssl/selfdezign.crt -text | grep -i issuer

# Should show: Cloudflare
```

- [ ] Issue resolved

---

## Rollback Plan (If Needed)

If issues occur, rollback to Flexible SSL:

```bash
# On VPS
sudo cp /tmp/nginx.backup/sites-available/* /etc/nginx/sites-available/
sudo systemctl restart nginx

# In Cloudflare Dashboard
# SSL/TLS → Encryption Mode → Select "Flexible"
```

- [ ] Rollback completed if necessary
- [ ] Service restored

---

## Final Sign-Off

- [ ] All tests passed
- [ ] HTTPS working via Cloudflare
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate valid and trusted
- [ ] HSTS headers present
- [ ] Monitoring set up
- [ ] Team notified of changes
- [ ] Backup copies stored safely

**Implementation Date:** ___________
**Implemented By:** ___________
**Verified By:** ___________

---

## Emergency Contacts

- **VPS Provider Support:** [contact info]
- **Cloudflare Support:** https://support.cloudflare.com
- **Your Team Lead:** [contact info]
