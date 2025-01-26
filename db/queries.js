const pool = require("./pool");

/* ***** Items ***** */

async function addItem(name, category) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE item_name = $1 AND category_id = $2",
    [name, category],
  );
  if (rows.length > 0)
    throw new Error(`Item ${name} already exists in category ${category}`);

  try {
    await pool.query(
      "INSERT INTO items (item_name, category_id) VALUES ($1, $2)",
      [name, category],
    );
    return true;
  } catch (error) {
    throw new Error(
      `Error adding item ${name} to category ${category}: ${error.message}`,
    );
  }
}

async function getAllItems() {
  const { rows } = await pool.query(`SELECT * FROM items;`);
  return rows;
}

async function getAllItemsByCategory(category) {
  const { rows } = await pool.query(
    `SELECT * FROM items WHERE category_id = $1;`,
    [category],
  );
  return rows;
}

async function updateItem(id, name, category) {
  await pool.query(
    "UPDATE items SET item_name = $1, category_id = $2 WHERE id = $3",
    [name, category, id],
  );
  return true;
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
  return true;
}

/* ***** Categories ***** */

async function addCategory(name) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE category_name = $1",
    [name],
  );
  if (rows.length > 0) throw new Error(`Category ${name} already exists`);

  try {
    await pool.query("INSERT INTO categories (category_name) VALUES ($1)", [
      name,
    ]);
    return true;
  } catch (error) {
    throw new Error(`Error adding category ${name}: ${error.message}`);
  }
}

async function getAllCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories;`);
  return rows;
}

async function updateCategory(id, name) {
  await pool.query("UPDATE categories SET category_name = $1 WHERE id = $2", [
    name,
    id,
  ]);
  return true;
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  return true;
}

module.exports = {
  addItem,
  getAllItems,
  getAllItemsByCategory,
  updateItem,
  deleteItem,
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
