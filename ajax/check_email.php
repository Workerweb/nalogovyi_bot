<?php
	require "db_connect.php";

	$data = $_POST;
	//var_dump(R::count('users', 'mail = ?', array($data['email'])));
		if( R::count('users', 'mail = ?', array($data['email'])) > 0)
		{
			echo 'false';
		} else {
			echo 'true';
		}
?>