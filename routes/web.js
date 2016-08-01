/**
 * New node file
 */

var async = require('async');

exports.index = function(req, res){
  res.sendfile('./public/tabs.html');
};

exports.element = function(req, res) {
	res.sendfile('./public/element-list.html');
};

exports.food = function(req, res) {
	res.sendfile('./public/food-list.html');
};

exports.dish = function(req, res) {
	res.sendfile('./public/dish-list.html');
};

exports.period = function(req, res) {
	res.sendfile('./public/period-list.html');
};

exports.fetus = function(req, res) {
	res.sendfile('./public/fetus-list.html');
};

exports.search = function(req, res) {
    res.sendfile('./public/search-list.html');
}

exports.question = function(req, res) {
    res.sendfile('./public/question-list.html');
}

exports.qna = function(req, res) {
    res.sendfile('./public/question-qna.html');
}

exports.scan = function(req, res) {
	res.render('scan')
}

exports.doScan = function(req, res) {
	var db = require('./base').database;
	var dishSchema = require('../models/DishModel').DishSchema;
	var Dish = db.model('dishes', dishSchema);

	var foodSchema = require('../models/FoodModel').FoodSchema
	var Food = db.model('foods', foodSchema);

	Dish.count({}, function(err, count){
		var page = 0;
		var size = 100;

		var mapping = [];

		async.whilst(function() {
			return page * size < count;
		}, function(callback) {
			console.log("Scanning from " + (page * size) + " to " + ((page + 1) * size));

			page = page + 1;

			Dish.find({}).skip(page * size).limit(size).sort('id').exec(function(err, dishes) {

				for (var i in dishes) {

					var dish = dishes[i];

					if(dish.thuc_pham !== undefined) {
						var foods = dish.thuc_pham.split(',');

						for (var j in foods) {
							var food = foods[j];

							if (foods[j]) {
								(function (dish, food) {
									console.log("handle " + dish.id + "/" + food);

									Food.findOne({'id': food}).exec(function callback(err, doc) {
										if (err) {
											console.error("cannot find food with id " + food);
											res.json(false);
											return;
										}

										if(doc) {
											var dishes = doc.mon_an;

											if (dishes === undefined) {
												dishes = '';
											}

											if (dishes.indexOf(dish.id) < 0) {
												if (mapping[doc.id] === undefined) {
													mapping[doc.id] = [dish.id];
												} else {
													mapping[doc.id].push(dish.id);
												}
											}
										} else {
											console.error("cannot find food " + food);
										}
									});

									console.log("mapping " + Object.keys(mapping).length);
								}(dish, food));
							}
						}
					}
				}

				callback();
			});
		}, function(err) {
			if(err) {
				console.error(err);
			}

			console.log("final mapping " + Object.keys(mapping).length);

			for (var property in mapping) {
				console.log(property + " = " + mapping[property].sort());

				(function(food, add_dishes) {
					Food.findOne({'id': food}).exec(function callback(err, doc) {
						if (err) {
							console.error("cannot find food with id " + food);
							res.json(false);
							return;
						}

						var dishes = doc.mon_an;

						if (dishes === undefined) {
							dishes = '';
						}

						for (var i in add_dishes) {
							dishes = dishes + add_dishes[i] + ',';
						}

						Food.update({'id': food}, {$set: {mon_an: dishes}}, function (err, foodUpdated) {
							if (err) {
								console.error("food " + food + "update failed!");
								handleError(err);
							} else {
								console.log("added " + add_dishes + " to " + food);
							}
						});
					});
				}(property,  mapping[property]));
			}
		});

		res.send('{"dishes" : ' + count + '}');
	});
};