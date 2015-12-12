
var express = require('express');
var app = express();
var routes = require('./routes');
var winston = require('winston');

// app.get('/', function(req, res) {
//     res.send('Hello World!')
// })

app.get('/', routes.index);
app.use(express.static('www'));

var server = app.listen(8080, function() {

    var host = server.address().address
    var port = server.address().port

    winston.info('Example app listening at http://%s:%s', host, port)

})
