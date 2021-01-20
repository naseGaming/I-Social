<?php
	$id = $_POST['id'];
	$searchData = $_POST['searchData'];
	$searchData = strtolower($searchData);
	$dataPieces = str_split($searchData);
	$length = count($dataPieces);
	$flag = false;
	$searchResult = false;
	$seemore = false;
	$isFriend = false;
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

				$midname = strtolower($midname);
				$midnamePieces = str_split($midname, $length);

				$lastname = strtolower($lastname);
				$lastnamePieces = str_split($lastname, $length);

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
						if($searchId == $id){
						}
						else{
							$isFriend = false;

							$sql3 = mysqli_query($con,"SELECT * FROM `friends` where `User_Id` = '$searchId' or `Friend_User_Id` = '$searchId' ");


							if($sql3){
								while($row3=mysqli_fetch_assoc($sql3)){
									$Friend_Id = $row3['Friend_Id'];
									$User_Id = $row3['User_Id'];
									$Friend_User_Id = $row3['Friend_User_Id'];
									$status = $row3['Status'];

									if($Friend_User_Id == $id){
										$isFriend = true;
										break;
									}
									else{
										if($User_Id == $id){
											$isFriend = true;
											break;
										}
									}
								}
							}


							if($isFriend){
								if($status == "Friend"){
									echo "<div class = 'searchItems' onClick = 'goTo(this);' id = '".$searchId."/".$firstname." ".$lastname."'>
										 <img class = 'searchUsersPicture' src = 'Design/Resources/Default.png' alt = '".$firstname."-".$lastname."' > ".$firstname." ".$lastname."
									</div>";
								}
								else{
									if($Friend_User_Id == $id){
										echo "<div class = 'searchItems' onClick = 'goTo(this);' id = '".$searchId."/".$firstname." ".$lastname."'>
											 <img class = 'searchUsersPicture' src = 'Design/Resources/Default.png' alt = '".$firstname."-".$lastname."' > ".$firstname." ".$lastname." <a id = '".$Friend_Id."' class = 'responseRequest' onClick = 'rejectFriendRequest(this);' >Reject</a><a id = '".$Friend_Id."' class = 'responseRequest' onClick = 'acceptFriendRequest(this);' >Accept</a>
										</div>";
									}
									else{
										echo "<div class = 'searchItems' onClick = 'goTo(this);' id = '".$searchId."/".$firstname." ".$lastname."'>
											 <img class = 'searchUsersPicture' src = 'Design/Resources/Default.png' alt = '".$firstname."-".$lastname."' > ".$firstname." ".$lastname." <a class = 'responseRequest' >Request Sent</a>
										</div>";
									}
								}
							}
							else{
								echo "<div class = 'searchItems' onClick = 'goTo(this);' id = '".$searchId."/".$firstname." ".$lastname."'>
									<img class = 'searchUsersPicture' src = 'Design/Resources/Default.png' alt = '".$firstname."-".$lastname."' > ".$firstname." ".$lastname."<a id = '".$searchId."' class = 'responseRequest' onClick = 'addFriend(this);' >Add Friend</a>
								</div>";
							}
						}
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