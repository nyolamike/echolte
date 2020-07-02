<?php
    $plugins = "../../plugins/";
    $dist = "../../dist/css/";
    $lib = "../css/";
    $header = head(
        meta_standard()
        .title($app_name)
        .style_link("Font Awesome Icons", $plugins."fontawesome-free/css/all.min.css")
        //.style_link("IonIcons ", "http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css")
        .style_link("icheck bootstrap ", $plugins."icheck-bootstrap/icheck-bootstrap.min.css")
        .style_link("Theme style ", $dist."adminlte.min.css")
        .style_link("Google Font: Source Sans Pro  ", "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700")
        .style_link("Echo Css", $lib."echo.css")
        .style_link("app ","app.css")
    ); 
    $app_name = "Echolte V1. Docs";
    
?>