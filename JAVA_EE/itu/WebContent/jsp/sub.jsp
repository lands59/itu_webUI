<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">

<!-- 	부트스트랩 -->
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	
	<script src="../js/jquery-3.1.1.min.js"></script>
	<script src="../js/bootstrap.min.js"></script>
	
<!-- 	font-awesome (아이콘) -->
<!-- 	<link rel="stylesheet" href="../css/font-awesome.min.css"> -->
	
	

		


<title>SUB</title>
</head>
<body>
	<div class="container-fluid">
		
		<div class = "row">
			<div class = "col-xs-12">
				<center><h1>Sensor Informations of <span id="user" style="color:red"></span>'s Room</h1></center>
			</div>
		</div>
		
		<br>
		
<!-- 	왼쪽 화면 -->
		<div class = "row">
		
			<div class = "col-xs-4">
				<img src="../img/home.JPG" class="img-responsive col-lg-12">
			</div>
	
<!-- 	센서 데이터 -->
			<div class ="col-xs-8">
				<div class = "col-xs-9">
					<br>
					<div class = "row">
						<center>
							<div class="col-xs-1"></div>
							<div class="col-xs-2"><img src="../img/temp.png" class="img-responsive img-thumbnail" id= "tempImage">TEMP<br><div id="temp" class="col-xs-12">0</div></div>
							<div class="col-xs-2"><img src="../img/humid.png" class="img-responsive img-thumbnail" id="humidImage">HUMID<br><div id="humid">0</div></div>
							<div class="col-xs-2"><img src="../img/light1.png" class="img-responsive img-thumbnail" id="brightImage">BRIGHT<br><div id="bright">0</div></div>
							<div class="col-xs-2"><img src="../img/led1.png" class="img-responsive img-thumbnail" id="led1Image">LED 1<br><div id="led1">0</div></div>
							<div class="col-xs-2"><img src="../img/led2.png" class="img-responsive img-thumbnail" id="led2Image">LED 2<br><div id="led2">0</div></div>
						</center>
					</div>
					<br>
					<br>
					
					<div class="row">
						<center>
							<div class="col-xs-1"></div>
							<div class="col-xs-2"><img src="../img/smoke_black.png" class="img-responsive img-thumbnail" id="smokeImage">SMOKE<br><div id="smoke">NONE</div></div>
							<div class="col-xs-2"><img src="../img/noise.png" class="img-responsive img-thumbnail" id="noiseImage">NOISE<br><div id="noise">0</div></div>
							<div class="col-xs-2"><img src="../img/window_close.png" class="img-responsive img-thumbnail" id="windowImage">WINDOW<br><div id="window">Closed</div></div>
							<div class="col-xs-2"><img src="../img/plug1.png" class="img-responsive img-thumbnail" id="plug1Image">PLUG 1<br><div id="plug1">OFF</div></div>
							<div class="col-xs-2"><img src="../img/plug2.png" class="img-responsive img-thumbnail" id="plug2Image">PLUG 2<br><div id="plug2">OFF</div></div>
						</center>
					</div>
				</div>
				
				<div class = "col-xs-3">
					<br><br><br><br>
					<div class="col-xs-12"><img src="../img/good.png" class="img-responsive img-thumbnail" id="condition"><center>Service Condition<br><div id="conditionText">GOOD</div></center></div>
				</div>
				
			</div>
			
			
<!-- 			<div class = "col-xs-1"> -->
<!-- 				<br><br><br> -->
<!-- 				<div class="col-xs-12" style="cursor:pointer;" onclick="location.href='sub.jsp?cc=0'"><img src="../img/good.png" class="img-responsive"  id="condition"><center>Service Condition<br><div id="conditionText">GOOD</div></center></div> -->
<!-- 			</div> -->
			
		</div>
		
		
		
		
<!-- 		오작동 버튼  -->
<!-- 		<div class="col-xs-12"> -->
			
<!-- 				<div class="col-xs-3"><label for="smokeCB" onclick="if(navigator.appVersion.indexOf('MSIE')!=-1){test.click()}"><img src="../img/smoke_black.png" class="img-responsive img-thumbnail" id="smokeImage" alt="naver" style="cursor:pointer"></label><br><input type = "checkbox" id="smokeCB" value="1" onClick="smokeCB(this);"><label for="smokeCB">SMOKE</label></div> -->
<!-- 				<div class="col-xs-3"><label for="noiseCB" onclick="if(navigator.appVersion.indexOf('MSIE')!=-1){test.click()}"><img src="../img/noise.png" class="img-responsive img-thumbnail" id="smokeImage" alt="naver" style="cursor:pointer"></label><br><input type = "checkbox" id="noiseCB" value="1" onClick="noiseCB(this);"><label for="noiseCB">NOISE</label></div> -->
				
<!-- 		</div> -->
<!-- 		/오작동 버튼  -->
		
		
		<div class="col-lg-12">
			<br><br>
			<button type="button" class="btn btn-danger btn-lg btn-block" onclick="checkOut();" id="reset" name="reset">Check Out</button>
		</div>
	</div>

	
	<script src="../js/subSensor.js"></script>



</body>
</html>