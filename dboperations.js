const sql = require("mssql");
const config = require("./dbconfig.js");

function getItems(req, res) {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    let request = new sql.Request(); // a global connection pool is maintained by default

    try {
      // query to the database and get the records
      request.execute("spReadItems", function (err, result) {
        if (err) {
          console.log(err);
        }

        // send records as a response
        res.send(result.recordset);
      });
    } catch (err) {
      console.log(err);
    }
  });
}

function additem(req, res) {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    let request = new sql.Request(); // a global connection pool is maintained by default
    request.input("Id", sql.Int, req.body.Id);
    request.input("Title", sql.NVarChar, req.body.Title);
    request.input("Quantity", sql.Numeric, req.body.Quantity);
    request.input("Message", sql.NVarChar, req.body.Message);
    request.input("City", sql.NVarChar, req.body.City);

    // request.execute("spInsert", (err, result) => {
    //   if (!err) {
    //     console.log(result);
    //     res.send("New Item added");
    //   } else {
    //     throw new Error("already exists");
    //     // console.log(err);
    //   }
    // });

    try {
      request.execute("spInsert", (err, request) => {
        if (err) {
          res.send("something went wrong : " + err.name);
        } else {
          res.send("new item added");
        }
      });
    } catch (err) {
      console.log(err.message);
      res.send(err.message);
    }
  });
}

function edititem(req, res) {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();
    request.input("Id", sql.Int, req.body.Id);
    request.input("Title", sql.NVarChar, req.body.Title);
    request.input("Quantity", sql.Numeric, req.body.Quantity);
    request.input("Message", sql.NVarChar, req.body.Message);
    request.input("City", sql.NVarChar, req.body.City);

    try {
      request.execute("spUpdateItem", (err, result) => {
        if (!err) {
          console.log(result);
          res.send("Item updated");
        } else {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  console.log(req.body);
}

function deleteitem(req, res) {
  // connect to database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    let request = new sql.Request();
    request.input("Id", sql.Int, req.params.id);

    try {
      // query to the database and get the records
      request.execute("spDeleteItem", (err, result) => {
        if (!err) {
          console.log(result);
          res.send("Item Deleted successfully");
        } else {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = {
  getItems: getItems,
  additem: additem,
  edititem: edititem,
  deleteitem: deleteitem,
};
