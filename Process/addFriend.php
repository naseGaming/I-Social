<?php
	$id = $_POST['id'];
	$searchId = $_POST['searchId'];
	$status = "Request";
	$flag = false;

	require 'config.php';

	$sql = mysqli_query($con,"INSERT INTO `friends`(`User_Id`, `Friend_User_Id`, `Status`) VALUES ('$id','$searchId', '$status')");

	if($sql){
			echo "Success";
	}
	else{
		echo "Error Sql";
	}
?>