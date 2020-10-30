var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var url = require("url");
var adr = 'http://localhost:3000';
var adrData = '/datahubio_oscar_data_json.json';
var urlData = new URL(adrData, adr);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
