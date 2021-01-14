<?php
	$username = $_POST['user'];
    $password = $_POST['pass'];
	$flag = false;
	
	$xml = new DOMDocument;
	$xml->load('../Data/users.xml');

	$users = $xml->getElementsByTagName('user');
	$ctr = 0;
	$flag = false;
	
	while($ctr < $users->length){
		$user = $users->item($ctr)->getElementsByTagName('username')->item(0)->nodeValue;
		$id = $users->item($ctr)->getElementsByTagName('id')->item(0)->nodeValue;
		$pass = $users->item($ctr)->getElementsByTagName('password')->item(0)->nodeValue;
		
		if($username == $user){
			$flag = true;
			break;
		}
		$ctr++;
	}
	
	if($flag){
		if (password_verify($password, $pass)){
			echo $id;
		}
		else{
			echo "pass";
		}
	}
	else{
		echo "user";
	}
?>