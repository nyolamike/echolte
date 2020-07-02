<?php
    include("master_page.php");

    $tag_name = "Html";
    echo_example_code(
        get_title($tag_name),
        array(),
        basename(__FILE__, '.php') . "_code.php",
        "This code is used to render a header tag",
        get_left_title($tag_name)
    );
?>