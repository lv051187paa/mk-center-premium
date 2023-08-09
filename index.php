<?php
$matches = [];

$controller = $_GET['controller'];
$action = $_GET['action'];

$controller = ucfirst($controller);

require "controllers/".$controller."Controller.php";

$controller_instance = new $controller;

call_user_func_array([$controller_instance, $action], []);
