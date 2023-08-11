<?php

/*
 * App core class
 * Gets URL and loads controller
 * URL FORMAT - /controller/method/params
 */

use JetBrains\PhpStorm\ArrayShape;

class App
{

    private mixed $_controller;
    private string $_method;
    private array $_params = array();

    public function __construct()
    {
        [
            "controller" => $controller,
            "action" => $action
        ] = $this->getURL();

        $controller_path = "controllers/" . $controller . ".php";

        // Look for controller file if exists
        if (file_exists($controller_path)) {
            $this->_controller = $controller;
            unset($controller);

            // Require controller
            require_once $controller_path;
            // Create new controller object
            $this->_controller = new $this->_controller;


        } else {
            http_response_code(404);

            echo json_encode([
                "message" => "Controller was not found."
            ]);
        }

        // Check, if the method is given in the URL
        if (isset($action)) {
            // Check, if method exists inside the controller class
            if (method_exists($this->_controller, $action)) {
                $this->_method = $action;
                unset($action);
            }
        }

        // Get params from the URL
//        $this->_params = $url ? array_values($url) : array();

        // Call method from the controller class, pass the params
        call_user_func_array(array($this->_controller, $this->_method), $this->_params);
    }

    #[ArrayShape([
        "controller" => "string",
        "action" => "mixed|string"
    ])] private function getURL(): array
    {
        $action_name = "index";
        if (!isset($_GET['controller'])) {
            http_response_code(400);

            echo json_encode([
                "message" => "Controller was not provided."
            ]);
        }

        // Sanitize URL string
        $controller = filter_var($_GET['controller'], FILTER_SANITIZE_URL);
        $controller_name = ucfirst($controller) . "Controller";

        if (isset($_GET['action'])) {
            $action_name = filter_var($_GET['action'], FILTER_SANITIZE_URL);
        }

        return [
            "controller" => $controller_name,
            "action" => $action_name,
        ];
    }
}
