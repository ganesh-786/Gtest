/**
 * Application configuration.
 * Loads and validates environment variables.
 */

import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const requiredEnvVars = ["PORT"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const appConfig = {
  port: parseInt(process.env.PORT, 10) || 8000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
};

export default appConfig;
