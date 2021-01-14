<?php
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

	$sql = mysqli_query($con,"SELECT * FROM `users` where `Username` = '$username' ");

	if($sql){
		while($row = mysqli_fetch_array($sql)){
			$userFlag = true;
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