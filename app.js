var express = require("express");
var ticket = require("./routes/ticket");
var app = express();

app.set('view engine', 'ejs');

app.use('/', ticket.router);

module.exports = app;

