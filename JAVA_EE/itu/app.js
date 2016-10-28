
var express     = require('express');
var port = 8081;

//서버 실행
var app  = express();

var bwModel = require('./bwModel');
var tlModel = require('./tlModel');

var router = require('./router')(app, bwmodel, tlModel); //router.js에 app과 model을 전달

var bodyParser  = require('body-parser');
var __dirname = 'WebContent';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', __dirname +'/jsp');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(__dirname));
app.use(function(req, res, next){
		req.test = 1;
		next();
});

var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

//몽고 DB 부분

var mongoose    = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

//mongoose.connect('mongodb://192.168.0.23/test');
mongoose.connect('mongodb://115.178.65.182:27017/trustbnb-dev');