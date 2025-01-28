const { Router } = require("express");
const {
  newItemController,
  newCategoryController,
  newItemHandler,
  newCategoryHandler,
} = require("../controller/newController");

const newRouter = Router();

newRouter.get("/item", newItemHandler);
newRouter.post("/item", newItemController);
newRouter.get("/category", newCategoryHandler);
newRouter.post("/category", newCategoryController);

module.exports = newRouter;
