#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item_name VARCHAR ( 255 ),
    category_id INTEGER
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR ( 255 )
  );

  INSERT INTO categories (category_name) VALUES ('Games'), ('Coding Languages'), ('Computer Parts');

  INSERT INTO items (item_name, category_id) VALUES ('Valorant', 1), ('Marvel Rivals', 1), ('CS:GO', 1), ('God of War' , 1), ('Minecraft', 1), ('Grand Theft Auto V', 1), ('C++', 2), ('Python', 2), ('React Js', 2), ('Express Js', 2), ('CPU', 3), ('Graphics Card', 3), ('Motherboard', 3), ('RAM', 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  const categories = await client.query("SELECT * FROM categories;");
  const items = await client.query("SELECT * FROM items;");
  console.log(categories.rows);
  console.log(items.rows);
  await client.end();
  console.log("done");
}

main();
