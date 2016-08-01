var async = require('async');

var db = require('./base').database;

var elementSchema = require('../models/ElementModel').ElementSchema;
var colElement = db.model('elements', elementSchema);

var foodSchema = require('../models/FoodModel').FoodSchema;
var colFood = db.model('foods', foodSchema);

var dishSchema = require('../models/DishModel').DishSchema;
var colDish = db.model('dishes', dishSchema);

var periodSchema = require('../models/PeriodModel').PeriodSchema;
var colPeriod = db.model('periods', periodSchema);

var fetusSchema = require('../models/FetusModel').FetusSchema;
var colFetus = db.model('fetus', fetusSchema);


exports.list = function(req, res) {
    if (!req.query.keyword) return;
    
    list(req.query.keyword, function (err, result) {
        if (err) return res.send(err);
        
        res.json(result);
    })
    
}

function list (keyword, callback) {
    async.waterfall([
            function (next) {
                findDocumentByKeyword(colFood, 'ten', keyword, 
                    function (err, docs) {
                        if (err) return next('DB Error!');
                        
                        var result = [];
                        
                        var item = {};
                        item.name = colFood.modelName;
                        item.list = docs;
                        
                        result.push(item);
                        
                        return next(null, result);
                    }
                );
            },
            function (result, next) {
                findDocumentByKeyword(colDish, 'ten', keyword, 
                    function (err, docs) {
                        if (err) return next('DB Error!');
                        
                        var item = {};
                        item.name = colDish.modelName;
                        item.list = docs;
                        
                        result.push(item);
                    
                        
                        return next(null, result);
                    }
                );
                
            },
            function (result, next) {
                findDocumentByKeyword(colElement, 'ten', '^'+keyword+'$', 
                    function (err, docs) {
                        if (err) return next('DB Error!');
                       
                        var item = {};
                        item.name = colElement.modelName;
                        item.list = docs;
                        
                        result.push(item);
                        
                        return next(null, result);
                    }
                );
            },
            function (result, next) {
                findDocumentByKeyword(colPeriod, 'ten', '^'+keyword+'$', 
                    function (err, docs) {
                        if (err) return next('DB Error!');
                       
                        var item = {};
                        item.name = colPeriod.modelName;
                        item.list = docs;
                        
                        result.push(item);
                        
                        return next(null, result);
                    }
                );
            },
            function (result, next) {
                findDocumentByKeyword(colFetus, 'ten', '^'+keyword, 
                    function (err, docs) {
                        if (err) return next('DB Error!');
                       
                        var item = {};
                        item.name = colFetus.modelName;
                        item.list = docs;
                        
                        result.push(item);
                        
                        return next(null, result);
                    }
                );
            }
        ], 
        function (err, result){
            if (err) return callback(err);
            return callback(null, result);
        }
    );
}

function findDocumentByKeyword (collection, item, keyword, callback) {
    var queryString = {};
    queryString[item] = {$regex: new RegExp(keyword, 'i')};
    
    collection.find(queryString,
        function(err, docs) {
            if (err) return callback(err);
            return callback(null, docs);
        });
}

