<?php //sphp
    include_once("../php/echo.php");

    $plugins = "../../plugins/";
    $dist = "../../dist/css/";
    $lib = "../css/";

    
    echo  
        head(
            meta_standard()
            .title($app_name)
            .style_link("Font Awesome Icons", $plugins."fontawesome-free/css/all.min.css")
            //.style_link("IonIcons ", "http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css")
            .style_link("icheck bootstrap ", $plugins."icheck-bootstrap/icheck-bootstrap.min.css")
            .style_link("SweetAlert2 ", $plugins."weetalert2-theme-bootstrap-4/bootstrap-4.min.css")
            .style_link("Toastr ", $plugins."toastr/toastr.min.css")
            .style_link("Theme style ", $dist."adminlte.min.css")
            .style_link("Google Font: Source Sans Pro  ", "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700")
            .style_link("Echo Css", $lib."echo.css")
            .style_link("Echo Menu ", $lib."cssmenu.css")
            .style_link("Echo Multistep Form ", $lib."mutli_step_form.css")
            .style_link("app ","app.css")
        ); 

//ephp?>