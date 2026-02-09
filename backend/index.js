/**
 * Server entry point.
 * Starts the Express server and handles graceful shutdown.
 */

import app from "./src/app.js";
import appConfig from "./src/config/index.js";

const server = app.listen(appConfig.port, () => {
  console.log(
    `[server] running in ${appConfig.nodeEnv} mode at http://localhost:${appConfig.port}`
  );
});

// ---------- Graceful shutdown ----------

function shutdown(signal) {
  console.log(`\n[server] ${signal} received — shutting down gracefully…`);
  server.close(() => {
    console.log("[server] closed");
    process.exit(0);
  });

  // Force exit after 10 seconds if connections linger
  setTimeout(() => {
    console.error("[server] forcing shutdown after timeout");
    process.exit(1);
  }, 10_000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error("[server] unhandled rejection:", reason);
});

// Catch uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("[server] uncaught exception:", err);
  shutdown("uncaughtException");
});
