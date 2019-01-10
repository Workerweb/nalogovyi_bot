<?php
	require "db_connect.php";

	$data = $_POST;
	//var_dump(R::count('users', 'mail = ?', array($data['email'])));
	if ($user = R::findOne('users', 'mail = ?', array($data['email']))) {
		echo "false";
	} else {
		$user = R:: dispense('users');
		$user->phone = $data['phone'];
		$user->mail = $data['email'];
		$user->password = password_hash($data['password'],
			PASSWORD_DEFAULT);
		R::store($user);
		echo "true";
	}

?>