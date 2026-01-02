#!/bin/bash

# Setup script for SelfDezign VPS deployment
# Usage: bash scripts/setup-vps.sh

set -e  # Exit on error

echo "🚀 SelfDezign VPS Setup - PM2 + Nginx"
echo "====================================="

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 (LTS)
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2
pm2 startup
pm2 save

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install -y nginx

# Create app directory
echo "📁 Creating app directory..."
sudo mkdir -p /var/www/selfdezign
sudo chown -R $(whoami):$(whoami) /var/www/selfdezign
cd /var/www/selfdezign

# Clone repository
echo "📥 Cloning repository..."
git clone https://github.com/tonibunaiasu/selfdezign.ro.git . || git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build
echo "🔨 Building application..."
npm run build

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start "npm run preview" --name "selfdezign" --cwd /var/www/selfdezign
pm2 save

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/selfdezign > /dev/null << 'EOF'
server {
    listen 80;
    server_name selfdezign.ro www.selfdezign.ro;
    
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
EOF

sudo ln -sf /etc/nginx/sites-available/selfdezign /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "✅ Setup completed!"
echo "🌐 Website running at: http://www.selfdezign.ro"
echo "📊 PM2 status: pm2 status"
echo "📋 PM2 logs: pm2 logs"
