// 

var db = require('./base').database;
var periodSchema = require('../models/PeriodModel').PeriodSchema;
var colPeriod = db.model('periods', periodSchema);

// List all period
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

    colPeriod.find(queryString, {}, {
        sort: "id"
    }, function(err, colPeriod) {
        if (err) res.send(err);
        res.json(colPeriod);
    });
};

//Create or Update an period
exports.create = function(req, res) {
    return colPeriod.findById(req.body._id, function(err, period) {
        if (period === null) {
            period = new colPeriod();
        }

        period.id = req.body.id;
        period.tam_ca_nguyet = req.body.tam_ca_nguyet;
        period.ten = req.body.ten;
        period.thai_nhi = req.body.thai_nhi;
        period.ba_bau = req.body.ba_bau;
        period.chat = req.body.chat;
        period.thuc_pham = req.body.thuc_pham;
        period.mon_an = req.body.mon_an;
        period.luu_y = req.body.luu_y;
        period.hinh_anh = req.body.hinh_anh;
        period.tham_khao = req.body.tham_khao;
        period.comment = req.body.comment;
        period.completed = req.body.completed;
        period.approved = req.body.approved;

        period.save(function(err) {
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