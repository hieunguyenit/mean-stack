// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model =================
exports.DishSchema = new mongoose.Schema({
	id : String,
	ten : String,
	ten_khac : String,
	loai : String,
	thuc_pham : String,
	luong_chat : String,
	nguyen_lieu : String,
	che_bien : String,
	luu_y : String,
	hinh_anh : String,
	tham_khao : String,
	nen_dung : String,
	brief_info : String,
	comment : String,
	completed : Boolean,
	approved : Boolean
});

