const db = require("../db/queries");

const analyticsMiddleware = async (req, res, next) => {
  try {
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
