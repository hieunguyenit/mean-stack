// Initial
var db = require('./base').database;
var elementSchema = require('../models/ElementModel').ElementSchema;
var colElement = db.model('elements', elementSchema);

// List all elements
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

    colElement.find(queryString, {}, {
        sort: "ten"
    }, function(err, colElement) {
        if (err) res.send(err);
        res.json(colElement);
    });

};

// Create or Update an element
exports.create = function(req, res) {
    return colElement.findById(req.body._id, function(err, element) {
        if (element === null) {
            element = new colElement();
        }

        element.id = req.body.id;
        element.ten = req.body.ten;
        element.ten_khac = req.body.ten_khac;
        element.co_so = req.body.co_so;
        element.luu_y = req.body.luu_y;
        element.nen_dung = req.body.nen_dung;
        element.duong_chat = req.body.duong_chat;
        element.tham_khao = req.body.tham_khao;
        element.thuc_pham = req.body.thuc_pham;
        element.mon_an = req.body.mon_an;
        element.hinh_anh = req.body.hinh_anh;
        element.brief_info = req.body.brief_info;
        element.comment = req.body.comment;
        element.completed = req.body.completed;
        element.approved = req.body.approved;

        element.save(function(err) {
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