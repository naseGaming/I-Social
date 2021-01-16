<?php
	//php file for verifying the user
	$username = $_POST['user'];
	//gets the ip address of the user
	$ipAdd = $_SERVER['REMOTE_ADDR'];  
	$flag = false;

	require 'config.php';

	//checks if the username is existing in the database
	$sql = mysqli_query($con,"SELECT * FROM `users` where `Username` = '$username' ");


	if($sql){
		while($row = mysqli_fetch_assoc($sql)){
			$id = $row['Id'];
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	//if existing saves the ip address of the user for future verifications
	if($flag){
		$sql2 = mysqli_query($con,"INSERT INTO `login_data`(`Ip_Address`, `Users_Id`) VALUES ('$ipAdd','$id')");

		if($sql2){
			echo "Success";
		}
		else{
			echo "Error Sql 2";
		}
	}
?>