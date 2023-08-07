<?php
$matches = [];
echo '<pre>';
print_r(preg_match("/$1\/$2/", $_SERVER["REQUEST_URI"], $matches));

print_r($_GET);
echo '</pre>';

//return require "index.html";

echo "testing";
