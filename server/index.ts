import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { appRouter } from "./routers";
import { createTRPCMsw } from "@trpc/server/adapters/express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON and URL-encoded bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Mount tRPC router
  app.use("/api/trpc", createTRPCMsw({ router: appRouter }));

  // Serve static files from both possible locations
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.static(path.join(__dirname, "..", "dist", "public")));

  // Handle client-side routing - serve index.html for all non-static routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(__dirname, "..", "dist", "public", "index.html");
    res.sendFile(indexPath);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
