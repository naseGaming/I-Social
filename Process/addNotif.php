<?php
	$id = $_POST['id'];
	$data = $_POST['data'];
	date_default_timezone_set("Asia/Manila");
	$date = date("Y-m-d h:i:sa");

	require 'config.php';

	$sql = mysqli_query($con,"INSERT INTO `notifications`(`User_Id`, `Notif_Data`, `Date`) VALUES ('$id','$data', '$date')");

	if($sql){
		echo "Success";
	}
	else{
		echo "Error Sql";
	}
?>