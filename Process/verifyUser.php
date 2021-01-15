<?php
	$username = $_POST['user'];
	$ipAdd = $_SERVER['REMOTE_ADDR'];  
	$flag = false;

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `users` where `Username` = '$username' ");


	if($sql){
		while($row = mysqli_fetch_array($sql)){
			$id = $row['Id'];
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

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