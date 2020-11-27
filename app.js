var express = require("express");
// var expressLayouts = require('express-ejs-layouts');
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressLayouts);
app.set('view engine','ejs');

routes(app);

var server = app.listen(3000, function () {
  console.log("app running on port.", server.address().port);
});

