var request = require('request')
var cheerio = require('cheerio');

var express = require('express');
var app = express();

var SERVER_PORT = 12345;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

  res.render('template', {data: "Benvenuto, utilizza il menu' laterale per accedere ai contenuti"});

});

app.get('/ingegneria', function(req, res) {

  request('http://www.scuolapsb.unina.it/downloads/php/collegi_ingegneria.php', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);
    var cdl = $("body");

    res.render('template', {data: cdl});

  });

});

app.get('/scienze', function(req, res) {

  request('http://www.scuolapsb.unina.it/downloads/php/collegi_scienze.php', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);
    var cdl = $("body");

    res.render('template', {data: cdl});

  });

});

app.get('/architettura', function(req, res) {

  request('http://www.scuolapsb.unina.it/downloads/php/collegi_architettura.php', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);
    var cdl = $("body");

    res.render('template', {data: cdl});

  });

});

app.get('/news', function(req, res) {

  request('http://www.scuolapsb.unina.it', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);

    $('a').each(function( index ) {
      console.log( index + ": " + $( this ).attr('href') );
      $(this).attr('href', 'http://www.scuolapsb.unina.it'+$(this).attr('href'));
      console.log( 'NEW' + index + ": " + $( this ).attr('href') );
    });

    var news = $("#fc_items-99-9");

    res.render('template', {data: "<div>"+news+"</div>"});
  });

});

app.listen(SERVER_PORT);
