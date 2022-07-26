// const sql = require("mssql");
// const config = require("./dbconfig.js");

// // let a;
// // let b;
// // function add(a, b) {
// //   retrun(a + b);
// // }

// function additem(req, res) {
//   // connect to your database
//   sql.connect(config, function (err) {
//     if (err) console.log(err);

//     // create Request object
//     let request = new sql.Request(); // a global connection pool is maintained by default
//     request.input("Id", sql.Int, req.body.Id);
//     request.input("Title", sql.NVarChar, req.body.Title);
//     request.input("Quantity", sql.Numeric, req.body.Quantity);
//     request.input("Message", sql.NVarChar, req.body.Message);
//     request.input("City", sql.NVarChar, req.body.City);

//     request.execute("spInsert", ())

//   });
// }
