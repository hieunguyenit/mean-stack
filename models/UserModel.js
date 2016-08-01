// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model =================
exports.UserSchema = new mongoose.Schema({
	id : String,
	ten : String,
	ngay_du_sinh : String,
	no_result : String,
	search_count : String,
	ngay_tao : Date,
	fbUserId : String,
	fbUserEmail : String
});

