<?php
    include('Requests-1.7.0/library/Requests.php');
    // Next, make sure Requests can load internal classes
    Requests::register_autoloader();
    
    //make a get request
    function bee_get(){
        // Now let's make a request!
        $request = Requests::get(BEE_URL, array('Accept' => 'application/json'));
        // Check what we received
        var_dump($request);
        //nyd
        //complete this functions logic
    }

    //nyd
    //define other methods like
    //post, update, delete, upload etc
?>  