<?php
	$username = $_POST['user'];
    $password = $_POST['pass'];
    $first = $_POST['first'];
    $mid = $_POST['mid'];
    $last = $_POST['last'];
    $email = $_POST['email'];
	$hashed_password = password_hash($password, PASSWORD_DEFAULT);
	
	$xml = new DOMDocument;
	$xml->load('../Data/users.xml');

	$users = $xml->getElementsByTagName('user');
	$ctr = 0;
	$i = 0;
	$isUser = false;
	$isEmail = false;
	$flag = false;
	
	while($ctr < $users->length){
		$existingUser = $users->item($ctr)->getElementsByTagName('username')->item(0)->nodeValue;
		$existingEmail = $users->item($ctr)->getElementsByTagName('email')->item(0)->nodeValue;
	
		if($username == $existingUser){
			$isUser = true;
			break;
		}
		if($email == $existingEmail){
			$isEmail = true;
			break;
		}
		$ctr++;
	}
		
	if(!$isUser){
		if(!$isEmail){
			while($i < $users->length){
				$id = $users->item($i)->getElementsByTagName('id')->item(0)->nodeValue;
				$flag = true;
				$i++;
			}
			
			if($flag){
				$id = $id + 1;
			}
			else{
				$id = 1;
			}
			
	        $newUser = $xml->createElement('user');

	        $newId = $xml->createElement('id', $id);
	        $newUsername = $xml->createElement('username', $username);
	        $newPassword = $xml->createElement('password', $hashed_password);
	        $newFirst = $xml->createElement('firstname', $first);
	        $newMid = $xml->createElement('middlename', $mid);
	        $newLast = $xml->createElement('lastname', $last);
	        $newEmail = $xml->createElement('email', $email);

	        $newUser->appendChild($newId);
	        $newUser->appendChild($newUsername);
	        $newUser->appendChild($newPassword);
	        $newUser->appendChild($newFirst);
	        $newUser->appendChild($newMid);
	        $newUser->appendChild($newLast);
	        $newUser->appendChild($newEmail);

	        $xml->getElementsByTagName('users')->item(0)->appendChild($newUser);
	        $save = $xml->save('../Data/users.xml');
			
			$myFile = fopen("../Data/$username-posts.xml","a");

			$xmlContent = '<?xml version="1.0"?><posts></posts>';

			$content = file("../Data/$username-posts.xml");

			$fileIn = array();
			$count = 0;
			foreach($content as $content)
			{
				$fileIn[$count] = $content;
			}	
		   
			fwrite($myFile,$xmlContent);
			
			$myFile = fopen("../Data/$username-friends.xml","a");

			$xmlContent = '<?xml version="1.0"?><friends></friends>';

			$content = file("../Data/$username-friends.xml");

			$fileIn = array();
			$count = 0;
			foreach($content as $content)
			{
				$fileIn[$count] = $content;
			}	
		   
			fwrite($myFile,$xmlContent);
			
			$myFile = fopen("../Data/$username-messages.xml","a");

			$xmlContent = '<?xml version="1.0"?><messages></messages>';

			$content = file("../Data/$username-messages.xml");

			$fileIn = array();
			$count = 0;
			foreach($content as $content)
			{
				$fileIn[$count] = $content;
			}	
		   
			fwrite($myFile,$xmlContent);
			echo "Go";
		}
		else{
			echo "Email";
		}
	}
	else{
		echo "User";
	}
?>