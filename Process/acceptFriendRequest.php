<?php
	$friendId = $_POST['friendId'];
	$flag = false;

	require 'config.php';
	
	$sql = mysqli_query($con,"SELECT * FROM `friends` where `Friend_Id` = '$friendId'");
	
	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}
	
	if($flag){
		$sql2 = mysqli_query($con,"UPDATE friends SET `Status` = 'Friend' where `Friend_Id` = '$friendId' ");
		
		if($sql2){
			echo "Success";
		}
		else{
			echo "Error Sql 2";
		}
	}
	
?>