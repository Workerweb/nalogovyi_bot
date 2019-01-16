<?php
	
	session_start();
	require_once("db_connect.php");

	function fixObject (&$object)
	{
	  if (!is_object ($object) && gettype ($object) == 'object')
	    return ($object = unserialize (serialize ($object)));
	  return $object;
	}

	$currentuser = fixobject($_SESSION['logged_user']);

	if($currentuser) {
		echo ($currentuser);
	} else {
		echo 'false';
	}

?>