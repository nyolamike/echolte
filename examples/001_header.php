<?php
    include("master_page.php");

    $tag_name = "Header";
    echo_example_code(
        get_title($tag_name),
        array(),
        basename(__FILE__, '.php') . "_code.php",
        get_left_title($tag_name)
    );
?>