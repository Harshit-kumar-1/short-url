const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8001;
const MONGO_URI = process.env.MONGO_URI;
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const staticRouter = require("./routes/static");
// const ejs = require('ejs');
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

// mongodb connection
const { connectMongoDB } = require("./connection");

connectMongoDB(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("mongoDB Connect");
  })
  .catch((err) => {
    console.log("err : ", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictLoggedInUserOnly, urlRouter);
app.use("/user", userRouter);
app.use("/",checkAuth, staticRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
