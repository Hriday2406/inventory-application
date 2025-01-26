const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const indexController = asyncHandler(async (req, res) => {
  const allItems = await db.getAllItems();
  const allCategories = await db.getAllCategories();
  res.render("index", { allItems, allCategories });
});

module.exports = { indexController };
