<?php
	//php file for register
	$username = $_POST['user'];
    $password = $_POST['pass'];
    $first = $_POST['first'];
    $mid = $_POST['mid'];
    $last = $_POST['last'];
    $email = $_POST['email'];
	$hashed_password = password_hash($password, PASSWORD_DEFAULT);
	$userFlag = false;
	$emailFlag = false;
	
	require 'config.php';

	//checks if the username is already existing in the database
	$sql = mysqli_query($con,"SELECT * FROM `users` where `Username` = '$username' ");

	if($sql){
		while($row = mysqli_fetch_array($sql)){
			$userFlag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	//checks if the email is already existing in the database
	$sql2 = mysqli_query($con,"SELECT * FROM `users` where `Email` = '$email' ");

	if($sql2){
		while($row2 = mysqli_fetch_array($sql2)){
			$emailFlag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	if($userFlag){
		echo "User";
	}
	else{
		if($emailFlag){
			echo "Email";
		}
		else{
			//if both username and email is non existent in the database saves the credentials of the user
			$sql3 = mysqli_query($con,"INSERT INTO `users`(`Username`, `Password`, `First_Name`, `Middle_Name`, `Last_Name`, `Email`) VALUES ('$username','$hashed_password','$first','$mid','$last','$email')");
					
			if($sql3){
				echo "Go";
			}
			else{
				echo "Error Sql 3";
			}
		}
	}
?>