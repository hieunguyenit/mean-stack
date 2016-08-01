// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model =================
exports.QuestionSchema = new mongoose.Schema({
	id : String,
	loai : String,
	tuan_thai : String,
	muc : String,
	cau_hoi : String,
	tra_loi : String,
	comment : String,
	completed : Boolean,
	approved : Boolean
});

