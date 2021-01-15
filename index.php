<!DOCTYPE HTML>
<html>
	<head>
  		<meta charset="UTF-8">
  		<meta name="viewport" content="width=device-width, initial-scale=1.0">
  		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="shortcut icon" href="Design/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="Design/index.css" />
		<script src="https://kit.fontawesome.com/8b6b1fa9e8.js" crossorigin="anonymous"></script>
        <script src = "Scripts/jquery-3.1.1.min.js"></script>
        <script src = "Scripts/jquery-ui.min.js"></script>
		<script src = "Scripts/index.js" ></script>
	</head>
	<body>
		<div id ="body" >
			<div id = "rightHalf" >
				<h1>Welcome to ISocial</h1>
				<img src = "Design/favicon.png" alt = "ISocial Icon" />
				<br>
				<a>We Connect</a>
			</div>
			<div id = "frmLogin" >
				<br>
				<h1 id = "head"><i class="fa fa-sign-in"></i> Sign in</h1>
				<input type = "text" class = "inputs" id = "username" placeholder = "Username" />
				<br>
				<br>
				<input type = "password" class = "inputs" id = "password" placeholder = "Password" />
				<br>
				<br>
				<a id = "hiddenCode" ><input type = "text" class = "inputCode" id = "userCode" placeholder = "Code in Email" /><button id = "verify" class = "inputCodeBtn" >Verify</button></a>
				<br>
				<br>
				<a id = "forget" class = "link"><u>Forget Password?</u></a>
				<br>
				<br>
				<a id = "create" class = "link"><u>Don't Have an Account?</u></a>
				<br>
				<p id = "err"  ></p>
				<br>
				<button class = "buttons" id = "login" type = "button"><i class="fa fa-sign-in"></i> Sign in</button>
			</div>
			<div id = "frmRegister" >
				<br>
				<h1 id = "head"><i class="fa fa-save"></i> Sign up</h1>
				<input type = "text" class = "inputs" id = "regUser" placeholder = "Username" />
				<br>
				<br>
				<input type = "password" class = "inputs" id = "regPass" placeholder = "Password" />
				<br>
				<br>
				<input type = "password" class = "inputs" id = "regConf" placeholder = "Confirm Password" />
				<br>
				<br>
				<input type = "text" class = "inputs" id = "regFirst" placeholder = "First Name" />
				<br>
				<br>
				<input type = "text" class = "inputs" id = "regMid" placeholder = "Middle Name" />
				<br>
				<br>
				<input type = "text" class = "inputs" id = "regLast" placeholder = "Last Name" />
				<br>
				<br>
				<input type = "text" class = "inputs" id = "regEmail" placeholder = "Email" />
				<br>
				<br>
				<a id = "log" class = "link"><u>Have an Account?</u></a>
				<br>
				<p id = "errR"  ></p>
				<br>
				<button class = "buttons" id = "register" type = "button"><i class="fa fa-save"></i> Sign up</button>
			</div>
		</div>
	</body>
</html>