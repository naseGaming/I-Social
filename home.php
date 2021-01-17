<!DOCTYPE HTML>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" href="Design/favicon.ico" type="image/x-icon">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="Design/home.css" />
		<script src="https://kit.fontawesome.com/8b6b1fa9e8.js" crossorigin="anonymous"></script>
        <script src = "Scripts/jquery-3.1.1.min.js"></script>
        <script src = "Scripts/jquery-ui.min.js"></script>
		<script src = "Scripts/home.js" ></script>
	</head>
	<body>
		<div id = "left-bar" >
			<br>
			<div id = "profilePicture">
			</div>
			<br>
			<a id = "userName" >
			</a>
			<br>
			<br>
			<ul>
				<li class = "left-bar-items"><a class = "inactives" id = "left-profile"><i class="fas fa-user-alt"></i> Profile</a></li>
				<li class = "left-bar-items"><a class = "inactives" id = "left-messages"><i class="fas fa-comments"></i> Messages</a></li>
				<li class = "left-bar-items"><a class = "inactives" id = "left-notfications"><i class="fas fa-bell"></i> Notifications</a></li>
				<li class = "left-bar-items"><a class = "inactives" id = "left-settings"><i class="fas fa-cogs"></i> Settings</a></li>
				<li class = "left-bar-items"><a class = "inactives" id = "left-logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
			</ul>
		</div>
		<div>
			<div id = "top-bar" >
				<textarea id = "postText" class = "postText" rows = "4" cols = "50" placeholder = "Open up a discussion"></textarea>
				<a>
				<!-- 
					<button id = "agreeBtn" class = "reactBtn" ><i id = "reacts" class="fas fa-thumbs-up"></i></button>
					<button id = "disagreeBtn" class = "reactBtn2" ><i id = "reacts2" class="fas fa-thumbs-down"></i></button>
				-->
				<button id = "postBtn" class = "postBtn" >Post</button>
				</a>
			</div>
			<div id = "newsfeed" >
			</div>
		</div>
		<div id = "right-bar" >
			<a>
				<i id = "search-icon" class="fas fa-search"></i>
				<input type = "text" placeholder="Search" id = "search" class = "search" />
			</a>
		</div>
	</body>
</html>