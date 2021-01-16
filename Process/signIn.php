<?php
	//php file for login
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	session_start();

	$username = $_POST['user'];
    $password = $_POST['pass'];
    $code = $_POST['code'];

	$flag = false;
	$ip = false;
	$ipAdd = $_SERVER['REMOTE_ADDR'];  
	
	require 'config.php';
	require 'PHPMailer.php';
	require 'Exception.php';
	require 'SMTP.php';

	//checks if the username is existing in the database
	$sql = mysqli_query($con,"SELECT * FROM `users` where `Username` = '$username' ");

	if($sql){
		while($row = mysqli_fetch_assoc($sql)){
			$id = $row['Id'];
			$hash = $row['Password'];
			$status = $row['Status'];
			$first = $row['First_Name'];
			$last = $row['Last_Name'];
			$email = $row['Email'];

			$flag = true;
		}

		if(!$flag){
			echo "User";
		}
		else{
			//checks if the password matches
			if (password_verify($password, $hash)){
				//checks if the user is logged out
				if($status === 0){
					echo $id."/".$first."/".$last;
				}
				else{
					//checks if the user device is already saved in the database
					$sql2 = mysqli_query($con,"SELECT * FROM `login_data` where `Ip_Address` = '$ipAdd' ");

					if($sql2){
						while($row2 = mysqli_fetch_assoc($sql2)){
							$login_id = $row['Users_Id'];
							$ip = true;
						}

						if($ip){
							if($id == $login_id){
								echo $id."/".$first."/".$last;
							}
							//if non existent forces user to verify if it really is him
							else{
								//if(sendMail($email, $code)){
									echo "Verify";
								//}
							}
						}
						else{
							//if(sendMail($email, $code)){
								echo "Verify";
							//}
						}
					}
				}
			}
			else{
				echo "Pass";
			}
		}
	}
	else{
		echo "Error Sql 1";
	}

	//function for sending mail(for future use)
	function sendMail($email, $code){
		$mail = new PHPMailer();

		$mail->setFrom("isocialnoreply2021@gmail.com");

		$mail->addAddress($email);

		$mail->Subject = "Verify User";

		$mail->Body = "This is your code ".$code;

		if (!$mail->send())
		{
		   echo $mail->ErrorInfo;
		   return false;
		}
		else{
			return true;
		}
	}
?>