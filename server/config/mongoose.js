/**
 * Created by hoang on 1/26/15.
 */

var mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'db connection error...'));
    db.once('open', function callback() {
        console.log('db connection opend.')
    });

    var dishSchema = require('../../models/DishModel').DishSchema;
    var foodSchema = require('../../models/FoodModel').FoodSchema;

    var Dish = mongoose.model('Dish', dishSchema);
    var Food = mongoose.model('Food', foodSchema);
}