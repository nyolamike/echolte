<?php

    include("echo_constants.php");
    include("echo_table_utils.php"); //table functions
    include("echo_bee.php");  //http library to make requests against bee
    
    function input($type,$id,$text="",$place_holder="",$icon="",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>".$note."</small></div>" : "";
        if(strlen($icon) > 0){
            $icon = <<<EOD
<div class="input-group-append">
    <div class="input-group-text">
        <span class="fas fa-$icon"></span>
    </div>
</div>
EOD;
        }

        $id = strlen($id) > 0 ? $id : "input_" . rand(566,9999);

        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";

        if(strlen($error_msg) > 0){
            $cls .= " is-invalid";
        }
        
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";
       

        $str = <<<EOD
<div class="mb-4 text-left">
    $note
    <div class="input-group $cls">
        <div class="input-group-prepend">
        <div class="input-group-text">
            $text
        </div>
        </div>
        <input type="$type" $is_enabled_str  class="form-control $clearable $loader" id="$id" data-default="$val" value="$val" placeholder="$place_holder">
        $icon
    </div>
    <span class="error-span" id="error-span-$id">$error_msg</span>
</div>
EOD;
       return $str; 
    }//ef

    function text_input($id,$text="",$place_holder="",$icon="",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
       return input("text",$id,$text,$place_holder,$icon,$note,$cls,$val,$is_enabled,$error_msg);
    }

    function number_input($id,$text="",$place_holder="",$icon="",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        return input("number",$id,$text,$place_holder,$icon,$note,$cls,$val,$is_enabled,$error_msg);
     }

    function date_input($id,$text="",$place_holder="",$icon="calendar",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        return input("date",$id,$text,$place_holder,$icon,$note,$cls,$val,$is_enabled,$error_msg);
    }

    function email_input($id,$text="",$place_holder="",$icon="envelope",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        return input("email",$id,$text,$place_holder,$icon,$note,$cls,$val,$is_enabled,$error_msg);
    }

    function password_input($id,$text="",$place_holder="",$icon="lock",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        return input("password",$id,$text,$place_holder,$icon,$note,$cls,$val,$is_enabled,$error_msg);
    }

    function search_input($id,$onclick="",$text="",$place_holder="",$icon="search",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        if(strlen($onclick) != 0){
            $onclick = "onclick=".$onclick."";
        } 
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>".$note."</small></div>" : "";
        if(strlen($icon) > 0){
            $icon = <<<EOD
<div class="input-group-append">
    <button type="button" $onclick class="btn btn-primary disable-on-loader ">
        <span class="fas fa-$icon"></span>
    </button>    
</div>
EOD;
        }

        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";
        

        if(strlen($error_msg) > 0){
            $cls .= " is-invalid";
        }

        $str = <<<EOD
<div class="mb-4 text-left">
$note
<div class="input-group $cls">
    <div class="input-group-prepend">
    <div class="input-group-text">
        $text
    </div>
    </div>
    <input type="text" $is_enabled_str  class="form-control  $clearable $loader" id="$id" data-default="$val"  value="$val" placeholder="$place_holder">
    $icon
</div>
<span class="error-span" id="error-span-$id">$error_msg</span>
</div>
EOD;
       return $str; 
    }


    function select_input($items,$id,$text="",$place_holder="",$icon="list",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>".$note."</small></div>" : "";
        $options = "";
        for ($i=0; $i < count($items); $i++) { 
            $tem_val = $items[$i][0];
            $is_selected = false;
            if(strval($tem_val) == $val){
                $is_selected = true;
            }
            $options .= select_item($tem_val,$items[$i][1],$is_selected);
        }
        if(strlen($error_msg) > 0){
            $cls .= " is-invalid";
        }
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";

        $str = <<<EOD
<div class="mb-4 text-left">
        $note
<div class="input-group  $cls">
    <div class="input-group-prepend">
        <div class="input-group-text">
            $text
        </div>
    </div>
    <select class="select form-control $clearable $loader " data-default="$val"   $is_enabled_str  id="$id" placeholder="$place_holder">
        $options
    </select>
    <div class="input-group-append">
        <div class="input-group-text">
            <span class="fas fa-$icon"></span>
        </div>
    </div>
    
    
</div>
<span class="error-span" id="error-span-$id">$error_msg</span>
</div>
EOD;
       return $str;
    }


    function select_item($value,$text,$is_selected=false){
        $s = ($is_selected == true)? "selected='true'" : "";
        return "<option value=\"".$value."\" ".$s." >".$text."</option>";
    }

    function textarea_input($id,$text="",$place_holder="",$icon="list",$note="",$cls="",$rows=3,$val="",$error_msg="",$is_enabled=true){
        
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>".$note."</small></div>" : "";
        if(strlen($error_msg) > 0){
            $cls .= " is-invalid";
        }
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";

        $str = <<<EOD
<div class="mb-4 text-left $cls">
    $note
    <div class="input-group mb-0">
        <div class="input-group-text render_text_area_input">
            $text
        </div>
        <div class="input-group-append render_text_area_input">
            <div class="input-group-text ">
                <span class="fas fa-$icon"></span>
            </div>
        </div>
    </div>
    <textarea class="form-control ace-tr-0 $clearable $loader" data-default="$val" $is_enabled_str rows="$rows" id="$id" placeholder="$place_holder">$val</textarea>
    <span class="error-span" id="error-span-$id">$error_msg</span>
</div>

EOD;
       return $str; 
    }

    function checkbox($id,$value,$text,$name="",$icon="list",$place_holder="",$note="",$cls="",$error_msg="",$is_enabled=true){

        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>".$note."</small></div>" : "";
        if(strlen($error_msg) > 0){
            $cls .= " is-invalid";
        }
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";
        

        $str = <<<EOD
<div class="mb-4 text-left">
    $note
    <div class="icheck-primary d-inline $cls">
        <input type="checkbox" id="$id" class="$clearable $loader" data-default="$value"  name="$name" $is_enabled_str value="$value" >
        <label for="$id">$text</label>
    </div>
    <span class="error-span" id="error-span-$id">$error_msg</span>
</div>
EOD;
        return $str;
    }

    function starts_with($string, $query){
        return substr($string, 0, strlen($query)) === $query;
    }

    function make_text($numargs,$arg_list,$context=""){
        $text = "";
        $css= "";
        $id= "";
        $attrs = "";
        for ($i = 0; $i < $numargs; $i++) {
            $arg = $arg_list[$i];
            if(is_string($arg) && starts_with($arg, ".")){//make_edit
                $css =  trim($arg,".")." "; //make_edit
            }elseif(is_string($arg) && starts_with($arg, "#")){
                $id =  trim(trim($arg,"#"));
            }elseif(is_string($arg) && starts_with($arg, "@")){
                $attrs .=  trim($arg,"@");
            }elseif(is_array($arg) && $context == "tr" ){
                $text .=  make_td_from_array($arg);
            }else{
                if($context == "tr"){
                    $text .= starts_with($arg,"<td")? $arg : td($arg);
                }else{
                    $text .= $arg;
                }
            }
        }
        
        return array($text,$css,$id,$attrs);
    }

    function row(){
        $items = make_text(func_num_args(),func_get_args());
        $text = $items[0];
        $css = $items[1];
$str = <<<EOD
<div class="row $css">
    $text
</div>
EOD;
        return $str;
    }

    function col(){
        $num = "-12";
        $numargs = func_num_args();
        $arg_list = func_get_args();
        if($numargs >= 1){
            $first_arg = $arg_list[0];
            $num = "-" . $first_arg;
            $numargs = $numargs - 1;
            $arg_list = array_slice($arg_list,1);
            //var_dump($arg_list);
        }
        $items = make_text($numargs,$arg_list);
        $text = $items[0];
        $css = $items[1];
        $str = <<<EOD
<div class="col$num $css">
    $text
</div>
EOD;
        return $str; 
    }

    function button($id,$onclick="",$text="",$cls="",$is_enabled=true){
        if(strlen($onclick) != 0){
            $onclick = "onclick=".$onclick."";
        }   
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";     
        $str = <<<EOD
<button type="button" $onclick id="$id" 
    class="btn btn-primary $loader  $cls " $is_enabled_str >$text</button>
EOD;
        return $str;  
    }


    function button_block($id,$onclick="",$text="",$cls=""){
        return button($id,$onclick,$text="","btn-block " . $cls);
    }

    function img($src="",$cls="",$alt="",$style="",$id=""){ 
        $id= strlen($id) > 0 ? "id=\"".$id."\"" : "";
        $str = <<<EOD
<img src="$src" class="$cls" alt="$alt" style="$style" $id />
EOD;
        return $str;  
    }

    function img_item($src="",$items){ 
        $text = "";
        for ($i=0; $i < count($items); $i++) { 
            $temp = "<div class=\"item-text-row\">";
            $temp .= "  " . $items[$i];
            $temp .= "</div>";
            $text .= $temp;
        }
        $str = <<<EOD
<div class="ace-image-item">
    <div class="image">
        <img src="$src" >
    </div>
    <div class="item-text-rows">
        $text
    </div>
</div>
EOD;
        return $str;  
    }

    

    function nav(){
        $items = make_text(func_num_args(),func_get_args());
        $text = $items[0];
        $css = $items[1];
        $attr = $items[3];
        $id = $items[2];
        $id = strlen($items[2])>0? "id=\"".$id."\"": "";
$str = <<<EOD
<nav $id class="$css" $attr >
    $text
</nav>
EOD;
        return $str;
    }

    function a($href="",$text="",$cls="",$id=""){
        $id = strlen($id) > 0 ? "id=\"". $id . "\"" : "";
        $href = strlen($href) > 0 ? "href=\"".$href."\"" : "";
$str = <<<EOD
<a $href class="$cls" $id>$text</a>
EOD;
        return $str;
    }

    function div(){
        $items = make_text(func_num_args(),func_get_args());
        $text = $items[0];
        $css = $items[1];
        $attr = $items[3];
        $id = $items[2];
        $id = strlen($items[2])>0? "id=\"".$id."\"": "";
$str = <<<EOD
<div $id class="$css" $attr >
    $text
</div>
EOD;
        return $str;
    }

    function title($text){
$str = <<<EOD
<title>
    $text
</title>
EOD;
        return $str;
    }

    function html($header="",$body="",$footer=""){
        $header = trim($header);
        $body = trim($body);
        $footer = trim($footer);
        $text = "";
        if(strlen($body) == 0 && strlen($footer) == 0){
            //only the header param was provided which 
            //means the header becomes the text 
            $text = $header;
        }elseif(strlen($body) > 0 || strlen($footer) > 0){
            //then both the header and the body have been provided
            //process header
            if(starts_with($header,"<head") == false){
                $header = "<head>" . $header . "</head>";
            }

            if(starts_with($body,"<body") == false){
                //supply the default echolte body tag
                $body = "<body class=\"hold-transition\">" . $body . $footer . "</body>";
            }else{
                //try to fit in the footer
                $body = str_replace("</body>",$footer . "</body>",$body);
            }
            $text = $header . $body;
        }
        $str = <<<EOD
<!DOCTYPE html>
<html>
$text
</html>
EOD;
        return $str;    
    }

    function head($text=""){
$str = <<<EOD
    <head>
        $text
    </head>
EOD;
        return $str;
    }

    function body(){
        //adds a body tag with the standard hold-transition clas
        $items = make_text(func_num_args(),func_get_args());
        $text = $items[0];
        $css = $items[1];
        $attr = $items[3];
        $id = $items[2];
        $id = strlen($items[2])>0? "id=\"".$id."\"": "";
        
$str = <<<EOD
<body $id class="hold-transition $css" $attr >
    $text
</body>
EOD;
        return $str;
    }

    function meta_standard(){
        $str = <<<EOD
        <meta charset="utf-8">
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
EOD;
        return $str;
    }

    function main_page_standard($props){
        $show_user = array_key_exists("show_user",$props) ? $props["show_user"] : true;
        $show_nav_bar_menu = array_key_exists("show_nav_bar_menu",$props) ? $props["show_nav_bar_menu"] : true;
        $show_nav_bar_right_menu = array_key_exists("show_nav_bar_right_menu",$props) ? $props["show_nav_bar_right_menu"] : true;
        $nav_bar_right_items = array_key_exists("nav_bar_right_items",$props) ? $props["nav_bar_right_items"] : "";
        $content = array_key_exists("content",$props) ? $props["content"] : "";
        $app_name = array_key_exists("app_name",$props) ? $props["app_name"] : "";
        $menu = array_key_exists("menu",$props) ? $props["menu"] : "";
        $user_panel = "";
        $user_panel = div(".user-panel mt-3 pb-3 mb-3 d-flex",
            div(".image",
                img("../img/user-avatar.png","img-circle elevation-2","User Image","","panel_user_image")
            )
            .div(".info",
                a("#","Nyola Mike","d-block","panel_user_name")
            )
        );
        if($show_user == false){
            $user_panel = "";
        }
        $nav_bar = "&nbsp;";
        if($show_nav_bar_menu == false){
            $nav_bar = "";
        }else{
            $nav_bar = ul(".navbar-nav","");
        }

        $nav_bar_right = "";
        if($show_nav_bar_right_menu == false){
            $nav_bar_right = "";
        }else{
            $nav_bar_right = ul(".navbar-nav ml-auto",$nav_bar_right_items);
        }

        $str = 
        div(".wrapper",
            nav(".main-header navbar navbar-expand navbar-white navbar-light",
                $nav_bar
                .$nav_bar_right
            )
            .aside(".main-sidebar sidebar-dark-primary elevation-4",
                a("#",
                    img("../img/logo.png","brand-image img-circle elevation-3","Logo","opacity: .8; float:none;")
                    .span(".brand-text font-weight-light",strtoupper($app_name))
                ,"brand-link text-center")
                .div(".sidebar",
                    $user_panel
                    .div(".mt-2",
                        ul( 
                            ".nav nav-pills nav-sidebar flex-column",
                            '@data-widget="treeview" role="menu" data-accordion="false"',
                            $menu
                        )
                    )
                )
            )   
            .div(".content-wrapper",$content)
        );
        return $str;
    }

    function icon($name){
$str = <<<EOD
<i class="fa fa-$name"></i>
EOD;
        return $str;
    }

    function image_uploader($id,$text,$src="/dist/img/placeholder.png",$cls="",$footer_text=""){
        $str = <<<EOD
        <div class="ace-image-uploader mb-3 $cls">
            <div class="input-group mb-0">
                <div class="input-group-text render_text_area_input">
                    $text
                </div>
                <div class="input-group-append render_text_area_input upload-btn">
                    <div class="input-group-text ">
                        <span class="fas fa-camera"></span>&nbsp;click to upload
                    </div>
                </div>
            </div>
            <div class="image-holder">
                <img src="$src" class="image-uploader-image" />
                <div class="image-holder-overlay d-none">
                    <div class="text-bold pt-2">
                        <i class="fas fa-3x fa-sync-alt fa-spin"></i> <br/>
                        uploading...
                    </div>
                </div>
            </div>
            <div class="image-footer">
                <div class="image-footer-text">
                    $footer_text                                                                                                                                                            
                </div>
                <div class="image-footer-clear-btn">
                    <span class="fas fa-times-circle"></span>&nbsp;clear image
                </div>
            </div>
            <input type="file" class="fileinput"  />
            <input type="hidden" class="fileinput-value" id="$id"  value="$src" />
        </div>
EOD;
        return $str;
    }

    function user_preview_item($key,$value="",$id=""){
        $id = (strlen($id) > 0)? " id='$id' " : "";
        $str = <<<EOD
<li class="nav-item" $id >
    <a href="#" class="nav-link">
        <div class="float-left key" >$key</div>
        <div class="float-right val">$value</div>
        <div style="clear:both"></div>
    </a>
</li>
EOD;
        return $str;
    }


    function user_preview($src="../dist/img/user7-128x128.jpg",$title="",$sub_title="",$items=array(),$class_name="user-preview"){   
        $temp = _ace_user_preview_helper($src,$title,$sub_title,$items,$class_name);
        $str = <<<EOD
<div class="card-widget widget-user-2 $class_name">
    $temp
</div>
EOD;
        return $str;
    }

    function user_preview_card($src="../dist/img/user7-128x128.jpg",$title="",$sub_title="",$items=array(),$class_name="user-preview"){
        $temp = _ace_user_preview_helper($src,$title,$sub_title,$items,$class_name);
        $str = <<<EOD
<div class="card card-widget widget-user-2 $class_name">
    $temp
</div>
EOD;
        return $str;
    }

    function _ace_user_preview_helper($src="../dist/img/user7-128x128.jpg",$title="",$sub_title="",$items=array(),$class_prefix="user-preview"){
        $items_str = "";
        for ($i=0; $i < count($items); $i++) { 
            $item = $items[$i];
            $item_id = "";
            if(count($item) > 2){
                $item_id = $item[2];
            }
            $items_str .=  user_preview_item($item[0],$item[1],$item_id);
        }
        $str = <<<EOD
<!-- Add the bg color to the header using any of the bg-* classes -->
<div class="widget-user-header bg-warning $class_prefix-header">
    <div class="widget-user-image">
        <img class="img-circle elevation-2 $class_prefix-image" src="$src"
            alt="User Avatar">
    </div>
    <!-- /.widget-user-image -->
    <h3 class="widget-user-username"><strong class="$class_prefix-title">$title</strong></h3>
    <h5 class="widget-user-desc $class_prefix-subtitle">$sub_title</h5>
</div>
<div class="card-footer p-0">
    <ul class="nav flex-column">
        $items_str
    </ul>
</div>
EOD;
        return $str;
    }

    function user_profile_card_item($key="", $value="", $icon="", $lmen_class=""){
        $str = <<<EOD
        <div class="user-profile-card-header-item $lmen_class">
            <i class="fas fa-$icon"></i>
            <span class="key-display">$key</span>
            <span>:<b> $value</b></span>
        </div>
EOD;
        return $str;
    }

    function user_profile_item($key,$value="",$icon="",$lmen_class=""){
        $str = <<<EOD
        <li class="nav-item user-profile-item $lmen_class">
           <div class="icon"><i class="fas fa-$icon"></i></div>
           <div class="key">$key</div>
           <div class="value text-right">$value</div>
        </li>
EOD;
        return $str;
    }

    function user_profile_card($src="../dist/img/user7-128x128.jpg",$header_items=array(),$profile_items=array()){
        $title = "";
        $header_text = "";
        for ($i=0; $i <  count($header_items); $i++) { 
           $header_text_item = $header_items[$i];
           if(is_array($header_text_item)){
                $cls = count($header_text_item)>3? $header_text_item[3]: "";
                $header_text .= user_profile_card_item($header_text_item[0],$header_text_item[1],$header_text_item[2],$cls);
           }else{
                $header_text .= $header_text_item;
           }
        }
        $profile_body = "";
        for ($i=0; $i <  count($profile_items); $i++) { 
            $profile_item = $profile_items[$i];
            if(is_array($profile_item)){
                 $cls = count($profile_item)>3? $profile_item[3]: "";
                 $profile_body .= user_profile_item($profile_item[0],$profile_item[1],$profile_item[2],$cls);
            }else{
                 $profile_body .= $profile_item;
            }
         }
        $str = <<<EOD
<div class="card card-widget widget-user-2 ">
    <!-- Add the bg color to the header using any of the bg-* classes -->
    <div class="widget-user-header user-profile-card-header ">
        <div class="widget-user-image">
            <img class="img-square elevation-2 user-profile-card-image" src="$src" alt="User Avatar">
        </div>
        <!-- /.widget-user-image -->
        $header_text
    </div>
    <div class="card-footer p-0">
        <ul class="nav flex-column profile-body-wrapper">
            $profile_body
        </ul>
    </div>
</div>
EOD;
        return $str;
    }


    function line_graph_card($id,$title,$total,$sub_title,$chart_height){
        $canvas_id = $id . "_chart";
        $str = <<<EOD
<div class="card" id="$id">
    <div class="card-header border-0">
        <div class="d-flex justify-content-between">
            <h3 class="card-title">$title</h3>
        </div>
    </div>
    <div class="card-body">
        <div class="d-flex">
            <p class="d-flex flex-column">
                <span class="text-bold text-lg total">$total</span>
                <span class="sub_title">$sub_title</span>
            </p>
        </div>
        <!-- /.d-flex -->
        <div class="position-relative mb-4">
            <canvas id="$canvas_id" height="$chart_height"></canvas>
        </div>
    </div>
</div>
<!-- /.card -->
EOD;
        return $str;
    }

    function make_lmnt($tg,$items){
        $text = $items[0];
        $css = $items[1];
        $attr = $items[3];
        $id = strlen($items[2])>0? "id=\"".$items[2]."\"": "";
        $str = "<".$tg." ".$id." class=\"".$css."\" ".$attr." >".$text."</".$tg.">";
        return $str;
    }

    function footer(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("footer",$items);
        return $str;
    }

    function strong(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("strong",$items);
        return $str;
    }

    function td(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("td",$items);
        return $str;
    }

    function th(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("th",$items);
        return $str;
    }

    function ul(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("ul",$items);
        return $str;
    }

    function li(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("li",$items);
        return $str;
    }

    function aside(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("aside",$items);
        return $str;
    }

    function span(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("span",$items);
        return $str;
    }

    function p(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("p",$items);
        return $str;
    }

    function pre(){
        $items = make_text(func_num_args(),func_get_args());
        $str = make_lmnt("pre",$items);
        return $str;
    }

    function _xxx(){
        $items = make_text(func_num_args(),func_get_args());
        $str = $items[0];
        return $str;
    }

    function tr(){
        $items = make_text(func_num_args(),func_get_args(),"tr");
        //var_dump($items);
        $str = make_lmnt("tr",$items);
        return $str;
    }

    function make_td_from_array($data){
        $td = "";
        $text = $data[0];
        $clss = count($data)>1 ? ".".$data[1]:"";
        $col_span = count($data)>2? "@colspan=\"".$data[2]."\"" :"";
        $td .= td($text,$clss,$col_span);
        return $td;
    }

    function dashboard_table_card_row($data){
        $str = "";
        if(is_array($data)){
            $td = "";
            for ($i=0; $i < count($data); $i++) { 
                $temp = $data[$i];
                if(is_string($temp)){
                    $td .= starts_with($temp,"<td") ?$temp: td($temp);
                }elseif(is_array($temp)){
                    $td .= make_td_from_array($temp);
                }
            }
            $str = starts_with($td,"<tr") ?$td: tr($td);
        }else{
            $str = starts_with($data,"<tr") ?$data: tr($data);
        }
        return $str;
    }

    function dashboard_table_card($id,$title,$column_names,$data, $cls="", $scroll_height = ""){
        $cols = "";
        for ($i=0; $i < count($column_names); $i++) { 
            $name = $column_names[$i];
            $cols .= "<th>".$name."</th>";
        }
        $rows = "";
        if(is_array($data)){
            for ($i=0; $i < count($data); $i++) { 
                $rows .= dashboard_table_card_row($data[$i]);
            }
        }else{
            $rows = $data;
        }

        $height = strval($scroll_height)."px";
        $scroll_height_text = strlen($scroll_height) > 0 ? "style=\"height:  ".$height.";\"" : "";
        
    
        $str = <<<EOD
<div class="card" id="$id">
    <div class="card-header border-0">
        <h3 class="card-title">$title</h3>
    </div>
    <div class="card-body table-responsive p-0" $scroll_height_text >
        <table class="table table-striped table-valign-middle $cls" >
            <thead>
                <tr>$cols</tr>
            </thead>
            <tbody>
                $rows
            </tbody>
        </table>
    </div>
</div>
EOD;
        return $str;
    }

    function content_container_fluid(){
        $items = make_text(func_num_args(),func_get_args());
        $text = $items[0];
        $css = $items[1];
        return div(".content ".$css."",div(".container-fluid",$text));
    }

    function fluid_content_container(){
        $items = make_text(func_num_args(),func_get_args());
        $text = $items[0];
        $css = ".".$items[1]; //make edit
        return content_container_fluid($css,$text);
    }

    function content_container_header_fluid($title,$bread=array(),$css=""){
        $crumps = "";
        for ($i=0; $i < count($bread); $i++) { 
            $temp = $bread[$i];
            $title_ = count($temp) > 0 && is_array($temp) ? $temp[0] : $temp;
            $href = count($temp) > 1 && is_array($temp) ? $temp[1] : "";
            if($i == count($bread)-1){
                $crumps .= "<li class=\"breadcrumb-item active\">".$title_."</li>";
            }else{
                $crumps .= "<li class=\"breadcrumb-item\"><a href=\"".$href."\">".$title_."</a></li>";
            }
        }
        $str = <<<EOD
<!-- Content Header (Page header) -->
<div class="content-header $css">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0 text-dark">$title</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    $crumps
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
EOD;
        return $str;
    }

    function fluid_content_container_header($title,$bread=array(),$css=""){
        return content_container_header_fluid($title,$bread,$css);
    }

    function page_spinner(){
        return div(".page_spinner",spinner());
    }


    function info_box($id,$text="",$number="",$symbol="",$icon="cog",$bg="info"){
        $symbol = strlen($symbol) > 0 ? " <small>".$symbol."</small> ": "";
        $str = <<<EOD
<div class="info-box" id="$id">
    <span class="info-box-icon bg-$bg elevation-1"><i class="fas fa-$icon"></i></span>
    <div class="info-box-content">
    <span class="info-box-text">$text</span>
    <span class="info-box-number">
        $number
        $symbol 
    </span>
    </div>
    <!-- /.info-box-content -->
</div>
<!-- /.info-box -->
EOD;
        return $str;
    }

    function product_list_card_item($id,$image="../dist/img/default-150x150.png", $name ="", $description = "", $badge = ""){
        $str = <<<EOD
<li class="item" id="$id">
    <div class="product-img">
        <img src="$image" alt="Product Image" class="img-size-50">
    </div>
    <div class="product-info">
        <a href="javascript:void(0)" class="product-title">
            $name 
            <span class="badge badge-warning float-right">$badge</span>
        </a>
        <span class="product-description">
            $description
        </span>
    </div>
</li>
<!-- /.item -->
EOD;
        return $str;
    }

    function product_list_card($id,$title,$products,$footer_text="",$onclick="",$onclickfooter=""){
        //ministru=y of imigration services
        $products_str = "";
        for ($i=0; $i < count($products); $i++) { 
            $product = $products[$i];
            if(is_array($product)){
                $products_str .= product_list_card_item(
                    count($product) > 0 ? $product[0] : "",
                    count($product) > 1 ? $product[1] : "../dist/img/default-150x150.png",
                    count($product) > 2 ? $product[2] : "",
                    count($product) > 3 ? $product[3] : "",
                    count($product) > 4 ? $product[4] : ""
                ); 
            }else{
                $products_str .= $product;
            }
        }
        $str = <<<EOD
<!-- PRODUCT LIST -->
<div class="card" id="$id" $onclick> 
    <div class="card-header">
        <h3 class="card-title">$title</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body p-0">
        <ul class="products-list product-list-in-card pl-2 pr-2">
            $products_str
        </ul>
    </div>
    <!-- /.card-body -->
    <div class="card-footer text-center" $onclickfooter>
        <a href="javascript:void(0)" class="uppercase">$footer_text</a>
    </div>
    <!-- /.card-footer -->
</div>
<!-- /.card -->
EOD;
        return $str;
    }

    function get_menu_active_class($href=""){
        $uri = strtolower($_SERVER['REQUEST_URI']);
        $com = strtolower($href);
        $ct = false === strpos($uri, $com) ? "" : "active";
        return $ct;
    }

    function menu_item($text="Dashboard",$href="",$icon="tachometer-alt"){
        $ct = get_menu_active_class($href);
        $str = <<<EOD
<li class="nav-item">
    <a href="$href" class="nav-link $ct ">
        <i class="nav-icon fas fa-$icon"></i>
        <p>
            $text 
            <!-- <span class="badge badge-info right">6</span> -->
        </p>
    </a>
</li>
EOD;
        return $str;
    }

    function has_string($string, $search){ 
        $position = stripos($string, $search); 
        //echo $position;
        if ($position == true){ 
            return true; 
        } 
        else{ 
            return false; 
        } 
    } 

    function menu_item_dropdown($text="",$icon="tachometer-alt",$items=array()){
        $menu_items = "";
        
        if(is_array($items)){
            for ($i=0; $i < count($items); $i++) { 
                $item = $items[$i];
                if(is_array($item)){
                    $menu_items .=  menu_item($item[0],$item[1],$item[2]);
                    // $act .= get_menu_active_class($item[1]);
                }else{
                    $menu_items .=  $item; 
                }
            }
        }else{
            $menu_items = $items;
        }
        $act = "";
        $open = "";
        if( has_string($menu_items,"nav-link active") == true){
            $act = "active";
            $open = "menu-open";
        }
        $str = <<<EOD
<li class="nav-item has-treeview $open">
    <a href="#" class="nav-link $act">
        <i class="nav-icon fas fa-$icon"></i>
        <p>
            $text
            <i class="fas fa-angle-left right"></i>
        </p>
    </a>
    <ul class="nav nav-treeview">
        $menu_items
    </ul>
</li>
EOD;
        return $str;
    }


    function include_script($src){
        echo  "<script src=\"".$src."\"></script> \n";
    }

    

    function strong_image_card($src="/dist/img/placeholder.png",$body="",$footer="",$css=""){
        if(strlen(trim($footer)) > 0){
            $footer = "<div class=\"card-footer\">".$footer."</div>";
        }
        $str = <<<EOD
<div class="card $css">
    <div class="card-body">
        <div class="row">
            <div class="col-5">
                <img src="$src" />
            </div>
            <div class="body col-7">
                $body
            </div>
        </div>
    </div>  
    $footer 
</div>
<!-- /.card -->
EOD;
        return $str;
    }

    function _arg($placehoder){
        return "";
    }

    function form_card($title="",$body="",$footer="",$css="",$onsubmit="",$loader=""){
        
        if(strlen(trim($footer)) > 0){
            $footer = "<div class=\"card-footer\">".$footer."</div>";
        }

        $onsubmit_txt = "";
        if(strlen(trim($onsubmit)) > 0){
            $onsubmit_txt = "onsubmit=\"".$onsubmit."\"";
        }
        

        $str = <<<EOD
<div class="card $css">
    <div class="card-header border-0 visibility-hidden">
        <div class="d-flex justify-content-between">
            <h3 class="card-title">$title</h3>
        </div>
        $loader
    </div>
    <div class="card-body">
        <form $onsubmit_txt >
            <fieldset>
                $body
            </fieldset> 
        </form> 
    </div>  
    $footer 
</div>
<!-- /.card -->
EOD;
        return $str;
    }


    function callout($title="",$body="",$small="",$kind="default"){
        $str = <<<EOD
<div class="callout callout-$kind">
    <h5>$title <span class="float-right">$small</span></h5>
    <p>
        $body
    </p>
</div>
EOD;
        return $str;
    }

    function multi_form_page($title,$body="",$footer="",$cls=""){
        $title_text = strlen($title) > 0 ? "<h2  class=\"fs-title multi-form-page-title\">".$title."</h2>" : "";
        $str = <<<EOD
<fieldset class="$cls">
    $title_text 
    <div class="multi-form-page-fields">
        $body
    </div>
    $footer
</fieldset>
EOD;
        return $str;
    }

    function multi_form($id="msform",$progress_id="progressbar",$progress_items=array(),$pages=array(),$clas=""){
        $id = strlen($id) > 0 ? "id='".$id."'" : "id='msform'";
        $progress_id = strlen($progress_id) > 0 ? "id='".$progress_id."'" : "id='progressbar'";
        $progress_tabs = "";
        for ($i=0; $i < count($progress_items); $i++) { 
            $progress_item = $progress_items[$i];
            $cls = ($i==0)?"active":"";
            $progress_tabs .= "<li class=\"".$cls."\">".$progress_item."</li>";
        }

        $pages_text = "";
        if(is_array($pages)){
            for ($i=0; $i < count($pages); $i++) { 
                $page = $pages[$i];
                if(is_array($page)){
                    $pages_text .=  multi_form_page($page[0],$page[1],$page[2]);
                }else{
                    $pages_text .=  $page;
                }
            }
        }else{
            $pages_text = $pages;
        }
        


        
        $str = <<<EOD
        <form $id class="diplay-block $clas">
            <!-- progressbar -->
            <ul $progress_id>
                $progress_tabs
            </ul>
            <!-- fieldsets -->
            $pages_text
        </form>
EOD;
        return $str;
    }

    function card($title="",$body="",$footer="",$css=""){
        
        if(strlen(trim($footer)) > 0){
            $footer = "<div class=\"card-footer\">".$footer."</div>";
        }

        $header_text = <<<EOD
    <div class="card-header border-0 visibility-hidden">
        <div class="d-flex justify-content-between">
            <h3 class="card-title">$title</h3>
        </div>
    </div>
EOD;
        $header_text = strlen($title) > 0? $header_text : "";
        
        $str = <<<EOD
<div class="card $css">
    $header_text
    <div class="card-body">
        <form >
            <fieldset>
                $body
            </fieldset> 
        </form> 
    </div>  
    $footer 
</div>
<!-- /.card -->
EOD;
        return $str;
    }




    function business_profile_card(
        $id= "",
        $src="../dist/img/user7-128x128.jpg",
        $name="",
        $description="",
        $business_image="../dist/img/photo1.png",
        $profile_items=array(),
        $buttons = "",
        $name_key="name",
        $description_key="description"
        ){
        $title = "";
        
        $profile_body = "";
        for ($i=0; $i <  count($profile_items); $i++) { 
            $profile_item = $profile_items[$i];
            if(is_array($profile_item)){
                 $cls = count($profile_item)>3? $profile_item[3]: "";
                 $profile_body .= user_profile_item($profile_item[0],$profile_item[1],$profile_item[2],$cls);
            }else{
                 $profile_body .= $profile_item;
            }
         }
        $str = <<<EOD
<div class="row" id="$id">
    <div class="col-6 pr-0">
        <div class="card card-widget widget-user-2 btrr-0 bbrr-0 ">
            <!-- Add the bg color to the header using any of the bg-* classes -->
            <div class="widget-user-header user-profile-card-header ">
                <div class="widget-user-image">
                    <img class="img-square elevation-2 business-profile-card-logo-image" src="$src" alt="User Avatar">
                </div>
                <!-- /.widget-user-image -->
                <div class="user-profile-card-header-item">
                    <i class="fas fa-info"></i>
                    <span class="key-display">$name_key</span>:
                    <span><b>$name</b></span>
                </div>
                <div class="user-profile-card-header-item">
                    <i class="fas fa-info"></i>
                    <span class="key-display">$description_key</span>:
                    <div class="pt-10"><b>$description</b></div>
                </div>
            </div>
            <div class="card-body" style="padding-top: 23px;" >
                <img class="img-square elevation-2 business-profile-card-image" src="$business_image" alt="Business Image">
            </div>
        </div>
    </div>
    <div class="col-6 pl-0">
        <div class="card card-widget widget-user-2 bblr-0 btlr-0">
            <div class="card-body p-0">
                <ul class="nav flex-column profile-body-wrapper">
                    $profile_body 
                </ul>
            </div>
            <div class="card-footer business-profile-card-buttons">
                $buttons
            </div>
        </div>
    </div>
</div>
EOD;
        return $str;
    }

    function def_arg($key,$args,$default_value=""){
        return array_key_exists($key,$args)?$args[$key]:$default_value;
    }

    function graph_key($text,$class="text-primary"){
        $str = <<<EOD
<span class="mr-2">
    <i class="fas fa-square $class"></i> $text
</span>
EOD;
        return $str;
    }

    function bar_graph_card($args){
        $id=def_arg("id",$args);
        $id_chart = $id . "_chart";
        $title=def_arg("title",$args);
        $link=def_arg("link",$args);
        $link_text=def_arg("link_text",$args);
        $total=def_arg("total",$args);
        $sub_title=def_arg("sub_title",$args);
        $link_text = def_arg("link_text",$args);
        $sub_right_title = def_arg("sub_right_title",$args);
        $total_icon_right = def_arg("total_right_icon",$args);
        $total_right = def_arg("total_right",$args);
        $height = intval(def_arg("height",$args,100));
        $keys = def_arg("keys",$args,"");

        if(strlen($link) > 0 & starts_with($link,"<a")){
            $link_text = $link;
        }elseif(strlen($link) > 0){
            if($link_text == 0){
                $link_text = $link;
            }
            $link_text = "<a href=\"".$link."\">".$link_text."</a>";
        }elseif(strlen($link) == 0){
            $link_text = "<a href=\"javascript:void(0);\">".$link_text."</a>";
        }
        $keys_text = "";
        if(is_array($keys)){
            for ($i=0; $i < count($keys); $i++) { 
                $key = $keys[$i];
                if(is_array($key)){
                    $keys_text .= graph_key($key[0],$key[1]);
                }else{
                    $keys_text .= $key;
                }
            }
        }else{
            $keys_text = $keys;
        }
        $str = <<<EOD
<div class="card" id="$id">
    <div class="card-header border-0">
        <div class="d-flex justify-content-between">
            <h3 class="card-title">$title</h3>
            $link_text
        </div>
    </div>
    <div class="card-body">
        <div class="d-flex">
            <p class="d-flex flex-column">
                <span class="text-bold text-lg">$total</span>
                <span>$sub_title</span>
            </p>
            <p class="ml-auto d-flex flex-column text-right">
                <span class="text-success">
                    <i class="fas fa-$total_icon_right"></i> $total_right
                </span>
                <span class="text-muted">$sub_right_title</span>
            </p>
        </div>
        <!-- /.d-flex -->

        <div class="position-relative mb-4">
            <canvas id="$id_chart" height="$height"></canvas>
        </div>
        <div class="d-flex flex-row justify-content-end">
            $keys_text
        </div>
    </div>
</div>
EOD;
        return $str;
    }

    function pie_graph_card($args){
        $id=def_arg("id",$args);
        $id_chart = $id . "_chart";
        $title=def_arg("title",$args);
        $link=def_arg("link",$args);
        $link_text=def_arg("link_text",$args);
        $total=def_arg("total",$args);
        $sub_title=def_arg("sub_title",$args);
        $sub_right_title = def_arg("sub_right_title",$args);
        $total_right_icon = def_arg("total_right_icon",$args);
        $total_right = def_arg("total_right",$args);
        $height = intval(def_arg("height",$args,100));
        $keys = def_arg("keys",$args,"");
        $str = bar_graph_card([//so
            "id" => $id,
            "id_chart" => $id_chart,
            "title" => $title,
            "link" => $link,
            "link" => $link,
            "link_text" => $link_text,
            "total" => $total,
            "sub_title" => $sub_title,
            "sub_right_title" => $sub_right_title,
            "total_right_icon" => $total_right_icon,
            "total_right" => $total_right,
            "height" => $height,
            "keys" => $keys
        ]);//eo
        return $str;
    }

    function css_menu_item($text="",$href="",$active_niddle="/"){
        $active = get_menu_active_class($active_niddle);
        $str = <<<EOD
    <li class="$active">
        <a href="$href">$text</a>
    </li>
EOD;
        return $str;
    }

    function css_menu($id="cssmenu",$items=array()){
        
        $items_str = "";
        if(is_array($items)){
            for ($i=0; $i < count($items); $i++) { 
                $item = $items[$i];
                if(is_array($item)){
                    $items_str .=  css_menu_item($item[0],$item[1],$item[2]);
                }else{
                    $items_str .=  $item;
                }
            }
        }else{
            $items_str .= $items;
        }
        $str = <<<EOD
<div id="$id">
    <ul>
        $items_str
    </ul>
</div>
EOD;
        return $str;
    }

    function demo_fill_btn($text="fill helper button",$onclick="alert('no action assigned')"){
        $str =<<<EOD
        <button class="btn btn-small btn-infox btn-outline-info btn-sm  demo-fill-btn" onclick="$onclick">
            <i class="fa fa-bug">$text</i>
        </button>
EOD;
        return $str;
    }

    function demo_fill($btns){
        $btn_text = "";
        if(is_array($btns)){
            for ($i=0; $i < count($btns); $i++) { 
                $btn = $btns[$i];
                $btn_text .= demo_fill_btn($btn[0],$btn[1]);
            }
        }else{
            $btn_text = $btns;
        }
        $str =<<<EOD
    <div class="demo-fill-div">
        $btn_text
    </div>
EOD;
        return $str;
    }


    function error_modal($id="errors_modal",$title="Error Messages"){
        $str = <<<EOD
<!-- /. error modal -->
<div class="modal fade" id="$id">
    <div class="modal-dialog">
        <div class="modal-content bg-danger">
            <div class="modal-header">
                <h4 class="modal-title">$title</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div id="errors_display">
                </div>
            </div>
            <div class="modal-footer justify-content-between">
                <div>&nbsp;</div>
                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /. error modal -->
EOD;
        return $str;
    }


    function loader($id="form_loader",$cls=""){
        $str = <<<EOD
<div class="progress progress-xs d-none $cls " id="$id">
    <div class="progress-bar progress-bar-danger progress-bar-striped progress-bar-animated ace_loader" role="progressbar"
        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
        <!-- <span class="sr-only">60% Complete (warning)</span> -->
    </div>
</div>
EOD;
        return $str;
    }


    function style_link($title="",$href=""){
        $str = <<<EOD
        <!-- $title -->
        <link rel="stylesheet" href="$href">
EOD;
        return $str;
    }

    function script_link($title="",$src=""){
        $str = <<<EOD
        <!-- $title -->
        <script src="$src"></script>
EOD;
        return $str;
    }

    function spinner($cls="spinner-grow spinner-grow-sm"){
        $str = <<<EOD
        <span class="$cls" role="status" aria-hidden="true"></span>
EOD;
        return $str;
    }
?>