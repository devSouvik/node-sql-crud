const express = require("express");
const bodyParser = require("body-parser");
// const Router = require("express");

const app = express();

const {
  edititem,
  additem,
  deleteitem,
  getItems,
} = require("./dboperations.js");

// app.use(bodyParser.urlencoded({ extended: false }));

// to use json in the application
app.use(bodyParser.json());

// == Read function
app.get("/getitems", getItems);

// == add  function
app.post("/additem", additem);

// == update function
app.put("/edititem/:id", edititem);

// == delete function
app.delete("/deleteitem/:id", deleteitem);

PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running at ${PORT}`);
});
