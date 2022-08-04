const sql = require("mssql");
const config = require("../dbconfig.js");
const { OrderModel } = require("../model/orderModel.js");

function sqlParams(requestBody) {
  let parameters = [
    {
      name: "Id",
      type: sql.Int,
      value: requestBody.Id,
      output: false,
    },
    {
      name: "Title",
      type: sql.NVarChar,
      value: requestBody.Title,
      output: false,
    },
    {
      name: "Quantity",
      type: sql.Numeric,
      value: requestBody.Quantity,
      output: false,
    },
    {
      name: "Message",
      type: sql.NVarChar,
      value: requestBody.Message,
      output: false,
    },
    {
      name: "City",
      type: sql.NVarChar,
      value: requestBody.City,
      output: false,
    },
  ];
  return parameters;
}

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

    // request.input("Id", sql.Int, req.body.Id);
    // request.input("Title", sql.NVarChar, req.body.Title);
    // request.input("Quantity", sql.Numeric, req.body.Quantity);
    // request.input("Message", sql.NVarChar, req.body.Message);
    // request.input("City", sql.NVarChar, req.body.City);
    try {
      let parameters = sqlParams(req.body);

      if (Array.isArray(parameters)) {
        parameters.forEach((param) => {
          if (param.type !== undefined) {
            if (param.output == true) {
              request.output(param.name, param.type, param.value);
            } else {
              request.input(param.name, param.type, param.value);
            }
          }
        });
      }

      request.execute("spInsert", (err, request) => {
        if (err) {
          res.send("something went wrong : " + err.name);
          console.log(err);
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

    try {
      let parameters = sqlParams(req.body);

      // let m = new OrderModel(req.body);
      // console.log(m);

      if (Array.isArray(parameters)) {
        parameters.forEach((param) => {
          if (param.type !== undefined) {
            if (param.output == true) {
              request.output(param.name, param.type, param.value);
            } else {
              request.input(param.name, param.type, param.value);
            }
          }
        });
      }

      request.execute("spUpdateItem", (err, result) => {
        if (err) {
          res.send("something went wrong: " + err.message);
          console.log(err);
        } else {
          res.send("Item updated");
          // console.log(result);
        }
      });
    } catch (err) {
      res.send(err.message);
      console.log(err);
    }
  });
  //   console.log(req.body);
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
        if (err) {
          res.send("this item doesn't exist: " + err);
          console.log(err);
        } else {
          res.send("Item Deleted successfully");
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
