#!/bin/bash

# Deploy script pentru SelfDezign
# Acest script se va executa pe VPS cand primeste apelul webhook de la GitHub

echo "[$(date)] - Deployment initiated"

# Directorul proiectului pe VPS
PROJECT_DIR="/home/runner/selfdezign.ro"
LOG_FILE="/tmp/deploy.log"

echo "[$(date)] - Deployment started" >> $LOG_FILE

# Crează directorul dacă nu există
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

echo "[$(date)] - Pulling latest code from GitHub" >> $LOG_FILE

# Inițializează git repo dacă nu există
if [ ! -d .git ]; then
  git init
  git remote add origin https://github.com/tonibunaiasu/selfdezign.ro.git
fi

# Trage codul latest
git fetch origin main
git checkout origin/main -- .

echo "[$(date)] - Code pulled successfully" >> $LOG_FILE

# Oprește containerul vechi
echo "[$(date)] - Stopping old container" >> $LOG_FILE
docker stop selfdezign-app 2>/dev/null || true
docker rm selfdezign-app 2>/dev/null || true

echo "[$(date)] - Building Docker image" >> $LOG_FILE

# Construiește noua imagine Docker
docker build -t selfdezign-app:latest . >> $LOG_FILE 2>&1

if [ $? -ne 0 ]; then
  echo "[$(date)] - ERROR: Docker build failed" >> $LOG_FILE
  exit 1
fi

echo "[$(date)] - Docker build successful" >> $LOG_FILE

# Pornește noul container
echo "[$(date)] - Starting new container" >> $LOG_FILE
docker run -d --name selfdezign-app -p 3000:3000 selfdezign-app:latest >> $LOG_FILE 2>&1

if [ $? -eq 0 ]; then
  echo "[$(date)] - Container started successfully" >> $LOG_FILE
  echo "SUCCESS: Deployment complete"
else
  echo "[$(date)] - ERROR: Failed to start container" >> $LOG_FILE
  exit 1
fi

sleep 5
echo "[$(date)] - Deployment finished" >> $LOG_FILE
