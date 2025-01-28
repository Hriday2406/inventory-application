const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getItemEditHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await db.getItem(id);
  const allCategories = await db.getAllCategories();
  res.render("editItem", { item, allCategories });
});

const postItemEditHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { item_name, category_id } = req.body;

  let status = await db.updateItem(id, item_name, category_id);

  if (status) res.redirect("/");
  else throw new Error("Error updating item in Database");
});

const getItemDeleteHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let status = await db.deleteItem(id);
  if (status) res.redirect("/");
  else throw new Error("Error deleting item from Database");
});

module.exports = {
  getItemEditHandler,
  postItemEditHandler,
  getItemDeleteHandler,
};
