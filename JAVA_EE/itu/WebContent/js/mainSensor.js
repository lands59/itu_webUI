
//	램덤 숫자 범위 지정
//	function randomVal(min, max){
//		var randVal = Math.random() * (max-min) + min;
//		return Math.floor(randVal);
//	}	


// 변수명 앞에 db가 붙은 변수의 값이 DB로 붙어 받아올 센서 값 입니다.


//---------------------------TEMP--------------------------------
	var temp = document.getElementById('temp');
	var tempImage = document.getElementById('tempImage');
	var dbTemp = 0;
	
	function tempSensor(){
		
		$.ajax({
	        url: '/temp',
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	        	if(data == 'err'){
		        	console.log('fail --> TEMP : server send err message');
		        	temp.textContent = 'ERROR';
		        }else{
		        	console.log('success --> TEMP :', data.status);
					  dbTemp = data.status;
					  
	//						일정 온도가 넘으면 빨간 이미지 출력
						if(dbTemp > 60){
							tempImage.src = "../img/c_temp.png";
						} else if(dbTemp < 0){
							tempImage.src = "../img/c_temp_below.png";
						} else {
							tempImage.src = "../img/temp.png";
						}
						temp.textContent = dbTemp + ' C';
		        }	          
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(tempSensor,500);
	setInterval(tempSensor,3000);
//--------------------------/TEMP--------------------------------
	
	
	

	
	
	
//---------------------------LED--------------------------------
	var led1 = document.getElementById('led1');
	var led1Image = document.getElementById('led1Image');
	var dbLed1 = 0;
	var statusLed1 = '';
	var tempCnt = 0;
	
	function led1Sensor(){
		console.log('Count : ' + tempCnt++);
		$.ajax({
	        url: "/led1",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	        	if(data == 'err'){
		        	console.log('fail --> LED : server send err message');
		        	led1.textContent = 'ERROR';
		        }else{
		          console.log('success --> LED :', data.status);
				  dbLed1 = data.status;
				  
	//				불이 켜지면 초록 이미지 출력 하고 상태 메세지 ON으로 
					if (dbLed1 == 1){
						led1Image.src = "../img/c_led_m.png"
						statusLed1 = 'ON';
					} else{
						led1Image.src = "../img/led_m.png";
						statusLed1 = 'OFF';
					}
					led1.textContent = statusLed1;
		        }
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
		
		
	}
	setTimeout(led1Sensor,500);
	setInterval(led1Sensor,3000);
//--------------------------/LED--------------------------------
	
	
	
	
	
	
	
	
	
//---------------------------SMOKE--------------------------------
	var smoke = document.getElementById('smoke');
	var smokeImage = document.getElementById('smokeImage');
	var dbSmoke = 0;
	var checkSmoke = 0;  //condition에 쓰일 변수
	var statusSmoke = '';
	
	function smokeSensor(){
		
		$.ajax({
	        url: "smoke",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	        	if(data == 'err'){
		        	console.log('fail --> SMOKE : server send err message');
		        	smoke.textContent = 'ERROR';
		        }else{
		          console.log('success --> SMOKE :', data.status);
				  dbSmoke = data.status;
				  
	//				연기 감지 되면 빨간 이미지 및 감지 메세지 출력
					if (dbSmoke == 1){
						smokeImage.src = "../img/smoke_red.png"
						statusSmoke = 'DETECTED!!';
						checkSmoke = checkSmoke + 1;
					} else{
						smokeImage.src = "../img/smoke_black.png"
						statusSmoke = 'NONE';
					}
					smoke.textContent = statusSmoke;
		        }
	        },
			error:function(){
				console.log('fail');
			}
		});
		
	}
	setTimeout(smokeSensor,500);
	setInterval(smokeSensor,3000);
//--------------------------/SMOKE--------------------------------
	

	
	
	
	
	
//---------------------------NOISE--------------------------------
	var noise = document.getElementById('noise');
	var noiseImage = document.getElementById('noiseImage');
	var dbNoise = 0;
	var checkNoise = 0; //condition에 쓰일 변수
	var statusNoise = '';
		
	function noiseSensor(){
		
		$.ajax({
	        url: "/noise",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	        	if(data == 'err'){
		        	console.log('fail --> NOISE : server send err message');
		        	noise.textContent = 'ERROR';
		        }else{
		          console.log('success --> NOISE :', data.status);
				  dbNoise = data.status;
				  
	//				소음은 총 세단계로 나눠서 각 상황에 맞게 출력
	//				dbNoise == 1일때 노랑 2일때 빨강
					if (dbNoise >= 40 && dbNoise < 70){
						noiseImage.src = "../img/c_noise_y.png";
						statusNoise = "It's okay...";
					} else if(dbNoise >= 70){
						noiseImage.src = "../img/c_noise.png";
						statusNoise = 'NOISY!!';
						checkNoise = checkNoise + 1;
					} else{
						noiseImage.src = "../img/noise.png";
						statusNoise = 'Silent';
					}
					noise.textContent = statusNoise;
		        }
	        },
			error:function(){
				console.log('fail');
			}
		});
		

		
		
	}
	setTimeout(noiseSensor,500);
	setInterval(noiseSensor,3000);
//--------------------------/NOISE--------------------------------
	
	
	
	
	
	
	
	
//---------------------------WINDOW--------------------------------
	var windoww = document.getElementById('window');
	var windowImage = document.getElementById('windowImage');
	var dbWindow = 0;
	var statusWindow = '';
		
	function windowSensor(){
		
		$.ajax({
	        url: "/window",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
		        if(data == 'err'){
		        	console.log('fail --> WINDOW : server send err message');
		        	windoww.textContent = 'Closed';
		        }else{		        	
		          console.log('success --> WINDOW :', data.status);
				  dbWindow = data.status;
				  
	//				문 열림 감지 되면 초록 이미지 및 메세지 출력
					if (dbWindow == 1){
						windowImage.src = "../img/window_open.png";
						statusWindow = 'Opened';
					} else{
						windowImage.src = "../img/window_close.png";
						statusWindow = 'Closed';
					}
					windoww.textContent = statusWindow;
		        }
	        },
			error:function(){
				console.log('fail');
			}
		});
		
	}
	setTimeout(windowSensor,500);
	setInterval(windowSensor,3000);
//--------------------------/WINDOW--------------------------------
	
	
	
	
	

//---------------------------CONDITION--------------------------------
	var conditionImage = document.getElementById('condition');
	
	var cntCondition = 0;
	
	function conditionSensor(){
		
		
//		소음, 연기 센서가 작동 할때 마다 계약 위반을 했기때문에 카운트
//		혹시 연기나 소음이 두번이상 감지되었을때 BAD를 표시하는 로직을 위해서 check 변수들은 한번 감지될때마다 1 증가 합니다.
		if(checkSmoke >= 1 && checkNoise >= 1 || cntCondition >= 2){ 
			cntCondition = 2;
		} else if (checkSmoke >= 1 || checkSmoke >= 1 ){
			cntCondition = 1;
		}
		
		
		
//		계약 위반에 따른 컨디션 이미지 출력
		if(cntCondition >= 2){
			conditionImage.src = "../img/bad.png";
		} else if(cntCondition == 1){
			conditionImage.src = "../img/normal.png";
		} else{
			conditionImage.src = "../img/good.png";
		}
		
//		계약 위반 할때마다 콘솔에 표시
		console.log(cntCondition);
		
		
	}
	console.log(cntCondition);
	setInterval(conditionSensor,3000);
//--------------------------/CONDITION--------------------------------

	
	
	
	
	
//-----------------------------SUBMIT---------------------------------
	var checkUser = 0;
	var checkPlz = document.getElementById('checkPlz');
	var user = '';
	
	function submit(obj,stype){
		var i, sum = 0;
		var robj = document.getElementsByName(obj);
		var sendCntCondition = cntCondition;
		
		for(i=0; i<robj.length; i++){
				
			if(robj[0].checked == true){
				user = 'user2';
				location.href = "sub.jsp?cc=" + sendCntCondition + "&user=" + user;
			} else if(robj[1].checked == true){
				user = 'user3';
				location.href = "sub.jsp?cc=" + sendCntCondition + "&user=" + user;
			} else if(robj[2].checked == true){
				user = 'user4';
				location.href = "sub.jsp?cc=" + sendCntCondition + "&user=" + user;
			} else {
				checkPlz.textContent = 'Choose an user, who you want to see. ';
			}
		}
		
			
		
	}
//-----------------------------/SUBMIT--------------------------------
	
	
	
