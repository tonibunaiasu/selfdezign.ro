# SelfDezign - Website Profesionist

> Studio de design interior si arhitectura din Bucuresti

## Despre Proiect

**SelfDezign** este o platforma web profesionista care prezinta serviciile unui studio de design interior si arhitectura specializat in:

- Proiecte pentru birouri - Spatii de lucru moderne si ergonomice
- Hoteluri & Restaurante - Design comercial de lux
- Spatii rezidentiale - Interioare personalizate

**Live:** https://www.selfdezign.ro

---

## Tech Stack

| Categorie | Tehnologie |
|-----------|------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Backend** | Node.js, Express, Drizzle ORM |
| **Database** | PostgreSQL |
| **Deployment** | Docker, Nginx, Hostinger VPS |
| **CI/CD** | GitHub Actions |
| **CDN** | Cloudflare |
| **Code Quality** | ESLint, Prettier, Vitest |

---

## Structura Proiectului

```
selfdezign.ro/
├── client/                 # Frontend React app (Vite)
├── server/                 # Backend Node.js
├── shared/                 # Cod shared dintre frontend si backend
├── drizzle/                # Database migrations
├── .github/workflows/      # GitHub Actions pipelines
├── Dockerfile              # Docker configuration
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
├── .gitignore              # Git ignore rules
├── DEPLOYMENT.md           # Deployment instructions
├── README.md               # This file
└── LICENSE                 # MIT License
```

---

## Instalare & Setup

### Prerequisites
- Node.js 18+
- npm sau pnpm
- Docker (optional)

### Development Setup

```bash
# Clone repository
git clone https://github.com/tonibunaiasu/selfdezign.ro.git
cd selfdezign.ro

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Build pentru Production

```bash
# Build client & server
npm run build

# Test production build
npm run preview
```

---

## Comenzi Principale

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build client + server
npm run build:client # Build only frontend
npm run build:server # Build only backend

# Testing
npm run test         # Run unit tests
npm run test:ui      # Run tests in UI mode

# Code Quality
npm run lint         # ESLint check
npm run format       # Prettier format
npm run type-check   # TypeScript check

# Preview
npm run preview      # Preview production build locally
```

---

## Deployment

### Hosted pe Hostinger VPS

Vezi [DEPLOYMENT.md](./DEPLOYMENT.md) pentru instructiuni detaliate de deployment pe VPS.

**Rezumat rapid:**
1. Build: `npm run build`
2. Copy dist files: `cp -r dist/public/* /opt/selfdezign/app/client/`
3. Reload Nginx: `systemctl reload nginx`
4. Verify: `curl -I https://www.selfdezign.ro`

### Docker Setup

```bash
# Build Docker image
docker build -t selfdezign:latest .

# Run container
docker run -p 5173:5173 selfdezign:latest
```

---

## Security & Best Practices

- ✅ `.env` files excludute din git (.gitignore)
- ✅ Dependabot alerts monitorate
- ✅ HTTPS enforced pe site
- ✅ Content Security Policy configured
- ✅ Regular dependency updates

---

## Documentatie Suplimentara

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Setup VPS & Deployment
- [ideas.md](./ideas.md) - Feature ideas & roadmap
- [todo.md](./todo.md) - In-progress tasks

---

## Contact

- **Website:** https://www.selfdezign.ro
- **GitHub:** https://github.com/tonibunaiasu/selfdezign.ro

**Built with love by SelfDezign**

## Content Management

- **Admin Interface**: Decap CMS at https://www.selfdezign.ro/admin
- **GitHub OAuth**: Secure authentication for content editors
# Strategic fix complete
