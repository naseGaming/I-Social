<?php
	$id = $_POST['id'];
	$searchData = $_POST['searchData'];
	$flag = false;
	$searchResult = false;
	$searchCounter = 0;

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `users` where `Id` = '$id'");

	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	if($flag){
		$sql2 = mysqli_query($con,"SELECT * FROM `users`");

		if($sql2){
			while($row2=mysqli_fetch_assoc($sql2)){
				$firstname = $row2['First_Name'];
				$midname = $row2['Middle_Name'];
				$lastname = $row2['Last_Name'];

				if($searchData == $firstname){
					$searchResult = true;
					$searchCounter++;
				}
				else if($searchData == $midname){
					$searchResult = true;
					$searchCounter++;
				}
				else if($searchData == $lastname){
					$searchResult = true;
					$searchCounter++;
				}
				else{
					$searchResult = false;
				}

				if($searchResult){
					echo "<a>
							".$firstname." ".$lastname."
						</a>";
				}
			}

			if($searchCounter <= 0){
				echo "No Result Found!";
			}
		}
		else{
			echo "Error Sql 2";
		}
	}
?>