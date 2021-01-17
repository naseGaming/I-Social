<?php
	session_start();
	$id = $_POST['id'];
	$status = "1";

	require 'config.php';
	
	$sql = mysqli_query($con,"SELECT * FROM `users` where `Id` = '$id'");
	
	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$status = $row['Status'];
		}
	}
	else{
		echo "Error Sql 1";
	}
	
	if($status == "1"){
		$sql2 = mysqli_query($con,"UPDATE users SET `Status` = '0' where `Id` = '$id' ");
		
		if($sql2){
			echo "Success";
			session_destroy();
		}
		else{
			echo "Error Sql 2";
			session_destroy();
		}
	}
	else{
		echo "Success";
		session_destroy();
	}
	
?>