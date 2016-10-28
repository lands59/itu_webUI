
//	램덤 숫자 범위 지정
//	function randomVal(min, max){
//		var randVal = Math.random() * (max-min) + min;
//		return Math.floor(randVal);
//	}


	
//------------------------Get 방식으로 parameter값 받아오기--------------------------
	function getParameter(paramName){

		var _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제
		var _tempArray = _tempUrl.split('&'); // '&'을 기준으로 분리하기
		
		for(var i = 0; _tempArray.length; i++) {
			var _keyValuePair = _tempArray[i].split('='); // '=' 을 기준으로 분리하기
			
			if(_keyValuePair[0] == paramName){ // _keyValuePair[0] : 파라미터 명
				// _keyValuePair[1] : 파라미터 값
				return _keyValuePair[1];
			}
		}
	}
//------------------------/Get 방식으로 parameter값 받아오기--------------------------

	
	
	
	
	
	
	
//------------------------------소음, 흡연 오작동 버튼--------------------------------
//function noiseCB(chkBox){
//	if(chkBox.checked == true){
//		dbNoise = 90;
//		
//	} else{
//		dbNoise = 10;
//	}
//}
//
//function smokeCB(chkBox){
//	if(chkBox.checked == true){
//		dbSmoke = 1;
//		
//	} else{
//		dbSmoke = 0;
//	}
//}
//------------------------------/소음, 흡연 오작동 버튼--------------------------------
	
	




// 변수명 앞에 db가 붙은 변수의 값이 DB로 붙어 받아올 센서 값 입니다.


//---------------------------TEMP--------------------------------
	var temp = document.getElementById('temp');
	var tempIamge = document.getElementById('tempImage');
	var dbTemp = 0;
	
	
	function tempSensor(){
		$.ajax({
	        url: "/temp",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	          console.log('success --> TEMP :', data.status);
			  dbTemp = data.status;
			  
//				일정 온도가 넘으면 빨간 이미지 출력
				if(dbTemp > 60){
					tempImage.src = "../img/c_temp.png";
				} else if(dbTemp < 0){
					tempImage.src = "../img/c_temp_below.png";
				} else {
					tempImage.src = "../img/temp.png";
				}
				temp.textContent = dbTemp + ' C';
	        },
			error:function(){
				console.log('fail');
			}
		});
		
	}
	setTimeout(tempSensor,500);
	setInterval(tempSensor,3000);
//--------------------------/TEMP--------------------------------
	
	
	
	
	
