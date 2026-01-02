# 🚀 Deployment Best Practices - SelfDezign

## 1. **Test Local Build ÎNAINTE de Push**

```bash
# Testează build-ul local
pnpm build

# Testează Docker build local
docker build -t selfdezign-test .
docker run -p 3000:3000 selfdezign-test

# Verifică că containerul pornește fără erori
curl http://localhost:3000
```

**De ce:** Detectezi erorile în 30 secunde local, nu în 2 minute pe GitHub Actions.

---

## 2. **Validare TypeScript Strictă**

```bash
# Rulează TypeScript compiler înainte de commit
pnpm tsc --noEmit

# Sau adaugă pre-commit hook
npm install husky lint-staged --save-dev
npx husky install
```

**Fișier `.husky/pre-commit`:**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm tsc --noEmit
pnpm test
```

---

## 3. **Verificare Build Script**

**Problema din azi:** Build script-ul avea path issues.

**Soluție:** Testează build script-ul în izolare:

```bash
# Rulează exact ce face GitHub Actions
rm -rf dist
vite build
tsc -p tsconfig.build.json || true
cp -r shared dist/
rm -f dist/vite.config.js dist/drizzle.config.js dist/shared/shared

# Verifică structura output
ls -la dist/
ls -la dist/server/
ls -la dist/shared/
```

---

## 4. **Health Checks în GitHub Actions**

**Adaugă în workflow după deploy:**

```yaml
- name: Health Check
  run: |
    for i in {1..30}; do
      if curl -f https://selfdezign.ro/health; then
        echo "✅ Site is online!"
        exit 0
      fi
      echo "Attempt $i/30... waiting..."
      sleep 5
    done
    echo "❌ Site failed to come online"
    exit 1
```

---

## 5. **Logging & Monitoring**

**SSH în VPS și verifică logs:**

```bash
ssh root@31.97.125.27

# Verifică Docker container status
docker ps -a
docker logs -f selfdezign

# Verifică port 3000
netstat -tlnp | grep 3000

# Verifică nginx reverse proxy
curl -v http://localhost:3000
```

---

## 6. **Commit Strategy**

### ✅ **BUN: Commit-uri mici și testabile**
```
✓ "Add admin dashboard"
✓ "Fix TypeScript errors in routers.ts"
✓ "Update Dockerfile shared folder copy"
```

### ❌ **RĂU: Commit-uri mari cu multiple schimbări**
```
✗ "Fix server startup - correct shared import paths and build script"
  (Conține 3+ schimbări nerelaționate)
```

---

## 7. **Rollback Strategy**

**Dacă deployment se blochează:**

```bash
# 1. Revert la commit anterior
git reset --hard <commit_hash>
git push -f origin main

# 2. GitHub Actions va declanșa automat
# 3. Monitorizează: https://github.com/tonibunaiasu/selfdezign.ro/actions

# 4. Dacă nu merge, rollback manual pe VPS:
ssh root@31.97.125.27
cd /app
git log --oneline -5
git reset --hard <working_commit>
docker-compose restart
```

---

## 8. **Checklist Pre-Push**

```bash
# 1. Build local
pnpm build
echo "✓ Build successful"

# 2. TypeScript check
pnpm tsc --noEmit
echo "✓ TypeScript OK"

# 3. Tests
pnpm test
echo "✓ Tests passed"

# 4. Docker build
docker build -t selfdezign-test .
echo "✓ Docker build OK"

# 5. Docker run
docker run -d -p 3000:3000 --name test selfdezign-test
sleep 3
curl http://localhost:3000 && echo "✓ Container running"
docker stop test && docker rm test

# 6. Git check
git status
git diff --stat

# 7. Push
git push origin main
```

---

## 9. **Monitoring Post-Deploy**

**Adaugă în cron job (verifică la 5 minute):**

```bash
# /etc/cron.d/selfdezign-monitor
*/5 * * * * root curl -f https://selfdezign.ro/health || (systemctl restart docker && docker-compose -f /app/docker-compose.yml up -d)
```

---

## 10. **Documentație Path Resolution**

**Fișier: `PATH_RESOLUTION.md`**

```
SHARED FOLDER RESOLUTION:

Build Time:
  - TypeScript compiles: server/ → dist/server/
  - Shared copied: shared/ → dist/shared/
  - Result: dist/server/, dist/shared/, dist/public/

Runtime (Docker):
  - Container starts: node dist/server/_core/index.js
  - Imports resolve: dist/server/ + dist/shared/
  - Path aliases (@shared) DON'T work in production
  - Use relative paths: ../../shared/const.js

