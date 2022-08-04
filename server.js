const express = require("express");
const bodyParser = require("body-parser");
// const Router = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// to use json in the application
app.use(bodyParser.json());

const userRoute = require("./routes/orders");

app.use("/", userRoute);

PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running at ${PORT}`);
});

// seperation of concern
// archie
