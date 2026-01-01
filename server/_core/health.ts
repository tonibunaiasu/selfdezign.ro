import { Router } from "express";
import { getDb } from "../db.js";

export const healthRouter = Router();

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  checks: {
    server: boolean;
    database: boolean;
    version: string;
  };
}

healthRouter.get("/health", async (req, res) => {
  const health: HealthStatus = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    checks: {
      server: true,
      database: false,
      version: "1.0.0",
    },
  };

  try {
    const db = await getDb();
    if (db) {
      health.checks.database = true;
    } else {
      health.status = "degraded";
    }
  } catch (error) {
    health.status = "degraded";
    console.error("[Health Check] Database error:", error);
  }

  const statusCode = health.status === "healthy" ? 200 : 503;
  res.status(statusCode).json(health);
});

healthRouter.get("/health/ready", async (req, res) => {
  try {
    const db = await getDb();
    if (db) {
      res.status(200).json({ ready: true });
    } else {
      res.status(503).json({ ready: false, reason: "Database not available" });
    }
  } catch (error) {
    res.status(503).json({ ready: false, reason: "Health check failed" });
  }
});

healthRouter.get("/health/live", (req, res) => {
  res.status(200).json({ live: true });
});
