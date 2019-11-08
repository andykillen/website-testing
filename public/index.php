<?php

require("../vendor/autoload.php");

use App\WebService\Save;
use App\WebSite\Show;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $save = new Save();
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $show = new Show();
} else {
    header('HTTP/1.0 403 Forbidden');
    echo 'You\'re not really doing the right things are you here?  don\'t do it again';
}

