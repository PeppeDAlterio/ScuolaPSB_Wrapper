var request = require('request')
var cheerio = require('cheerio');

var express = require('express');
var app = express();

var SERVER_PORT = 12345;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

  request('http://www.scuolapsb.unina.it', function(error, response, body) {
    console.log("error: " + error + " " + response.statusCode);

    var $ = cheerio.load(body);
    var news = $("#fc_items-99-9");

    res.render('index', {data: "<div>"+news+"</div>"});
  });

});

app.listen(SERVER_PORT);
