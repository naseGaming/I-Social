<?php
	$id = $_POST['id'];
	$flag =  false;
	$flag2 = false;
	date_default_timezone_set("Asia/Manila");

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `users` where `Id` = '$id'");

	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$first = $row['First_Name'];
			$last = $row['Last_Name'];
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	if($flag){
		$sql2 = mysqli_query($con,"SELECT * FROM `posts` where `Post_Sender` = '$id' order by `POST_Id` desc");

		if($sql2){
			while($row2=mysqli_fetch_assoc($sql2)){
				$flag2 = true;

				echo "<div class = 'posts'>
					<div class = 'userName'>
						<img class = 'usersPicture' src = 'Design/Resources/Default.png' alt = '".$first."-".$last."' >
						<a class = 'aName' onClick = 'goProfile(this);' id = ".$row2["Post_Sender"].">".$first." ".$last."</a> 
						<button class = 'editBtn' id = ".$row2['Post_Id'].">
							<i class='fas fa-edit'></i>
						</button>
						<button class = 'deleteBtn' id = ".$row2['Post_Id'].">
							<i class='fas fa-trash'></i>
						</button>
					</div>
					<div class = 'postData'>
						".$row2['Post_Data']."
					</div>
					<button id = 'agreeBtn' class = 'reactBtn' ><i id = 'reacts' class='fas fa-thumbs-up'></i></button>
					<button id = 'disagreeBtn' class = 'reactBtn2' ><i id = 'reacts2' class='fas fa-thumbs-down'></i></button><a class = 'postDate'>".$row2['Post_Date']."</a>
				</div>";
			}
		}
		else{
			echo "Error Sql 2";
		}
	}
?>