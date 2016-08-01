//
var db = require('./base').database;
var dishSchema = require('../models/DishModel').DishSchema;
var colDish = db.model('dishes', dishSchema);

var foodSchema = require('../models/FoodModel').FoodSchema
var colFood = db.model('foods', foodSchema);

var _ = require('underscore')

// List all dish
exports.list = function(req, res) {
    var queryString = {};

    if (req.query.idList) {
        queryString = {
            'id': {
                $in: req.query.idList.split(',')
            }
        };
    }
    else if (req.query.keyword) {
        queryString = {
            'ten': {
                $regex: new RegExp(req.query.keyword, 'i')
            }
        };
    }

    colDish.find(queryString, {}, {
        sort: "ten"
    }, function(err, colDish) {
        if (err) res.send(err);
        res.json(colDish);
    });
};

//Create or Update an dish
exports.create = function(req, res) {
    return colDish.findById(req.body._id, function(err, dish) {
        if (dish === null) {
            dish = new colDish();
        }

        // update correspond food references.
        var oldFoods = dish.thuc_pham.split(',');
        var newFoods = req.body.thuc_pham.split(',');

        var removeFoods = _.filter(oldFoods, function (food) {
            return newFoods.indexOf(food) < 0;
        });

        var addFoods = _.filter(newFoods, function(food){
            return oldFoods.indexOf(food) < 0;
        });

        for(var foodId in addFoods) {
            // add dish to food
            (function (foodId) {

                colFood.findOne({'id': addFoods[foodId]}).exec(function callback(err, doc) {
                    if (err) {
                        console.error("cannot find food with id " + addFoods[id]);
                        res.json(false);
                        return;
                    }

                    var dishes = doc.mon_an;

                    if (dishes === undefined) {
                        dishes = '';
                    }

                    if (dishes.indexOf(dish.id) < 0) {
                        dishes = dishes + dish.id + ',';

                        colFood.update({'id': addFoods[foodId]}, {$set: {mon_an: dishes}}, function (err, food) {
                            if (err) {
                                console.error("food " + addFoods[foodId] + "update failed!");
                                handleError(err);
                            } else {
                                console.log("added " + dish.id + " to " + addFoods[foodId]);
                            }
                        });
                    }
                });
            }(foodId));
        }

        for(var foodId in removeFoods) {

            (function (foodId) {
                colFood.findOne({'id': removeFoods[foodId]}).exec(function callback(err, doc) {
                    if (err) {
                        console.error("cannot find food with id " + removeFoods[foodId]);
                        res.json(false);
                        return;
                    }

                    var dishes = doc.mon_an;

                    if (dishes !== undefined && dishes.indexOf(dish.id) >= 0) {
                        dishes = dishes.replace(dish.id + ",", "");

                        colFood.update({'id': removeFoods[foodId]}, {$set: {mon_an: dishes}}, function (err, food) {
                            if (err) {
                                console.error("food " + removeFoods[foodId] + "update failed!");
                                handleError(err);
                            } else {
                                console.log("remove " + dish.id + " from " + removeFoods[foodId]);
                            }
                        });
                    }
                });
            }(foodId));
        }

        dish.id = req.body.id;
        dish.ten = req.body.ten;
        dish.ten_khac = req.body.ten_khac;
        dish.loai = req.body.loai;
        dish.luu_y = req.body.luu_y;
        dish.luong_chat = req.body.luong_chat;
        dish.che_bien = req.body.che_bien;
        dish.hinh_anh = req.body.hinh_anh;
        dish.thuc_pham = req.body.thuc_pham;
        dish.nguyen_lieu = req.body.nguyen_lieu;
        dish.tham_khao = req.body.tham_khao;
        dish.nen_dung = req.body.nen_dung;
        dish.brief_info = req.body.brief_info;
        dish.comment = req.body.comment;
        dish.completed = req.body.completed;
        dish.approved = req.body.approved;

        dish.save(function(err) {
            if (!err) {
                console.log("updated");
                res.json(true);
            }
            else {
                console.log(err);
                res.json(false);
            }
        });
    });
};