#!/bin/bash
# VPS Setup Script - Configures everything for selfdezign.ro deployment

echo "====================================="
echo "SelfDezign VPS Setup"
echo "====================================="

# 1. Stop old webhook receiver
echo "[1/4] Stopping old webhook receiver..."
pkill -f webhook-receiver || true
sleep 1

# 2. Create webhook script
echo "[2/4] Creating webhook receiver script..."
cat > /home/runner/webhooks/webhook-receiver.sh << 'WEBHOOKEOF'
#!/bin/bash
PORT=8888
echo "Starting webhook receiver on port $PORT..."
while true; do
  {
    read -t 2 request
    if [[ "$request" == *"POST"* ]]; then
      echo "[Webhook] Received POST request at $(date)"
      /bin/bash /home/runner/webhooks/deploy.sh >> /tmp/deploy.log 2>&1
      echo -ne "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: 30\r\n\r\n"
      echo -ne '{"status":"deployment_triggered"}'
    else
      echo -ne "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n"
    fi
  } | nc -l -p $PORT -q 1
done
WEBHOOKEOF

chmod +x /home/runner/webhooks/webhook-receiver.sh

# 3. Start webhook receiver
echo "[3/4] Starting webhook receiver on port 8888..."
nohup /home/runner/webhooks/webhook-receiver.sh > /tmp/webhook.log 2>&1 &
WEBHOOK_PID=$!
sleep 2

# 4. Verify webhook is running
echo "[4/4] Verifying setup..."
if lsof -i :8888 > /dev/null 2>&1; then
  echo "✓ Webhook receiver is listening on port 8888"
else
  echo "✗ ERROR: Webhook receiver not listening on port 8888"
  tail -20 /tmp/webhook.log
  exit 1
fi

echo ""
echo "====================================="
echo "Setup Complete!"
echo "====================================="
echo "Webhook URL: http://31.97.125.27:8888"
echo "Next: Update GitHub Secret VPS_WEBHOOK_URL"
echo "Then: Push code to trigger automatic deployment"
echo "====================================="
