<?php

/*
 * Base Controller
 * Loads the views and the models
 */

abstract class Controller {
    protected $_model;

    // Load the model
    public function model($model) {
        // Require the model file
        require_once 'models/' . $model . '.php';

        // Instantiate new model object
        return new $model();
    }

    // Load the view
    abstract public function index(): void;
}
