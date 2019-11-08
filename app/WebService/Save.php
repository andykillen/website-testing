<?php

namespace App\WebService;

class Save{

    protected $db;

    function __construct()
    {
        $client = new MongoDB\Client(
            'mongodb+srv://<username>:<password>@<cluster-address>/test?retryWrites=true&w=majority'
        );
        
        $this->db = $client->test;
    }

    function add()
    {

    }

}