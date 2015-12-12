
var winston = require('winston');

var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost/recooker');

var recipes = db.get('recipes');

router.use(function timeLog(req, res, next) {
    winston.info('Time: ', Date.now());
    req.db = db;
    next();
});

router.post('/', function (req, res) {
    recipes.insert({ name: 'Recipe', bigdata: false }, function (error, result) {
        winston.info(error, result);
        res.json(result);
    });
});

router.get('/', function (req, res) {
    recipes.find({}, {}, function (error, docs) {
        if (error) {
            winston.error(error);
            res.boom.notFound('recipes not found');
        }
        res.json(docs);
    });
});

router.get('/test1', function(req, res) {
    var test = {
        a: 2,
        b: 'title'
    };
    res.json(test);
});

router.get('/test2', function(req, res) {
    winston.debug('/test2');

    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        if (e) {
            winston.error(e);
        }
        res.json(docs);
    });
});

module.exports = router;
