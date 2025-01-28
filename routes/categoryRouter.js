const { Router } = require("express");
const { categoryHandler } = require("../controller/categoryController");

const categoryRouter = Router();

categoryRouter.get("/:id", categoryHandler);

module.exports = categoryRouter;
