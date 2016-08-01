// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model =================
exports.ElementSchema = new mongoose.Schema({
	id : String,
	ten : String,
	ten_khac : String,
	co_so : String,
	luu_y : String,
	nen_dung : String,
	duong_chat : String,
	tham_khao : String,
	thuc_pham : String,
	mon_an : String,
	hinh_anh : String,
	brief_info : String,
	comment : String,
	completed : Boolean,
	approved : Boolean
});

