import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public (the built frontend)
  app.use(express.static(path.join(__dirname, "..", "dist", "public")));

  // SPA fallback: serve index.html for all non-static routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
