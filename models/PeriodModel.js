// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model =================
exports.PeriodSchema = new mongoose.Schema({
	id : String,
	tam_ca_nguyet : String,
	ten : String,
	thai_nhi : String,
	ba_bau : String,
    chat: String,
    thuc_pham: String,
	mon_an: String,
	luu_y : String,
	hinh_anh : String,
	tham_khao : String,
	comment : String,
	completed : Boolean,
	approved : Boolean
});

