const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const analyticsController = asyncHandler(async (req, res) => {
  const { action } = req.query;
  let analytics;
  
  if (action) {
    analytics = await db.getAnalyticsByAction(action);
  } else {
    analytics = await db.getAllAnalytics();
  }
  
  res.render("analytics", { analytics, filterAction: action || "all" });
});

const trackInteractionHandler = asyncHandler(async (req, res) => {
  const { action, details } = req.body;
  const pageUrl = req.get("referer") || req.originalUrl;
  const userAgent = req.get("user-agent") || "unknown";
  const ipAddress = req.ip || req.connection.remoteAddress || "unknown";
  
  const actionWithDetails = details ? `${action}:${details}` : action;
  
  await db.addAnalytic(actionWithDetails, pageUrl, userAgent, ipAddress);
  
  res.json({ success: true });
});

module.exports = {
  analyticsController,
  trackInteractionHandler,
};
