/**
 * Express application setup.
 * Registers middleware and routes, then exports the configured app.
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";

import appConfig from "./config/index.js";
import routes from "./routes/index.js";
import {
  notFoundHandler,
  globalErrorHandler,
} from "./middleware/errorHandler.js";

const app = express();

// --------------- Middleware ---------------

// CORS
app.use(cors(appConfig.cors));

// Request logging — concise in production, verbose in development
app.use(morgan(appConfig.isProduction ? "combined" : "dev"));

// Parse incoming JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------- Routes ---------------

app.use("/", routes);

// --------------- Error Handling ---------------

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(globalErrorHandler);

export default app;
