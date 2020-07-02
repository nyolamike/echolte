<?php
    //nyd
    //write article/post of me using echolte to
    //write a doc site for the echolte library
    include("../php/echo.php"); 
    include("header.php");
    include("footer.php");

    function echo_page($heading="",$crumps=array(),$page_content=""){
        global $header;
        global $footer;
        global $app_name;

        if($page_content=="" && (is_array($crumps) && count($crumps) == 0) ||  (is_string($crumps) && strlen($crumps) == 0)){
            //then only thre heading was passed in
            //so this becomes the page content
            //e.g echo_page("hello world"); //hello world is the content
            $page_content= $heading;
            $heading = "";
        }elseif($page_content=="" && $crumps != array()){
            //echo_page("This Page","hello world");
            //here pagecontent is provided by the crumps param
            $page_content= $crumps;
            $crumps = array();
        }

        $crump_text = "";
        if(is_array($crumps) && count($crumps) > 0){
            $crump_text = $crumps;
        }else{
            $crump_text = $crumps;
        }

        $page_header_text = "";
        if(strlen($heading) == 0 && (is_array($crumps) && count($crumps)==0)){
            $page_header_text = ""; //no header
        }else{
            $page_header_text = fluid_content_container_header($heading,$crump_text);
        }

        $body = main_page_standard(array(
            "show_user" => false,
            "app_name" => $app_name,
            "menu" => 
                menu_item_dropdown("Html Tag","code",
                    menu_item("Html Tag","000_html.php","dot")
                    .menu_item("Html Tag Eg2","000_html2.php","dot")
                    .menu_item("Html Tag Eg3","000_html3.php","dot")
                )
                .menu_item("Header Tag","001_header.php","tachometer-alt"),
            "nav_bar_right_items" => li(".nav-item", a("","Github","nav-link")),
            "content" => $page_header_text
            .fluid_content_container(
                $page_content
            ) 
        ));
    
        echo 
            html($header,$body,$footer);
    }

    function get_left_title($tag_name){
        return "This code is used to render a ". strtolower($tag_name) ." tag";
    }

    function get_title($tag_name){
        return "The ".$tag_name." Tag";
    }
    
    function echo_example_code($title="",$crumps=array(),$echo_code_file="",
        $left_title="",
        $right_title="This code is the output html source code"){
        global $app_name;
        $crumps = array(); //array(["Home","#"],["Header"]);

        //https://stackoverflow.com/questions/35802734/output-some-php-code-into-a-html-code-tag/35802860
        //https://stackoverflow.com/questions/2820453/display-html-snippets-in-html
        $echo_code= file_get_contents($echo_code_file); 
        $cleaned_echo_code = str_replace("<?php","\n&lt;?php",$echo_code);
        $cleaned_echo_code = str_replace("?>","?&gt;\n",$cleaned_echo_code);

        $trimed_echo_code = str_replace("<?php //sphp","",$echo_code);
        $trimed_echo_code = str_replace("//ephp?>","",$trimed_echo_code);
        $trimed_echo_code = str_replace("echo ",'$eval_value = ',$trimed_echo_code);
        //echo $trimed_echo_code;
        eval($trimed_echo_code);
        $cleaned_trimed_echo_code = htmlentities($eval_value);

        $cnt = row(
            col(6,
                p($left_title)
                .pre(".prettyprint lang-php code-prev",$cleaned_echo_code)
            )
            .col(6,
                p($right_title)
                .pre(".prettyprint lang-html code-prev","#output",$cleaned_trimed_echo_code)
            )
        );
        echo_page(
            $title,
            $crumps,
            $cnt
        );
    }
    
    
?>
