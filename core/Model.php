<?php

/*
 * Base Model
 * Interacts with the database
 */

abstract class Model {

    protected Database $_db;

    abstract function index(): void;

}
