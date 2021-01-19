<?php
	$id = $_POST['id'];
	$searchData = $_POST['searchData'];
	$searchData = strtolower($searchData);
	$dataPieces = str_split($searchData);
	$length = count($dataPieces);
	$flag = false;
	$searchResult = false;
	$seemore = false;
	$searchCounter = 0;
	$first = false;
	$mid = false;

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
				$first = false;
				$mid = false;

				$searchId = $row2['Id'];
				$firstname = $row2['First_Name'];
				$midname = $row2['Middle_Name'];
				$lastname = $row2['Last_Name'];

				$firstname = strtolower($firstname);
				$firstnamePieces = str_split($firstname, $length);
				$firstnameLength = count($firstnamePieces);

				$midname = strtolower($midname);
				$midnamePieces = str_split($midname, $length);
				$midnameLength = count($midnamePieces);

				$lastname = strtolower($lastname);
				$lastnamePieces = str_split($lastname, $length);
				$lastnameLength = count($lastnamePieces);

				if($searchData == $firstnamePieces[0]){
					$searchCounter++;
					$searchResult = true;
				}
				else{
					if($searchData == $midnamePieces[0]){
						$searchCounter++;
						$searchResult = true;
					}
					else{
						if($searchData == $lastnamePieces[0]){
							$searchCounter++;
							$searchResult = true;
						}
						else{
							$searchResult = false;
						}
					}
				}

				if($searchCounter > 5){
					$seemore = true;
				}
				else{
					if($searchResult){
						echo "<div class = 'searchItems' onClick = 'goTo(this);' id = '".$searchId."'>
							".$firstname." ".$lastname."
						</div>";
					}
				}
			}

			if($searchCounter <= 0){
				echo "<div class = 'searchItems' >
					No Result Found!
				</div>";
			}
			if($seemore){
				echo "<div class = 'searchItems' onClick = 'goTo(this);' id = 'seemore'>
					See more about ".$searchData."
				</div>";
			}
		}
		else{
			echo "Error Sql 2";
		}
	}
?>