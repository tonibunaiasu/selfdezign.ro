#!/bin/bash
# Cloudflare Full SSL Setup Script
# Migrates from Flexible SSL to Full SSL with Cloudflare Origin Certificate
# Prerequisites: You must have Cloudflare Origin Certificate files (cert.crt & key.key)
# Usage: bash scripts/setup-cloudflare-ssl.sh /path/to/cert.crt /path/to/key.key

set -e # Exit on error

echo "🔒 SelfDezign Cloudflare Full SSL Setup"
echo "======================================="

if [ $# -ne 2 ]; then
    echo "❌ Error: You must provide paths to Cloudflare Origin Certificate files"
    echo "Usage: bash scripts/setup-cloudflare-ssl.sh /path/to/cert.crt /path/to/key.key"
    echo ""
    echo "📌 To get Cloudflare Origin Certificate:"
    echo "   1. Go to Cloudflare Dashboard → SSL/TLS → Origin Server"
    echo "   2. Click 'Create Certificate'"
    echo "   3. Download the .crt and .key files"
    exit 1
fi

CERT_FILE="$1"
KEY_FILE="$2"

# Verify certificate files exist
if [ ! -f "$CERT_FILE" ]; then
    echo "❌ Certificate file not found: $CERT_FILE"
    exit 1
fi

if [ ! -f "$KEY_FILE" ]; then
    echo "❌ Key file not found: $KEY_FILE"
    exit 1
fi

echo "📁 Creating SSL directory..."
sudo mkdir -p /etc/nginx/ssl

echo "📋 Copying certificate files..."
sudo cp "$CERT_FILE" /etc/nginx/ssl/selfdezign.crt
sudo cp "$KEY_FILE" /etc/nginx/ssl/selfdezign.key

echo "🔐 Setting proper permissions..."
sudo chmod 600 /etc/nginx/ssl/selfdezign.key
sudo chmod 644 /etc/nginx/ssl/selfdezign.crt

echo "🌐 Configuring Nginx with Full SSL..."
sudo tee /etc/nginx/sites-available/selfdezign > /dev/null << 'NGINX_EOF'
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name selfdezign.ro www.selfdezign.ro;

    # Cloudflare Origin Certificate
    ssl_certificate /etc/nginx/ssl/selfdezign.crt;
    ssl_certificate_key /etc/nginx/ssl/selfdezign.key;

    # Modern SSL/TLS Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Enable HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTP to HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name selfdezign.ro www.selfdezign.ro;
    return 301 https://$server_name$request_uri;
}
NGINX_EOF

echo "🔗 Enabling Nginx site configuration..."
sudo ln -sf /etc/nginx/sites-available/selfdezign /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

echo "✅ Testing Nginx configuration..."
sudo nginx -t

echo "🚀 Restarting Nginx..."
sudo systemctl restart nginx

echo ""
echo "✨ Full SSL Setup Complete!"
echo "======================================="
echo "🔗 Your site is now accessible at: https://selfdezign.ro"
echo ""
echo "📋 Next steps in Cloudflare Dashboard:"
echo "   1. Go to SSL/TLS → Encryption Mode"
echo "   2. Select: Full (strict)"
echo "   3. Verify HSTS is enabled"
echo "   4. Test: curl -i https://selfdezign.ro"
echo ""
echo "📊 Monitor Nginx:"
echo "   systemctl status nginx"
echo "   tail -f /var/log/nginx/error.log"
