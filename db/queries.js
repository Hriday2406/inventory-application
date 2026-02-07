const pool = require("./pool");

/* ***** Items ***** */

async function addItem(name, category, count = 1) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE item_name = $1 AND category_id = $2",
    [name, category],
  );
  if (rows.length > 0)
    throw new Error(`Item ${name} already exists in category ${category}`);

  try {
    await pool.query(
      "INSERT INTO items (item_name, category_id, count) VALUES ($1, $2, $3)",
      [name, category, count],
    );
    return true;
  } catch (error) {
    throw new Error(
      `Error adding item ${name} to category ${category}: ${error.message}`,
    );
  }
}

async function getItem(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return rows[0];
}

async function getAllItems() {
  const { rows } = await pool.query(`SELECT * FROM items ORDER BY id;`);
  return rows;
}

async function getAllItemsByCategory(category) {
  const { rows } = await pool.query(
    `SELECT * FROM items WHERE category_id = $1 ORDER BY id;`,
    [category],
  );
  return rows;
}

async function updateItem(id, name, category, count) {
  await pool.query(
    "UPDATE items SET item_name = $1, category_id = $2, count = $3 WHERE id = $4",
    [name, category, count, id],
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

async function getCategory(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function getAllCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories ORDER BY id;`);
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

/* ***** Analytics ***** */

async function addAnalytic(action, pageUrl, userAgent, ipAddress) {
  try {
    await pool.query(
      "INSERT INTO analytics (action, page_url, user_agent, ip_address) VALUES ($1, $2, $3, $4)",
      [action, pageUrl, userAgent, ipAddress],
    );
    return true;
  } catch (error) {
    throw new Error(`Failed to insert analytics record: ${error.message}`);
  }
}

async function getAllAnalytics(limit = 100) {
  const { rows } = await pool.query(
    `SELECT * FROM analytics ORDER BY timestamp DESC LIMIT $1;`,
    [limit],
  );
  return rows;
}

async function getAnalyticsByAction(action, limit = 100) {
  const { rows } = await pool.query(
    `SELECT * FROM analytics WHERE action = $1 ORDER BY timestamp DESC LIMIT $2;`,
    [action, limit],
  );
  return rows;
}

module.exports = {
  addItem,
  getItem,
  getAllItems,
  getAllItemsByCategory,
  updateItem,
  deleteItem,
  addCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  addAnalytic,
  getAllAnalytics,
  getAnalyticsByAction,
};
