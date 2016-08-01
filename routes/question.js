// Initial
var db = require('./base').database;
var questionSchema = require('../models/QuestionModel').QuestionSchema;
var colQuestion = db.model('questions', questionSchema);

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
            'cau_hoi': {
                $regex: new RegExp(req.query.keyword, 'i')
            }
        };
    }

    colQuestion.find(queryString, {}, {
        sort: "id"
    }, function(err, colQuestion) {
        if (err) res.send(err);
        res.json(colQuestion);
    });

};

// Create or Update an element
exports.create = function(req, res) {
    return colQuestion.findById(req.body._id, function(err, question) {
        if (question === null) {
            question = new colQuestion();
        }

        question.id = req.body.id;
        question.tuan_thai = req.body.tuan_thai;
        question.muc = req.body.muc;
        question.cau_hoi = req.body.cau_hoi;
        question.tra_loi = req.body.tra_loi;
        question.comment = req.body.comment;
        question.completed = req.body.completed;
        question.approved = req.body.approved;

        question.save(function(err) {
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