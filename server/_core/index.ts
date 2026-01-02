import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth.js";
import { appRouter } from "../routers.js";
import { createContext } from "./context.js";
import { serveStatic } from "./vite.js";
import { healthRouter } from "./health.js";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
 // Trust Cloudflare proxy headers
 app.set('trust proxy', ['cloudflare', '127.0.0.1']);

 // Prevent redirect loop with Cloudflare Flexible SSL
 // When using Cloudflare Free (Flexible mode), traffic arrives as HTTP to origin
 // Only redirect to HTTPS if NOT coming from Cloudflare
 app.use((req, res, next) => {
   const isBehindCloudflare = req.headers['cf-ray'] || req.headers['cf-connecting-ip'];
   const isProduction = process.env.NODE_ENV === 'production';
   
   // In production: redirect to HTTPS only if NOT from Cloudflare
   if (isProduction && !isBehindCloudflare && req.protocol === 'http') {
     return res.redirect(301, `https://${req.headers.host}${req.url}`);
   }
   
   next();
 });

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Health check endpoints
  app.use(healthRouter);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
