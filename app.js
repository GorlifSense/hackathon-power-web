
var express = require('express');
var app = express();
var routes = require('./routes');
var winston = require('winston');
var favicon = require('serve-favicon');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost/recooker');


// routes
app.use(express.static('www'));
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.get('/users', routes.users);
app.get('/userlist', routes.userlist);

// in case of error
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(8080, function() {

    var host = server.address().address
    var port = server.address().port

    winston.info('Example app listening at http://%s:%s', host, port)

})
