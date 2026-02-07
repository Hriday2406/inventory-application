const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const getCategoryHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const allItemsOfCategory = await db.getAllItemsByCategory(id);
  const allCategories = await db.getAllCategories();
  const path = req.path.slice(1);
  res.render("category", { allItemsOfCategory, allCategories, path, id });
});

const getCategoryEditHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await db.getCategory(id);
  const adminPassword = process.env.ADMIN_PASSWORD;
  res.render("editCategory", { category, adminPassword });
});

const postCategoryEditHandler = [
  [
    body("category_name")
      .trim()
      .isLength({ min: 1, max: 25 })
      .withMessage("Category name should be between 1 and 25 characters"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { id } = req.params;
      const category = await db.getCategory(id);
      const adminPassword = process.env.ADMIN_PASSWORD;
      return res
        .status(400)
        .render("editCategory", { errors: errors.array(), category, adminPassword });
    }

    const { id } = req.params;
    const { category_name } = req.body;
    let status = await db.updateCategory(id, category_name);
    if (status) res.redirect("/");
    else throw new Error("Error updating category in Database");
  }),
];

const getCategoryDeleteHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let status = await db.deleteCategory(id);
  if (status) res.redirect("/");
  else throw new Error("Error deleting category from Database");
});

module.exports = {
  getCategoryHandler,
  getCategoryEditHandler,
  postCategoryEditHandler,
  getCategoryDeleteHandler,
};
