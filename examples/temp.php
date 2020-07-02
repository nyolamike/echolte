
    <div class="row">
        <div class="col-2 menu-container">
            <div>
                <a href=""></a>
            </div>
        </div>
        <div class="col-10">
            <div class="row">
                <div class="col-6">
                    <p>
                        This code is used to render a header tag
                    </p>
                    <pre class="prettyprint lang-php">
                        <?php 
                            //https://stackoverflow.com/questions/35802734/output-some-php-code-into-a-html-code-tag/35802860
                            //https://stackoverflow.com/questions/2820453/display-html-snippets-in-html
                            $sc_original = file_get_contents("001 header code.php"); 
                            $sc = str_replace("<?php","\n&lt;?php",$sc_original);
                            $sc = str_replace("?>","?&gt;\n",$sc);
                            echo $sc;
                        ?>
                    </pre>
                </div>
                <div class="col-6">
                    <p>
                        It prints this output
                    </p>
                    <pre class="prettyprint" id="output">
                <?php 
                    $pre = str_replace("<?php //sphp","",$sc_original);
                    $pre = str_replace("//ephp?>","",$pre);
                    $pre = str_replace("echo ",'$eval_value = ',$pre);
                    //echo $pre;
                    eval($pre);
                    echo htmlentities($eval_value);
                ?>
            </pre>
                </div>
            </div>
        </div>
    </div>



    <script>
    addEventListener('load', function(event) {
        var dirtyEscapedCode = document.getElementById("output").innerHTML;
        console.log("dec", dirtyEscapedCode);
        var dirtyCode = unEscapeHtml(dirtyEscapedCode);
        console.log("dc", dirtyCode);
        var formatedCode = prettier.format(dirtyCode, {
            parser: "html",
            plugins: prettierPlugins
        });
        console.log("formatedCode");
        console.log(formatedCode);
        var escapedFormatedCode = escapeHtml(formatedCode);
        console.log("escapedFormatedCode");
        console.log(escapedFormatedCode);
        document.getElementById("output").innerHTML = escapedFormatedCode;
    }, false);

    