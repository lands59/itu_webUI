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
		
<!-- 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
<!-- 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>	 -->
<!-- 	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>	 -->
	
	
		
	
	
	<title>MAIN</title>
	
	
</head>
<body>


	<div class="container-fluid">
		<div class="row">
		    <div class="col-xs-12">
		    
		    
			    <div class="row">
			    	<div class="col-xs-1"></div>
			    	<div class="col-xs-4"><h1><span id="checkPlz" style="color:red"></span></h1></div>
			    	<div class="col-xs-7">
			    		<div class="row">
			    			<div class="col-xs-6"></div>
				    		<div class="col-xs-2"><h1><input type="radio" style="width:20px;height:20px" name="user" id="user1" value="1"><label for="user1">&nbsp;USER 2</label></h1></div>
				    		<div class="col-xs-2"><h1><input type="radio" style="width:20px;height:20px" name="user" id="user2" value="2"><label for="user2">&nbsp;USER 3</label></h1></div>
				    		<div class="col-xs-2"><h1><input type="radio" style="width:20px;height:20px" name="user" id="user3" value="3"><label for="user3">&nbsp;USER 4</label></h1></div>
			    		</div>
			    	</div>
			    </div>
			    
			    
			    <div class="row" style="cursor:pointer;" onclick="submit('user','alert');" >
					<center>
						<div class="col-xs-2"><img src="../img/temp.png" class="img-responsive img-thumbnail" id="tempImage">TEMP<br><div id="temp" class="col-xs-12">0 C</div></div>
						<div class="col-xs-2"><img src="../img/smoke_black.png" class="img-responsive img-thumbnail" id="smokeImage">SMOKE<br><div id="smoke" class="col-xs-12">NONE</div></div>
						<div class="col-xs-2"><img src="../img/noise.png" class="img-responsive img-thumbnail" id="noiseImage">NOISE<br><div id="noise">0</div></div>
						<div class="col-xs-2"><img src="../img/led_m.png" class="img-responsive img-thumbnail" id="led1Image">LED<br><div id="led1">OFF</div></div>
						<div class="col-xs-2"><img src="../img/window_close.png" class="img-responsive img-thumbnail" id="windowImage">WINDOW<br><div id="window">Closed</div></div>
						<div class="col-xs-2"><h2>Service<br>Condition</h2><img src="../img/good.png" class="img-responsive img-thumbnail" id="condition"></div>
					</center>
				</div>
				
				
		    </div>
	    </div>
	</div>
	
	<script src="../js/mainSensor.js"></script>
</body>
</html>