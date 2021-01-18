<?php
	$id = $_POST['id'];
	$flag =  false;
	$flag2 = false;
	$reactCtr = 0;
	$agreeCtr = 0;
	$disagreeCtr = 0;
	$isReacted = false;
	$reaction = "";
	date_default_timezone_set("Asia/Manila");

	require 'config.php';

	$sql = mysqli_query($con,"SELECT * FROM `users` where `Id` = '$id'");

	if($sql){
		while($row=mysqli_fetch_assoc($sql)){
			$first = $row['First_Name'];
			$last = $row['Last_Name'];
			$flag = true;
		}
	}
	else{
		echo "Error Sql 1";
	}

	if($flag){
		$sql2 = mysqli_query($con,"SELECT * FROM `posts` where `Post_Sender` = '$id' order by `POST_Id` desc");

		if($sql2){
			while($row2=mysqli_fetch_assoc($sql2)){
				$flag2 = true;
				$reactCtr = 0;
				$agreeCtr = 0;
				$disagreeCtr = 0;
				$isReacted = false;
				$post_id = $row2['Post_Id'];

				$sql3 = mysqli_query($con,"SELECT * FROM `reactions` where `Post_Id` = '$post_id' order by `Reaction` desc");

				if($sql3){
					while($row3=mysqli_fetch_assoc($sql3)){
						$reactCtr++;

						if($row3['Reaction'] == "0"){
							$disagreeCtr++;
							$reaction = "Disagree";
						}
						else{
							$agreeCtr++;
							$reaction = "Agree";
						}

						if($row3['User_Id'] == $id){
							$isReacted = true;
						}
					}
				}
				else{
					echo "Error Sql 3";
				}

				if($reactCtr > 0){
					echo "<div class = 'posts'>
						<div class = 'userName'>
							<img class = 'usersPicture' src = 'Design/Resources/Default.png' alt = '".$first."-".$last."' >
							<a class = 'aName' onClick = 'goProfile(this);' id = ".$row2["Post_Sender"].">".$first." ".$last."</a> 
							<button onClick = 'deletePost(this);' class = 'deleteBtn' id = ".$row2['Post_Id'].">
								<i class='fas fa-trash'></i>
							</button>
						</div>
						<div id = '".$row2['Post_Id']."-text' class = 'postData'>
							".$row2['Post_Data']."
						</div>";
					if($reaction == "Agree"){
						echo "<button id = 'agreeBtn' name = '".$row2['Post_Id']."' onClick = 'agreePost(this);' class = 'reactBtnAct' >
							<i id = 'reacts' class='fas fa-thumbs-up'></i> ".$agreeCtr."
						</button>
						<button id = 'disagreeBtn' name = '".$row2['Post_Id']."' onClick = 'disAgreePost(this);' class = 'reactBtn2' >
							<i id = 'reacts2' class='fas fa-thumbs-down'></i> ".$disagreeCtr."
						</button>";
					}
					else{
						echo "<button id = 'agreeBtn' name = '".$row2['Post_Id']."' onClick = 'agreePost(this);' class = 'reactBtn' >
							<i id = 'reacts' class='fas fa-thumbs-up'></i> ".$agreeCtr."
						</button>
						<button id = 'disagreeBtn' name = '".$row2['Post_Id']."' onClick = 'disAgreePost(this);' class = 'reactBtn2Act' >
							<i id = 'reacts2' class='fas fa-thumbs-down'></i> ".$disagreeCtr."
						</button>";
					}
					echo "<button id = 'replyBtn' class = 'replyBtn' >
							<i id = 'reacts2' class='fas fa-reply-all'></i>
						</button>
						<a class = 'postDate'>".$row2['Post_Date']."</a>
					</div>";
				}
				else{
					echo "<div class = 'posts'>
						<div class = 'userName'>
							<img class = 'usersPicture' src = 'Design/Resources/Default.png' alt = '".$first."-".$last."' >
							<a class = 'aName' onClick = 'goProfile(this);' id = ".$row2["Post_Sender"].">".$first." ".$last."</a> 
							<button onClick = 'deletePost(this);' class = 'deleteBtn' id = ".$row2['Post_Id'].">
								<i class='fas fa-trash'></i>
							</button>
						</div>
						<div id = '".$row2['Post_Id']."-text' class = 'postData'>
							".$row2['Post_Data']."
						</div>
						<a>
						<button id = 'agreeBtn' name = '".$row2['Post_Id']."' onClick = 'agreePost(this);' class = 'reactBtn' >
							<i id = 'reacts' class='fas fa-thumbs-up'></i></button>
						<button id = 'disagreeBtn' name = '".$row2['Post_Id']."' onClick = 'disAgreePost(this);' class = 'reactBtn2' >
							<i id = 'reacts2' class='fas fa-thumbs-down'></i>
						</button>
						<button id = 'replyBtn' class = 'replyBtn' >
							<i id = 'reacts2' class='fas fa-reply-all'></i>
						</button>
						<a class = 'postDate'>".$row2['Post_Date']."</a>
						</a>
					</div>";
				}
			}
		}
		else{
			echo "Error Sql 2";
		}
	}
?>