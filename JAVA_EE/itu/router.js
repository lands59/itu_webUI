
/**
  *
  * 라우팅
  *
  **/  
  
var select = {
	
};
var options = {
	sort : {
		_id : -1
	}	
};
 var tempCnt = 0;
 
module.exports = function(app, bwModel, tlModel)
{	
	app.get('/',function(req,res){
		res.render('main.ejs',{});
	
	});
	
	app.get('/sub',function(req,res){			
		//Model.find(conditions, [projection or field], [options], [callback])
		res.render('sub.ejs',{});
	});
	
	app.get('/getData',function(req,res){	
		bwModel.findOne({deviceName: 'smoke'},null, options, function(err, data){
			if(data != null){
				res.send(data);
			}else{
				res.send('err');
			}
		});
	});
	
	app.get('/smoke',function(req,res){	
			bwModel.findOne({deviceName: 'smoke'},null, options, function(err, data){
				if(data != null){
					res.send(data);
				}else{
					res.send('err');
				}
			});
	});
	
	app.get('/temp',function(req,res){
		console.log('temp Count : ' + tempCnt++);
		bwModel.findOne({deviceName: 'temp'}, 'status', options, function(err, data){			
				if(data != null){
					res.send(data);
				}else{
					res.send('err');
				}
		});
	});
	
	app.get('/humid',function(req,res){	
		bwModel.findOne({deviceName: 'humid'}, 'status', options, function(err, data){
				if(data != null){
					res.send(data);
				}else{
					res.send('err');
				}
		});
	});
	
	app.get('/bright',function(req,res){
		bwModel.findOne({deviceName: 'bright'}, 'status', options, function(err, data){
				if(data != null){
					res.send(data);
				}else{
					res.send('err');
				}
		});
	});
	
	app.get('/led1',function(req,res){	
		tlModel.findOne({deviceName: 'led1'}, 'status', options, function(err, data){
				if(data != null){
					res.send(data);
				}else{
					res.send('err');
				}
		});
	});
	
	app.get('/led2',function(req,res){	
		tlModel.findOne({deviceName: 'led2'}, 'status', options, function(err, data){
				if(data != null){
					res.send(data);
				}else{
					res.send('err');
				}
		});
	});
	
	app.get('/noise',function(req,res){	
		bwModel.findOne({deviceName : 'noise'}, 'status', options, function(err, data){
			if(data != null){
				res.send(data);
			}else{
				res.send('err');
			}
		});
	});
	
	app.get('/window',function(req,res){
		tlModel.findOne({deviceName: 'doormonitor1'}, 'status', options, function(err, data){
			if(data != null){
				res.send(data);
			}else{
				res.send('err');
			}
		});
	});
	
	app.get('/plug1',function(req,res){	
		tlModel.findOne({deviceName: 'plug1'}, 'status', options, function(err, data){
			if(data != null){
				res.send(data);
			}else{
				res.send('err');
			}
		});
	});
	
	app.get('/plug2',function(req,res){	
		tlModel.findOne({deviceName: 'plug2'}, 'status', options, function(err, data){
			if(data != null){
				res.send(data);
			}else{
				res.send('err');
			}
		});
	});
	
}