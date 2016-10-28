/*
* 투인:
*	collection(table)은 home, homeDetail, reservation, user, review, homeImage, host, device, homeDevice 입니다.
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//3번째 argument에도 꼭 콜렉션명 넣어줄것 !!!!!
module.exports= mongoose.model('device', null, 'device');