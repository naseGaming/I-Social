<?php
	$id = $_POST['id'];
	$list = "0";
	$listData = "full";
	$flag = false;

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `friends` where `User_Id` = '$id' or `Friend_User_Id` = '$id' and `Status` = 'Friend' ");

	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$flag = true;
			$User_Id = $row['User_Id'];
			$Friend_User_Id = $row['Friend_User_Id'];

			if($User_Id == $id){
				$sql2 = mysqli_query($con,"SELECT * FROM `users` where `Id` = '$Friend_User_Id'");

				if($sql2){
					while($row2=mysqli_fetch_assoc($sql2)){
						$first = $row2['First_Name'];
						$last = $row2['Last_Name'];
					}
				}

				$list = $list."/".$Friend_User_Id."/".$first."/".$last;
			}
			else{
				$sql2 = mysqli_query($con,"SELECT * FROM `users` where `Id` = '$User_Id'");

				if($sql2){
					while($row2=mysqli_fetch_assoc($sql2)){
						$first = $row2['First_Name'];
						$last = $row2['Last_Name'];
					}
				}

				$list = $list."/".$User_Id."/".$first."/".$last;
			}
		}
	}
	else{
		echo "Error Sql 1";
	}


	if($flag){
		$list = explode("/", $list);
	}
	else{
		$listData = "empty";
	}
?>