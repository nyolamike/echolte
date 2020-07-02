<?php
    

    function starts_with($string, $query){
        return substr($string, 0, strlen($query)) === $query;
    }

    function contains($string,$query){
        //https://stackoverflow.com/questions/4366730/how-do-i-check-if-a-string-contains-a-specific-word
        if (strpos($string, $query) !== false) {
            return true;
        }
        return false;
    }

    function process_inline_varaibles($temp_line){
        //replace $variable with "+ $variable + " 
        //from observation, these end with " or white space
        //e.g $icon" or $icon <br/>
        $var_names = [];
        //prepare for this operation
        $preparator = "*>";
        $temp_line_edit = $temp_line;
        $temp_line_edit = str_replace("$","$".$preparator,$temp_line_edit);
        $parts = explode("$",$temp_line_edit);
        for ($i=0; $i < count($parts); $i++) { 
            $part = $parts[$i];
            if(starts_with($part,$preparator) == false){
                continue; //this is not an  inline variable
            }
            $part = str_replace($preparator,"",$part);
            //get the position now of the first non-alpha numeric character apert from _
            //https://stackoverflow.com/questions/44480972/find-the-first-occurrence-of-non-alphanumeric-character-in-a-string
            $temp_string  = str_replace("_","a",$part);
            preg_match('/[\W]+/', $temp_string, $match, PREG_OFFSET_CAPTURE);
            $position = (count($match) == 0)? -1 : intval($match[0][1]);
            if($position == -1){
                //the entire part is the varaible name
                $var_name = "$" . $part;
                array_push($var_names,$var_name);
            }else{
                //https://stackoverflow.com/questions/3449348/separate-string-in-two-by-given-position
                $begin = substr($part, 0, $position);
                $var_name = "$" . $begin;
                array_push($var_names,$var_name);
            }
        }
        //var_dump($var_names);
        for ($i=0; $i < count($var_names); $i++) { 
            $var_name = $var_names[$i];
            $rep = '+-+ '.$var_name.' -+-';
            //print_r($rep);
            $temp_line = str_replace($var_name,$rep,$temp_line);
        }
        return $temp_line;
    }

    //echo_table_utils.js - render_table_utils.php
    //
    function make($outputfile="echo.js"){
        $extacted_functions = array();
        $temp_code = "";
        //read in contents of the render file
        $handle = fopen("../render.php", "r");
        if ($handle) {
            $eod_started = false;
            $eod_varibale = "";
            while (($line = fgets($handle)) !== false) {
                // process the line read.
                $temp_line = $line;
                $trimed_line = trim($temp_line);

                //<<<EOD
                if( contains($trimed_line,"<<<EOD") && contains($trimed_line,"=") ){
                    $eod_started = true;
                    //replace <<<EOD with  "";
                    $temp_line = str_replace("<<<EOD","\"\";",$temp_line);
                    //pick the eod variable
                    $eod_varibale = explode("=",$trimed_line)[0];
                }elseif( contains($trimed_line,"EOD;") ){
                    $eod_started = false;
                    $eod_varibale = "";
                    //skip
                    continue;
                }elseif($eod_started == true){
                    //remove white space at end of line
                    //https://stackoverflow.com/questions/3530099/remove-trailing-newline
                    $temp_line = rtrim($temp_line);
                    //replace $variable with "+ $variable + " 
                    if( contains($trimed_line,"$") ){
                        //from observation, these end with " or white space
                        //e.g $icon" or $icon <br/>
                        $temp_line = process_inline_varaibles($temp_line);
                    }
                    $temp_line = str_replace("+-+","'+",$temp_line);
                    $temp_line = str_replace("-+-","+'",$temp_line);
                    
                    $temp_line = $eod_varibale . " += '" . $temp_line . "';" . "\n";
                }



                if($trimed_line == "<?php" || $trimed_line == "?>"){
                    //ignore
                    continue;
                }

                if(starts_with($trimed_line,"include(")){
                    //nyd
                    //ignore includes for now
                    //ideally we are supposed to process and out put these ones also
                    //and have the files in the same folder
                    continue;
                }

                if(starts_with($trimed_line,"function ")){
                    $parts_temp = explode("(", $temp_line);
                    $func_name = trim(str_replace("function ","",$parts_temp[0]));
                    //save to funcitons array
                    array_push($extacted_functions, $func_name);
                }

                if(starts_with($trimed_line,"echo ")){
                    $temp_line = str_replace("echo ","echo (",$temp_line);
                    $temp_line = str_replace(";",");",$temp_line);
                }

                if( contains($trimed_line,".=") ){
                    $temp_line = str_replace(".=","+=",$temp_line);
                }

                if( contains($trimed_line,"\".") ){
                    $temp_line = str_replace("\".","\"+",$temp_line);
                }

                if( contains($trimed_line," . ") && 
                    !contains($trimed_line,'if(is_string($arg) && starts_with($arg, ".")){')  &&
                    !contains($trimed_line,'$css =  trim($arg,".")+" ";') 
                    ){
                    //nyd
                    //make plans to remove fix ie. those and conditions
                    $temp_line = str_replace(" . "," + ",$temp_line);
                }

                if( contains($trimed_line,".\"") ){
                    $temp_line = str_replace(".\"","+\"",$temp_line);
                }



                //[//so
                if( contains($trimed_line,"[//so") ){
                    $temp_line = str_replace("[//so","{//so",$temp_line);
                }

                if( contains($trimed_line,"=>") ){
                    $temp_line = str_replace("=>",":",$temp_line);
                }

                //]);//eo
                if( contains($trimed_line,"]);//eo") ){
                    $temp_line = str_replace("]);//eo","});//eo",$temp_line);
                }elseif( contains($trimed_line,");//eo") ){ //);//eo
                    $temp_line = str_replace(");//eo","};//eo",$temp_line);
                }

                //$_SERVER['REQUEST_URI']
                if( contains($trimed_line,"_SERVER['REQUEST_URI']") ){
                    $temp_line = str_replace("_SERVER('REQUEST_URI')","",$temp_line);
                }

                //func_get_args
                if( contains($trimed_line,"func_get_args") ){
                    $temp_line = str_replace("func_get_args()","func_get_args(arguments)",$temp_line);
                }
                if( contains($trimed_line,"func_num_args") ){
                    $temp_line = str_replace("func_num_args()","func_num_args(arguments)",$temp_line);
                }

                

                

                $temp_code .= $temp_line;
            }

            $temp_code = str_replace("elseif","else if",$temp_code);
            $temp_code = str_replace("substr","echo_substr",$temp_code);
            //paths ="+./
            $temp_code = str_replace('+./','/',$temp_code);//due to ome process above
            



            fclose($handle);

            //save to output file
            file_put_contents($outputfile, $temp_code);
            echo $temp_code;
        } else {
            // error opening the file.
            echo "Error openning input source file";
        } 
    }  

    make();
?>