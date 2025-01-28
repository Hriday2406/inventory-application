const { Router } = require("express");
const {
  getItemEditHandler,
  postItemEditHandler,
  getItemDeleteHandler,
} = require("../controller/itemController");

const itemRouter = Router();

itemRouter.get("/edit/:id", getItemEditHandler);
itemRouter.post("/edit/:id", postItemEditHandler);
itemRouter.get("/delete/:id", getItemDeleteHandler);

module.exports = itemRouter;
