<?php
	session_start();
	require_once("db_connect.php");

	$data = $_POST;

	$user = R::findOne('users', 'mail = ?', array($data['email']));
	if ( $user) {
		if(password_verify($data['password'], $user->password)) {
			$_SESSION['logged_user'] = $user;
			echo ($_SESSION['logged_user']);
		} else {
		}
	} else {
	}

	?>