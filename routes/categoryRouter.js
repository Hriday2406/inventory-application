const { Router } = require("express");
const {
  getCategoryHandler,
  getCategoryEditHandler,
  postCategoryEditHandler,
  getCategoryDeleteHandler,
} = require("../controller/categoryController");

const categoryRouter = Router();

categoryRouter.get("/:id", getCategoryHandler);
categoryRouter.get("/:id/edit", getCategoryEditHandler);
categoryRouter.post("/:id/edit", postCategoryEditHandler);
categoryRouter.get("/:id/delete", getCategoryDeleteHandler);

module.exports = categoryRouter;
