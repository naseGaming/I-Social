<?php
	$postId = $_POST['postId'];
	$id = $_POST['id'];
	$reaction = $_POST['reaction'];
	$flag =  false;
	$reactId =  "";
	$isDifferent = true;

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `reactions` where `User_Id` = '$id' and `Post_Id` = '$postId' ");

	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$reactId = $row['React_Id'];
			$existingReaction = $row['Reaction'];
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	if($flag){
		if($existingReaction == $reaction){
			$sql2 = mysqli_query($con,"DELETE FROM `reactions` where `React_Id` = '$reactId'");

			if($sql2){
				echo "Deleted";
			}
			else{
				echo "Error Sql 2";
			}
		}
		else{
			$sql4 = mysqli_query($con,"UPDATE `reactions` SET `Reaction` = '$reaction' where `React_Id` = '$reactId' ");

			if($sql4){
				echo "Edited";
			}
			else{
				echo "Error Sql 4";
			}
		}
	}
	else{
		$sql3 = mysqli_query($con,"INSERT INTO `reactions`(`Reaction`, `Post_Id`, `User_Id`) VALUES ('$reaction','$postId','$id')");

		if($sql3){
			echo "Reacted";
		}
		else{
			echo "Error Sql 2";
		}
	}
?>