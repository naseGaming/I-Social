<?php
	$id = $_POST['id'];
	$data = $_POST['data'];
	$flag =  false;
	date_default_timezone_set("Asia/Manila");
	$date = date("Y-m-d h:i:sa");

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `users` where `Id` = '$id'");

	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	if($flag){
		$sql2 = mysqli_query($con,"INSERT INTO `posts`(`Post_Sender`, `Post_Data`, `Post_Date`) VALUES ('$id','$data','$date')");

		if($sql2){
			echo "Success";
		}
		else{
			echo "Error Sql 2";
		}
	}
	else{
		echo "Logout";
	}
?>