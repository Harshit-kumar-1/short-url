const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8001;
const MONGO_URI = process.env.MONGO_URI;
const urlRouter = require('./routes/url');
const staticRoute = require("./routes/static");
// const ejs = require('ejs');
const path = require('path');

console.log(typeof MONGO_URI);

// mongodb connection
const { connectMongoDB } = require('./connection');

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

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use("/url", urlRouter);
app.use("/", staticRoute);

app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`); })