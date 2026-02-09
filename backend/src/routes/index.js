/**
 * Application routes.
 */

import { Router } from "express";

const router = Router();

/**
 * GET /
 * Health-check / welcome endpoint.
 */
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

/**
 * GET /health
 * Health-check endpoint for monitoring.
 */
router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
