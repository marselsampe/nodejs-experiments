var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET,PUT,POST,DELETE');

    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Accept-Token,X-Key');
    next();
});

app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

// if no route match, throw 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// start server
app.set('port', 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Server start, listen on port ' + server.address().port);
});