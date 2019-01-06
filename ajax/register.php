<?php
	require "db_connect.php";

	$data = $_POST;
	//var_dump($data);
		if( R::count('users', 'tel = ?', array($data['phone'])) > 0)
		{
			$errors[] = 'Данный номер уже зарегистрирован';
		}
		if( R::count('users', 'mail = ?', array($data['email'])) > 0)
		{
			$errors[] = 'Данный email уже зарегистрирован';
		}
		if (empty($errors)) {
			$user = R:: dispense('users');
			$user->phone = $data['phone'];
			$user->mail = $data['email'];
			$user->password = password_hash($data['password'],
				PASSWORD_DEFAULT);
			R::store($user);
		};

?>