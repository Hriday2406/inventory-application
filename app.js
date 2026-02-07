const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

const asyncHandler = require("express-async-handler");
const db = require("./db/queries");
const analyticsMiddleware = require("./middleware/analyticsMiddleware");
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
const itemRouter = require("./routes/itemRouter");
const categoryRouter = require("./routes/categoryRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Track page views
app.use(analyticsMiddleware);

app.use("/new", newRouter);
app.use("/item", itemRouter);
app.use("/category", categoryRouter);
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
