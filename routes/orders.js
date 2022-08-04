const express = require("express");
const router = express.Router();

const {
  edititem,
  additem,
  deleteitem,
  getItems,
  // executeStoredProcedure,
} = require("../controller/dboperations");

// == Read function
router.get("/getitems", getItems);

// == add  function
router.post("/additem", additem);

// == update function
router.put("/edititem/:id", edititem);

// == delete function
router.delete("/deleteitem/:id", deleteitem);

module.exports = router;
