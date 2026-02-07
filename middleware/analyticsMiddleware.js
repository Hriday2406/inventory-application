const db = require("../db/queries");

const analyticsMiddleware = async (req, res, next) => {
  try {
    // Skip tracking for analytics routes, static assets, and API endpoints
    const shouldSkipTracking = 
      req.originalUrl.startsWith('/analytics') ||
      req.originalUrl.startsWith('/styles') ||
      req.originalUrl.startsWith('/scripts') ||
      req.originalUrl.startsWith('/images') ||
      req.originalUrl.startsWith('/favicon');

    if (shouldSkipTracking) {
      return next();
    }

    const action = "page_view";
    const pageUrl = req.originalUrl;
    const userAgent = req.get("user-agent") || "unknown";
    const ipAddress =
      req.ip || req.connection.remoteAddress || "unknown";

    // Track page view asynchronously without blocking the request
    db.addAnalytic(action, pageUrl, userAgent, ipAddress).catch((err) => {
      console.error("Error tracking analytics:", err);
    });
  } catch (error) {
    console.error("Analytics middleware error:", error);
  }
  next();
};

module.exports = analyticsMiddleware;