Import Rules:
  ✓ Relative paths with .js extension (production)
  ✓ Path aliases with .ts extension (development)
  ✗ Path aliases without .js extension (production)
  ✗ Absolute paths (breaks in Docker)
```

---

## 11. **GitHub Actions Improvements**

**Adaugă în workflow:**

```yaml
- name: Verify Build Output
  run: |
    echo "Checking dist structure..."
    test -d dist/server || (echo "❌ dist/server missing" && exit 1)
    test -d dist/shared || (echo "❌ dist/shared missing" && exit 1)
    test -d dist/public || (echo "❌ dist/public missing" && exit 1)
    echo "✓ All directories present"

- name: Test Docker Build
  run: |
    docker build -t selfdezign-ci .
    docker run -d -p 3000:3000 --name ci-test selfdezign-ci
    sleep 5
    curl -f http://localhost:3000 || exit 1
    docker stop ci-test
    echo "✓ Docker build and run successful"
```

---

## 12. **Rapid Incident Response**

**Dacă site-ul cade:**

1. **Verifică status:** `curl https://selfdezign.ro`
2. **Verifică GitHub Actions:** Caută erori în logs
3. **SSH pe VPS:** `docker logs -f selfdezign`
4. **Rollback dacă necesar:** `git reset --hard <last_working_commit>`
5. **Monitor:** Așteptă 2-3 minute pentru deployment

---

## Rezumat: Erori Evitate Azi

| Eroare | Cauză | Prevenție |
|--------|-------|----------|
| `Cannot find module '/app/shared/const.js'` | Path alias în production | Testează Docker local |
| Build blocat 1m 8s | Fără health checks | Adaugă health check în workflow |
| 502 Bad Gateway | Container nu a pornit | Monitorizează logs |
| Nicio notificare | Fără alerting | Adaugă cron monitor |

---

## 🎯 Action Items

- [ ] Adaugă pre-commit hooks cu TypeScript check
- [ ] Testează Docker build local înainte de push
- [ ] Adaugă health checks în GitHub Actions workflow
- [ ] Configurează cron monitor pe VPS
- [ ] Documentează path resolution în proiect
- [ ] Creează runbook pentru incident response


## 13. **Cloudflare SSL/TLS Configuration**

### Problema: ERR_TOO_MANY_REDIRECTS cu Cloudflare Flexible SSL

Dacă folosești Cloudflare Free plan cu modul **Flexible SSL**, serverul tău primește request-uri pe HTTP, dar le redirecționează la HTTPS, ceea ce crează un loop infinit:

```
Visitor (HTTPS) → Cloudflare (decrypts) → Origin (HTTP)
         ↑                                        ↓
         ←───── Server redirect HTTP→HTTPS ─────┘
```

### Soluție: Detect Cloudflare Headers

Middleware-ul din `server/_core/index.ts` detectează traficul din Cloudflare și **NU** redirecționează HTTPS dacă vine de acolo:

```typescript
// Detectează header-ele Cloudflare
const isBehindCloudflare = req.headers['cf-ray'] || req.headers['cf-connecting-ip'];

// Redirect doar dacă NU ești în spatele Cloudflare
if (isProduction && !isBehindCloudflare && req.protocol === 'http') {
  return res.redirect(301, `https://${req.headers.host}${req.url}`);
}
```

### Cloudflare Settings (Recomandări):

1. **SSL/TLS Mode**: Setează pe **Flexible** (Free) sau **Full** (cu certificat pe origin)
2. **Always Use HTTPS**: ✅ Enabled (Cloudflare va força vizitatorii să folosească HTTPS)
3. **HSTS**: ✅ Enabled (cu max-age pe 6 luni minimum)
4. **Opportunistic Encryption**: ✅ Enabled
5. **Automatic HTTPS Rewrites**: ✅ Enabled

### Testing:

```bash
# Testează dacă serverul răspunde corect pe HTTP (ca Cloudflare)
curl -i http://localhost:3000
# → Ar trebui să primești response-ul (NU redirect)

# Testează dacă redirect HTTP→HTTPS funcționează LOCAL (fără Cloudflare headers)
curl -i -H "Host: selfdezign.ro" http://localhost:3000
# → Ar trebui să primești 301 redirect la HTTPS
```

### Migrare la Full SSL (Opțional, pentru mai mult control):

Dacă dorești să folosești Cloudflare **Full** mode (mai sigur):
1. Genereaza Cloudflare Origin Certificate din dashboard
2. Instalează-l pe origin (nginx/express)
3. Setează SSL/TLS Mode pe **Full (strict)**
4. Acum toate comunicatiile sunt HTTPS end-to-end

---
