<?php
	session_start();
	require_once("db_connect.php");

	$data = $_POST;

	$errors = array();

	$user = R::find('users', 'mail = ?', array($data['mail']));
	if ( $user) {
		if(password_verify($data['password'], $user->password)) {

		} else {
			$errors[] = "Неверный пароль!"
		}
	} else {
		$errors[] = "Пользователь с таким email-ом не зарегистрирован!"
	}

	?>