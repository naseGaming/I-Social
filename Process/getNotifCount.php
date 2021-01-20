<?php
	$id = $_POST['id'];
	$counter = 0;

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `notifications` where `User_Id` = '$id'");

	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$counter++;
		}

		echo $counter;
	}
	else{
		echo "Error Sql 1";
	}

?>