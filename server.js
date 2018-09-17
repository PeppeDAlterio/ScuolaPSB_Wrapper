var request = require('request')
var cheerio = require('cheerio');

var express = require('express');
var app = express();

app.use('/css', express.static('views/css'));

var SERVER_PORT = 12345;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

  res.render('template', {title: "UniNA Scuola PSB Wraper", data: "Benvenuto, utilizza il menu' laterale per accedere ai contenuti"});

});

app.get('/ingegneria', function(req, res) {

  request('http://www.scuolapsb.unina.it/downloads/php/collegi_ingegneria.php', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);
    var cdl = $("body");

    res.render('template', {title: "Collegio Ingegneria", data: cdl});

  });

});

app.get('/scienze', function(req, res) {

  request('http://www.scuolapsb.unina.it/downloads/php/collegi_scienze.php', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);
    var cdl = $("body");

    res.render('template', {title: "Collegio Scienze", data: cdl});

  });

});

app.get('/architettura', function(req, res) {

  request('http://www.scuolapsb.unina.it/downloads/php/collegi_architettura.php', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);
    var cdl = $("body");

    res.render('template', {title: "Collegio Architettura", data: cdl});

  });

});

app.get('/news', function(req, res) {

  request('http://www.scuolapsb.unina.it', function(error, response, body) {

    console.log("error: " + error + " " + response.statusCode);
    if(error) throw error;

    var $ = cheerio.load(body);

    var news = $("#fc_items-99-9");

    $('a').each(function( index ) {
      $(this).attr('href', 'http://www.scuolapsb.unina.it'+$(this).attr('href'));
    });

    res.render('template', {title: "News dalla Scuola", data: "<div>"+news+"</div>"});
  });

});

app.listen(SERVER_PORT);
