
var express = require('express');
var app = express();
var routes = require('./routes');
var winston = require('winston');
var favicon = require('serve-favicon');
var boom = require('express-boom');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    colorize: true,
    level: 'debug',
    prettyPrint: true,
    humanReadableUnhandledException: true
});

app.use(boom());
app.use(morgan('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// routes
app.use(express.static('www'));

app.use('/recipes', routes.recipes);
app.use('/categories', routes.categories);


// in case of error
app.use(function(req, res, next) {
    res.boom.notFound('Not Found');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

var server = app.listen(8080, function() {

    var host = server.address().address
    var port = server.address().port

    winston.info('Example app listening at http://%s:%s', host, port)

})
