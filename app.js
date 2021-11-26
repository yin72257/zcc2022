const http = require("http");
var express = require("express");
var ticket = require("./routes/ticket");
const port = 8000;
var app = express();

app.set('view engine', 'ejs');

app.use('/', ticket);
  
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});
