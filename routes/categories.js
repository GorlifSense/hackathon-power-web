
var winston = require('winston');

var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost/recooker');

var categories = db.get('categories');

router.use(function timeLog(req, res, next) {
    winston.info('Time: ', Date.now());
    req.db = db;
    next();
});

router.post('/', function (req, res) {
    winston.debug(req.body);
    var model = req.body;
    if (!model) {
        return res.boom.notFound('Body is empty');
    }
    categories.insert(model, function (error, result) {
        if (error) {
            winston.error(error);
            return res.boom.notFound('notFound');
        }
        winston.info(result);
        res.json(result);
    });
});

router.get('/', function (req, res) {
    categories.find({}, {}, function (error, docs) {
        if (error) {
            winston.error(error);
            res.boom.notFound('categories not found');
        }
        res.json(docs);
    });
});

module.exports = router;
