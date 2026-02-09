/**
 * Global error-handling middleware.
 */

/**
 * Handles 404 — route not found.
 */
export function notFoundHandler(req, res, _next) {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
}

/**
 * Catches all unhandled errors and returns a consistent JSON response.
 * Must be registered after all other middleware and routes.
 */
// eslint-disable-next-line no-unused-vars
export function globalErrorHandler(err, req, res, _next) {
  const statusCode = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error";

  console.error(`[ERROR] ${req.method} ${req.originalUrl} — ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
