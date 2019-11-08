<?php

namespace App\WebSite;

class Show {

    public $title;
    function __construct()
    {
        $this->title = 'web testing collection service';
        $this->loadTemplate();
    }

    function loadTemplate()
    {
        $file = "../views/home.php";
        if(file_exists($file)) {
            include $file;
        } else {
            echo 'bollocks';
        }


    }

    function setVars()
    {

    }
}