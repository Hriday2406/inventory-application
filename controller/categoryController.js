const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const categoryHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const allItemsOfCategory = await db.getAllItemsByCategory(id);
  const allCategories = await db.getAllCategories();
  const path = req.path.slice(1);
  res.render("category", { allItemsOfCategory, allCategories, path });
});

module.exports = { categoryHandler };
