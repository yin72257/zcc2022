const http = require("http");
var express = require("express");
var app = express();
var ticket = require("./routes/ticket");

const hostname = "127.0.0.1";
const port = 8000;
// Create HTTP server
app.get('/', function(req, res) {
    res.send('Hello World!1!!')
});

app.use('/tickets/', ticket);

  
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});
