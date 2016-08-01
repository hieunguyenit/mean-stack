// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model =================
exports.FetusSchema = new mongoose.Schema({
	id : String,
	ten : String,
	mo_ta : String,
	chat : String,
	thuc_pham : String,
	tuan_thai : String,
	luu_y : String,
	hinh_anh : String,
	tham_khao : String,
	comment : String,
	completed : Boolean,
	approved : Boolean
});

