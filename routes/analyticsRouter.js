const { Router } = require("express");
const {
  analyticsController,
  trackInteractionHandler,
} = require("../controller/analyticsController");

const analyticsRouter = Router();

analyticsRouter.get("/", analyticsController);
analyticsRouter.post("/track", trackInteractionHandler);

module.exports = analyticsRouter;
