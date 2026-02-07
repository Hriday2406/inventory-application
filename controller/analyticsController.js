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
  
  // Validate action - only allow action types that are implemented in client-side tracking
  const allowedActions = ['button_click', 'form_submit'];
  if (!action || !allowedActions.includes(action)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid action type' 
    });
  }
  
  // Sanitize details - limit length and ensure it's a string
  const sanitizedDetails = details 
    ? String(details).substring(0, 200)
    : '';
  
  const pageUrl = req.get("referer") || req.originalUrl;
  const userAgent = req.get("user-agent") || "unknown";
  const ipAddress = req.ip || req.socket?.remoteAddress || "unknown";
  
  const actionWithDetails = sanitizedDetails ? `${action}:${sanitizedDetails}` : action;
  
  await db.addAnalytic(actionWithDetails, pageUrl, userAgent, ipAddress);
  
  res.json({ success: true });
});

module.exports = {
  analyticsController,
  trackInteractionHandler,
};
