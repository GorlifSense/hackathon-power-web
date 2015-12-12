/*
 * GET home page.
 */

var winston = require('winston');

exports.users = function(req, res) {
    var test = {
        a: 2,
        b: 'title'
    };
    res.json(test);
};

exports.userlist = function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        if (e) {
            winston.error(e);
        }
        res.json(docs);
    });
}
