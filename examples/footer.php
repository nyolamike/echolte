<?php
    //nyd write an aritcle on this setting up prettier and 
    //the hussles you went through and the time 
    //the unfined docs, the angular conversrion mess etc
    $footer = footer(".main-footer",
        strong(
            "Copyright &copy; ".date("Y"). " Nesiga."
        )
        ."&nbsp;&nbsp;All rights reserved."
        .div(".float-right d-none d-sm-inline-block",
            "Maintained by <a href=\"https://nesiga.com/\">Nesiga</a>. An acing fintech company | <b>Version</b> 1.0.0"
        )
    )
    .script_link("Prettier","https://unpkg.com/prettier@1.16.4/standalone.js")
    .script_link("Prettier Html Parser Plugin","https://unpkg.com/prettier@1.16.4/parser-html.js")
    .script_link("Google JavaScript code prettifier","https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?autorun=false")
    .script_link("jQuery","../../plugins/jquery/jquery.min.js")
    .script_link("jQuery Easing","../../dist/js/jquery.easing.min.js")
    .script_link("Bootstrap 4","../../plugins/bootstrap/js/bootstrap.bundle.min.js")
    .script_link("AdminLTE","../../dist/js/adminlte.js")
    .script_link("appliaction js","app.js");


?>

