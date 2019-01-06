<?php
	session_start();
	require "db_connect.php";

	$data = $_POST;
	//var_dump($data);
		
		if ($data['id'] = $data['id']) {
			$user = R:: dispense('users');
			$user->bin = $data['bin'];
			$user->ip = $data['ip'];
			$user->surname = $data['surname'];
			$user->name = $data['name'];
			$user->patronymic = $data['patronymic'];
			$user->resident = $data['resident'];
			R::store($user);
		}

?>