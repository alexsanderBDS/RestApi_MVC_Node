const express = require("express");
const path = require("path");
const postRouter = require("./routers/posts");
const auth = require("./routers/auth");
const user = require("./routers/user");
const index = require("./routers/index");
const errorPage = require("./routers/errorPage");
const startDB = require("./db/mongodb");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// mongodb init
startDB();

const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(cookieParser());
app.use("/posts", postRouter);
app.use("/user", user);
app.use("/", index);
app.use("/", auth);
app.use("*", errorPage);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
