<?php
	$id = $_POST['id'];
	$flag =  false;

	require 'config.php';

	$sql = mysqli_query($con,"DELETE FROM `posts` where `POST_Id` = '$id'");

	if($sql){
		echo "Success";
	}
	else{
		echo "Error Sql 1";
	}
?>