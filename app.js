const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

const asyncHandler = require("express-async-handler");
const db = require("./db/queries");
const analyticsMiddleware = require("./middleware/analyticsMiddleware");
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
const itemRouter = require("./routes/itemRouter");
const categoryRouter = require("./routes/categoryRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Track page views
app.use(analyticsMiddleware);

// Analytics tracking endpoint (write-only)
app.post("/analytics/track", asyncHandler(async (req, res) => {
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
}));

app.use("/new", newRouter);
app.use("/item", itemRouter);
app.use("/category", categoryRouter);
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
