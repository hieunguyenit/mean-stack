// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model =================
exports.FoodSchema = new mongoose.Schema({
	id : String,
	ten : String,
	ten_khac : String,
	loai_gia : String,
	chat : String,
	mon_an : String,
	luong_chat : String,
	nen_dung : String,
	hinh_anh : String,
	luu_y : String,
	tham_khao : String,
	brief_info : String,
	comment : String,
	completed : Boolean,
	approved : Boolean
});

