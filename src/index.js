const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./router.js");

DB_URL = "mongodb://database:password@localhost:27017/database";
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));  
app.use("/", router);

const port = 3000;
app.listen(port, () => {
  console.log("Server started on port", port);
});