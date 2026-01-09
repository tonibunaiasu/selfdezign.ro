import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.set("trust proxy", 1);

  const server = createServer(app);
  
  // Determine paths
  const distPath = path.join(__dirname, "..", "dist", "public");
  const indexPath = path.join(distPath, "index.html");
  
  // Log for debugging
  console.log("[Server] __dirname:", __dirname);
  console.log("[Server] distPath:", distPath);
  console.log("[Server] indexPath exists:", fs.existsSync(indexPath));
  
  // Check if dist exists
  if (!fs.existsSync(distPath)) {
    console.error("[ERROR] dist/public directory not found at:", distPath);
    console.error("[ERROR] Contents of", path.join(__dirname, ".."));
    try {
      const parentDir = path.join(__dirname, "..");
      const contents = fs.readdirSync(parentDir);
      console.error("[ERROR] Parent directory contents:", contents);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[ERROR] Could not read parent directory:", message);
    }
  }
  
  // Serve static files from dist/public
  app.use(express.static(distPath));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });
  
  // SPA fallback: serve index.html for all non-static routes
  app.get("*", (req, res) => {
    console.log(`[Server] Serving SPA fallback for path: ${req.path}`);
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error(`[Server] index.html not found at ${indexPath}`);
      res.status(404).send("index.html not found");
    }
  });
  
  const port = Number(process.env.PORT ?? 3000);
  server.listen(port, "0.0.0.0", () => {
    console.log(`[Server] Running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
