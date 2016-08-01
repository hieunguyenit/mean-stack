// 

var db = require('./base').database;
var foodSchema = require('../models/FoodModel').FoodSchema;
var colFood = db.model('foods', foodSchema);

//
exports.listById = function(req, res) {
    console.log('List By Id');
}

// List all food
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

    colFood.find(queryString, {}, {
        sort: 'ten'
    },

    function(err, colFood) {
        if (err) res.send(err);
        res.json(colFood);
    });
};

//Create or Update an food
exports.create = function(req, res) {
    return colFood.findById(req.body._id, function(err, food) {
        if (food === null) {
            food = new colFood();
        }

        food.id = req.body.id;
        food.ten = req.body.ten;
        food.ten_khac = req.body.ten_khac;
        food.loai_gia = req.body.loai_gia;
        food.luu_y = req.body.luu_y;
        food.luong_chat = req.body.luong_chat;
        food.nen_dung = req.body.nen_dung;
        food.hinh_anh = req.body.hinh_anh;
        food.chat = req.body.chat;
        food.mon_an = req.body.mon_an;
        food.tham_khao = req.body.tham_khao;
        food.brief_info = req.body.brief_info;
        food.comment = req.body.comment;
        food.completed = req.body.completed;
        food.approved = req.body.approved;

        food.save(function(err) {
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