<?php
	session_start();
	require "db_connect.php";

	$data = $_POST;
	function fixObject (&$object)
	{
	  if (!is_object ($object) && gettype ($object) == 'object')
	    return ($object = unserialize (serialize ($object)));
	  return $object;
	}
	$currentuser = fixobject($_SESSION['logged_user']);
	$id = $currentuser->id;
	$bin = $currentuser->bin;
	$user = R::load('users', $id);
		$user->bin = $data['bin'];
		$user->ip = $data['ip'];
		$user->surname = $data['surname'];
		$user->name = $data['name'];
		$user->patronymic = $data['patronymic'];
		$user->resident = $data['resident'];
		R::store($user);
	var_dump($user);
?>