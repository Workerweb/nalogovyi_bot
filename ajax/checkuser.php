<?php
	session_start();
	require_once("db_connect.php");

	$data = $_POST;

	$user = R::findOne('users', 'id = ?', array($data['id']));

	if ($user) {
		$_SESSION['logged_user'] = $user;
		echo ($user);
	}

?>