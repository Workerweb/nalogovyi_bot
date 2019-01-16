<?php
	
	require_once("db_connect.php");

	$data = $_POST;

	$user = R::findOne('users', 'mail = ?', array($data['email']));

	if($user) {
		mail($data['email'], "Запрос на восстановление пароля", "Здравствуйте", "From: workabai@gmail.com");
		echo 'true';
	} else {
		echo 'false';
	}

?>