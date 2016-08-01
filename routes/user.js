var db = require('./base').database;
var userSchema = require('../models/UserModel').UserSchema;
var colUser = db.model('users', userSchema);
/*
 * GET users listing.
 */
function getRandom(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
}

exports.list = function(req, res){
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

    colUser.find(queryString, {}, {
        sort: 'ten'
    },

    function(err, colUser) {
        if (err) res.send(err);
        res.json(colUser);
    });
};


//Create or Update an food
exports.create = function(req, res) {
    return colUser.findById(req.body._id, function(err, user) {
        if (!user) {
            user = new colUser();
            var current = new Date();
            user.ngay_tao = current;
            user.id =  getRandom(2) + "" + getRandom(4);
        }
        else {
            user.no_result    = req.body.no_result;
            user.search_count = JSON.stringify(req.body.search_count);
            user.fbUserId	  = req.body.fbUserId;
            user.fbUserEmail  = req.body.fbUserEmail;
        }

        user.save(function(err) {
            if (!err) {
                console.log("updated");
                res.json(user);
            }
            else {
                console.log(err);
                res.json(false);
            }
        });
    });
};
