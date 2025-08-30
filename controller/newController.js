const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const newItemController = [
  [
    body("item_name")
      .trim()
      .isLength({ min: 1, max: 25 })
      .withMessage("Item name should be between 1 and 25 characters"),
    body("count")
      .isInt({ min: 1 })
      .withMessage("Count must be a positive integer"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const allCategories = await db.getAllCategories();
      return res
        .status(400)
        .render("newItem", { errors: errors.array(), allCategories });
    }

    let { item_name, category_id, count } = req.body;
    item_name = item_name.trim();
    if (!item_name || item_name.length === 0)
      throw new Error("Item name cannot be empty");
    if (!category_id || category_id <= 0) throw new Error("Category not valid");
    
    // Validate count
    count = parseInt(count) || 1;
    if (count <= 0) throw new Error("Count must be a positive number");
    
    let status = await db.addItem(item_name, category_id, count);
    if (status) res.redirect("/");
    else throw new Error("Error adding item to Database");
  }),
];

const newCategoryController = [
  [
    body("category_name")
      .trim()
      .isLength({ min: 1, max: 25 })
      .withMessage("Category name should be between 1 and 25 characters"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).render("newCategory", { errors: errors.array() });

    let { category_name } = req.body;
    category_name = category_name.trim();
    if (!category_name || category_name.length === 0)
      throw new Error("Category name cannot be empty");
    let status = await db.addCategory(category_name);
    if (status) res.redirect("/");
    else throw new Error("Error adding category to Database");
  }),
];

const newItemHandler = asyncHandler(async (req, res) => {
  const allCategories = await db.getAllCategories();
  res.render("newItem", { allCategories });
});

const newCategoryHandler = async (req, res) => {
  res.render("newCategory");
};

module.exports = {
  newItemController,
  newCategoryController,
  newItemHandler,
  newCategoryHandler,
};