//---------------------------HUMID--------------------------------
	var humid = document.getElementById('humid');
	var humidImage = document.getElementById('humidImage');
	var dbHumid = 0;
	
	function humidSensor(){
		
		$.ajax({
	        url: "/humid",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	          console.log('success --> HUMID :', data.status);
			  dbHumid = data.status;
			  
//				습하면 파랑색, 건조하면 빨강색, 정상이면 검정색
				if(dbHumid >= 70){
					humidImage.src = "../img/humid_blue.png";
				} else if(dbHumid <= 20){
					humidImage.src = "../img/c_humid.png";
				} else {
					humidImage.src = "../img/humid.png";
				}
				humid.textContent = dbHumid + ' %';
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(humidSensor,500);
	setInterval(humidSensor,3000);
//--------------------------/HUMID--------------------------------
	
	

	
	
//-------------------------BRIGTHNESS------------------------------
	var bright = document.getElementById('bright');
	var brightImage = document.getElementById('brightImage');
	var dbBright = 0;
		
	function brightSensor(){
		
		$.ajax({
	        url: "/bright",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	          console.log('success --> BRIGHT :', data.status);
			  dbBright = data.status;
			  
//				밝기에 따라 총 3단계로 나눠서 이미지 출력
				if(dbBright >= 70){
					brightImage.src = "../img/light3.png";
					
				} else if(dbBright < 70 && dbBright >= 40){
					brightImage.src = "../img/light2.png";
					 
				} else{
					brightImage.src = "../img/light1.png";
					 
				}
				bright.textContent = dbBright + ' %';
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(brightSensor,500);
	setInterval(brightSensor,3000);
//------------------------/BRIGHTNESS------------------------------
	
	
	
	
	
	
//---------------------------LED1--------------------------------
	var led1 = document.getElementById('led1');
	var led1Image = document.getElementById('led1Image');
	var dbLed1 = 0;
	var statusLed1 = '';
	
	function led1Sensor(){
		
		$.ajax({
	        url: "/led1",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	          console.log('success --> LED 1 :', data.status);
			  dbLed1 = data.status;
			  
//				불이 켜지면 초록 이미지 출력 하고 상태 메세지 ON으로 
				if (dbLed1 == 1){
					led1Image.src = "../img/c_led1.png"
					statusLed1 = 'ON';
				} else{
					led1Image.src = "../img/led1.png";
					statusLed1 = 'OFF';
				}
				led1.textContent = statusLed1;
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(led1Sensor,500);
	setInterval(led1Sensor,3000);
//--------------------------/LED1--------------------------------
	
	
	
	
	
	
//---------------------------LED2--------------------------------
	var led2 = document.getElementById('led2');
	var led2Image = document.getElementById('led2Image');
	var dbLed2 = 0;
	var statusLed2 = '';
		
	function led2Sensor(){
		
		$.ajax({
	        url: "/led2",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	          console.log('success --> LED 2 :', data.status);
			  dbLed2 = data.status;
			  
//				불이 켜지면 초록 이미지 출력 하고 상태 메세지 ON으로 
				if (dbLed2 == 1){
					led2Image.src = "../img/c_led2.png"
					statusLed2 = 'ON';
				} else{
					led2Image.src = "../img/led2.png";
					statusLed2 = 'OFF';
				}
				led2.textContent = statusLed2;
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(led2Sensor,500);
	setInterval(led2Sensor,3000);
//--------------------------/LED2--------------------------------
	
	
	
	
	

//---------------------------SMOKE--------------------------------
	var smoke = document.getElementById('smoke');
	var smokeImage = document.getElementById('smokeImage');
	var dbSmoke = 0;
	var checkSmoke = 0;
	var statusSmoke = '';
		
	function smokeSensor(){
		
		$.ajax({
	        url: "/smoke",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
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
				
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(windowSensor,500);
	setInterval(windowSensor,3000);
//--------------------------/WINDOW--------------------------------
	
	
	
	
	
	
	
	
	
//---------------------------PLUG 1--------------------------------
	var plug1 = document.getElementById('plug1');
	var plug1Image = document.getElementById('plug1Image');
	var dbPlug1 = 0;
	var statusPlug1 = "";
	
	function plug1Sensor(){
		
		$.ajax({
	        url: "/plug1",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	          console.log('success --> PLUG 1 :', data.status);
			  dbPlug1 = data.status;
			  
//				플러그 감지 되면 초록 이미지 및 메세지 출력
				if (dbPlug1 == 1){
					plug1Image.src = "../img/c_plug1.png";
					statusPlug1 = 'ON';
				} else{
					plug1Image.src = "../img/plug1.png";
					statusPlug1 = 'OFF';
				}
				plug1.textContent = statusPlug1;
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(plug1Sensor,500);
	setInterval(plug1Sensor,3000);
//--------------------------/PLUG 1--------------------------------
	
	
	
	
	
	
	
	
//---------------------------PLUG 2--------------------------------
	var plug2 = document.getElementById('plug2');
	var plug2Image = document.getElementById('plug2Image');
	var dbPlug2 = 1;
	var statusPlug2 = "";
		
	function plug2Sensor(){
		
		$.ajax({
	        url: "/plug2",
	        type: "GET",
			dataType : 'json',
	        success: function(data) {
	          console.log('success --> PLUG 2 :', data.status);
			  dbPlug2 = data.status;
			  
//					플러그 감지 되면 초록 이미지 및 메세지 출력
				if (dbPlug2 == 1){
					plug2Image.src = "../img/c_plug2.png";
					statusPlug2 = 'ON';
				} else{
					plug2Image.src = "../img/plug2.png";
					statusPlug2 = 'OFF';
				}
				plug2.textContent = statusPlug2;
	        },
			error:function(){
				console.log('fail');
			}
		});
		
		
	}
	setTimeout(plug2Sensor,500);
	setInterval(plug2Sensor,3000);
//--------------------------/PLUG 2--------------------------------
	
	
	
	
	
	
	
//---------------------------CONDITION--------------------------------
	var conditionImage = document.getElementById('condition');
	var conditionText = document.getElementById('conditionText');
	var statusCondition = "";
	var cntCondition = 0;
	
//	get 방식의 parameter 값 받아오기
	cntCondition = getParameter("cc");
	
	function conditionSensor(){
		
		
//		혹시 연기나 소음이 두번이상 감지되었을때 BAD를 표시하는 로직을 위해서 check 변수들은 한번 감지될때마다 1 증가 합니다.
		if(checkSmoke >= 1 && checkNoise >= 1 || cntCondition >= 2){ 
			cntCondition = 2;
		} else if (checkSmoke >= 1 || checkNoise >= 1 ){
			cntCondition = 1;
		}
		
		
//		계약 위반에 따른 컨디션 이미지 출력
		if(cntCondition >= 2){
			conditionImage.src = "../img/bad.png";
			statusCondition = 'BAD...';
		} else if(cntCondition == 1){
			conditionImage.src = "../img/normal.png";
			statusCondition = 'NORMAL';
		} else{
			conditionImage.src = "../img/good.png";
			statusCondition = 'GOOD!';
		}
		

		
		
		
		conditionText.textContent = statusCondition;
		
//		계약 위반 할때마다 콘솔에 표시
		console.log(cntCondition);
		
	
	}
	console.log(cntCondition);
	conditionSensor();
	setInterval(conditionSensor,3000);
	
//--------------------------/CONDITION-------------------------------
	
	
	
//---------------------------유저 구분 하여 메세지 출력----------------------
	var userInfo = '';
	var userNo = 0;
	var user = document.getElementById('user');
	
	userInfo = getParameter('user');
	
	if(userInfo == "user2"){
		userNo = 2;
	}else if(userInfo == "user3"){
		userNo = 3;
	}else{
		userNo = 4;
	}
	user.textContent = "USER " + userNo;
//---------------------------/유저 구분 하여 메세지 출력----------------------
	
	
	
	
	
	
//-----------------------------checkOut-----------------------------	
	var conditionLevel = 0;
	function checkOut(){
		if(cntCondition >= 2){
			conditionLevel = - 1;
		} else if(cntCondition == 1){
			conditionLevel = 0;
		} else{
			conditionLevel = 1;
		}
		location.href='/itu/jsp/chkout?cLvl=' + conditionLevel +'&user=' + userInfo; 
	}
	
//-----------------------------/checkOut-----------------------------		

	
	