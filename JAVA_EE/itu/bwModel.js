/*
* 투인:
*	collection(table)은 home, homeDetail, reservation, user, review, homeImage, host, device, homeDevice 입니다.
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 테스트
var testSchema = new  Schema({
	 _id: String,
	  gw_mac : String,
	  devname : String,
	  status : Number,
	  __v : String
});

//실제 스키마
var dataSchema = new  Schema({
	 _id: String,
	 deviceId : String,
	 deviceName : String,
	 comment : String,
	 status : Number,
	 rssi : Number,
	 battery: Number,
	 vendor : Number,
	 trustLevel : Number
});

//3번째 argument에도 꼭 콜렉션명 넣어줄것 !!!!!
module.exports= mongoose.model('bwdevice', dataSchema, 'bwdevice');