<?php 
session_start();
require "db_connect.php";
unset($_SESSION['logged_user']);
//Перебрасываем после выхода
echo "true";
?>
