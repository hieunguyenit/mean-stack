// Initial
var db = require('./base').database;
var fetusSchema = require('../models/FetusModel').FetusSchema;
var colFetus = db.model('fetus', fetusSchema);

// List all fetuss
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

    colFetus.find(queryString, {}, {
        sort: "ten"
    }, function(err, colFetus) {
        if (err) res.send(err);
        res.json(colFetus);
    });
};

// Create or Update an fetus
exports.create = function(req, res) {
    return colFetus.findById(req.body._id, function(err, fetus) {
        if (fetus === null) {
            fetus = new colFetus();
        }

        fetus.id = req.body.id;
        fetus.ten = req.body.ten;
        fetus.mo_ta = req.body.mo_ta;
        fetus.chat = req.body.chat;
        fetus.thuc_pham = req.body.thuc_pham;
        fetus.luu_y = req.body.luu_y;
        fetus.hinh_anh = req.body.hinh_anh;
        fetus.tham_khao = req.body.tham_khao;
        fetus.tuan_thai = req.body.tuan_thai;
        fetus.comment = req.body.comment;
        fetus.completed = req.body.completed;
        fetus.approved = req.body.approved;

        fetus.save(function(err) {
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