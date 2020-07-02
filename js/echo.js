
    //http library
    
    function input($type,$id,$text="",$place_holder="",$icon="",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>"+$note+"</small></div>" : "";
        if(strlen($icon) > 0){
            $icon = "";
$icon  += '<div class="input-group-append">';
$icon  += '    <div class="input-group-text">';
$icon  += '        <span class="fas fa-'+ $icon +'"></span>';
$icon  += '    </div>';
$icon  += '</div>';
        }

        $id = strlen($id) > 0 ? $id : "input_" + rand(566,9999);

        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";

        if(strlen($error_msg) > 0){
            $cls += " is-invalid";
        }
        
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";
       

        $str = "";
$str  += '<div class="mb-4 text-left">';
$str  += '    '+ $note +'';
$str  += '    <div class="input-group '+ $cls +'">';
$str  += '        <div class="input-group-prepend">';
$str  += '        <div class="input-group-text">';
$str  += '            '+ $text +'';
$str  += '        </div>';
$str  += '        </div>';
$str  += '        <input type="'+ $type +'" '+ $is_enabled_str +'  class="form-control '+ $clearable +' '+ $loader +'" id="'+ $id +'" data-default="'+ '+ $val +' +'" value="'+ '+ $val +' +'" placeholder="'+ $place_holder +'">';
$str  += '        '+ $icon +'';
$str  += '    </div>';
$str  += '    <span class="error-span" id="error-span-'+ $id +'">'+ $error_msg +'</span>';
$str  += '</div>';
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
            $onclick = "onclick="+$onclick+"";
        } 
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>"+$note+"</small></div>" : "";
        if(strlen($icon) > 0){
            $icon = "";
$icon  += '<div class="input-group-append">';
$icon  += '    <button type="button" '+ $onclick +' class="btn btn-primary disable-on-loader ">';
$icon  += '        <span class="fas fa-'+ $icon +'"></span>';
$icon  += '    </button>';
$icon  += '</div>';
        }

        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";
        

        if(strlen($error_msg) > 0){
            $cls += " is-invalid";
        }

        $str = "";
$str  += '<div class="mb-4 text-left">';
$str  += ''+ $note +'';
$str  += '<div class="input-group '+ $cls +'">';
$str  += '    <div class="input-group-prepend">';
$str  += '    <div class="input-group-text">';
$str  += '        '+ $text +'';
$str  += '    </div>';
$str  += '    </div>';
$str  += '    <input type="text" '+ $is_enabled_str +'  class="form-control  '+ $clearable +' '+ $loader +'" id="'+ $id +'" data-default="'+ '+ $val +' +'"  value="'+ '+ $val +' +'" placeholder="'+ $place_holder +'">';
$str  += '    '+ $icon +'';
$str  += '</div>';
$str  += '<span class="error-span" id="error-span-'+ $id +'">'+ $error_msg +'</span>';
$str  += '</div>';
       return $str; 
    }


    function select_input($items,$id,$text="",$place_holder="",$icon="list",$note="",$cls="",$val="",$is_enabled=true,$error_msg=""){
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>"+$note+"</small></div>" : "";
        $options = "";
        for ($i=0; $i < count($items); $i++) { 
            $tem_val = $items[$i][0];
            $is_selected = false;
            if(strval($tem_val) == $val){
                $is_selected = true;
            }
            $options += select_item($tem_val,$items[$i][1],$is_selected);
        }
        if(strlen($error_msg) > 0){
            $cls += " is-invalid";
        }
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";

        $str = "";
$str  += '<div class="mb-4 text-left">';
$str  += '        '+ $note +'';
$str  += '<div class="input-group  '+ $cls +'">';
$str  += '    <div class="input-group-prepend">';
$str  += '        <div class="input-group-text">';
$str  += '            '+ $text +'';
$str  += '        </div>';
$str  += '    </div>';
$str  += '    <select class="select form-control '+ $clearable +' '+ $loader +' " data-default="'+ $val +'"   '+ $is_enabled_str +'  id="'+ $id +'" placeholder="'+ $place_holder +'">';
$str  += '        '+ $options +'';
$str  += '    </select>';
$str  += '    <div class="input-group-append">';
$str  += '        <div class="input-group-text">';
$str  += '            <span class="fas fa-'+ $icon +'"></span>';
$str  += '        </div>';
$str  += '    </div>';
$str  += '';
$str  += '';
$str  += '</div>';
$str  += '<span class="error-span" id="error-span-'+ $id +'">'+ $error_msg +'</span>';
$str  += '</div>';
       return $str;
    }


    function select_item($value,$text,$is_selected=false){
        $s = ($is_selected == true)? "selected='true'" : "";
        return "<option value=\""+$value+"\" "+$s+" >"+$text+"</option>";
    }

    function textarea_input($id,$text="",$place_holder="",$icon="list",$note="",$cls="",$rows=3,$val="",$error_msg="",$is_enabled=true){
        
        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>"+$note+"</small></div>" : "";
        if(strlen($error_msg) > 0){
            $cls += " is-invalid";
        }
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";

        $str = "";
$str  += '<div class="mb-4 text-left '+ $cls +'">';
$str  += '    '+ $note +'';
$str  += '    <div class="input-group mb-0">';
$str  += '        <div class="input-group-text render_text_area_input">';
$str  += '            '+ $text +'';
$str  += '        </div>';
$str  += '        <div class="input-group-append render_text_area_input">';
$str  += '            <div class="input-group-text ">';
$str  += '                <span class="fas fa-'+ $icon +'"></span>';
$str  += '            </div>';
$str  += '        </div>';
$str  += '    </div>';
$str  += '    <textarea class="form-control ace-tr-0 '+ $clearable +' '+ $loader +'" data-default="'+ '+ $val +' +'" '+ $is_enabled_str +' rows="'+ $rows +'" id="'+ $id +'" placeholder="'+ $place_holder +'">'+ '+ $val +' +'</textarea>';
$str  += '    <span class="error-span" id="error-span-'+ $id +'">'+ $error_msg +'</span>';
$str  += '</div>';
$str  += '';
       return $str; 
    }

    function checkbox($id,$value,$text,$name="",$icon="list",$place_holder="",$note="",$cls="",$error_msg="",$is_enabled=true){

        $note = strlen($note) > 0 ? "<div class=\"text-left\"><small>"+$note+"</small></div>" : "";
        if(strlen($error_msg) > 0){
            $cls += " is-invalid";
        }
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";
        $clearable = $is_enabled ? " clearable " : "";
        

        $str = "";
$str  += '<div class="mb-4 text-left">';
$str  += '    '+ $note +'';
$str  += '    <div class="icheck-primary d-inline '+ $cls +'">';
$str  += '        <input type="checkbox" id="'+ $id +'" class="'+ $clearable +' '+ $loader +'" data-default="'+ '+ $value +' +'"  name="'+ $name +'" '+ $is_enabled_str +' value="'+ '+ $value +' +'" >';
$str  += '        <label for="'+ $id +'">'+ $text +'</label>';
$str  += '    </div>';
$str  += '    <span class="error-span" id="error-span-'+ $id +'">'+ $error_msg +'</span>';
$str  += '</div>';
        return $str;
    }

    function starts_with($string, $query){
        return echo_substr($string, 0, strlen($query)) === $query;
    }

    function make_text($numargs,$arg_list,$context=""){
        $text = "";
        $css= "";
        $id= "";
        $attrs = "";
        for ($i = 0; $i < $numargs; $i++) {
            $arg = $arg_list[$i];
            if(is_string($arg) && starts_with($arg, ".")){//make_edit
                $css =  trim($arg,".")+" "; //make_edit
            }else if(is_string($arg) && starts_with($arg, "#")){
                $id =  trim(trim($arg,"#"));
            }else if(is_string($arg) && starts_with($arg, "@")){
                $attrs +=  trim($arg,"@");
            }else if(is_array($arg) && $context == "tr" ){
                $text +=  make_td_from_array($arg);
            }else{
                if($context == "tr"){
                    $text += starts_with($arg,"<td")? $arg : td($arg);
                }else{
                    $text += $arg;
                }
            }
        }
        
        return array($text,$css,$id,$attrs);
    }

    function row(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments));
        $text = $items[0];
        $css = $items[1];
$str = "";
$str  += '<div class="row '+ $css +'">';
$str  += '    '+ $text +'';
$str  += '</div>';
        return $str;
    }

    function col(){
        $num = "-12";
        $numargs = func_num_args(arguments);
        $arg_list = func_get_args(arguments);
        if($numargs >= 1){
            $first_arg = $arg_list[0];
            $num = "-" + $first_arg;
            $numargs = $numargs - 1;
            $arg_list = array_slice($arg_list,1);
            //var_dump($arg_list);
        }
        $items = make_text($numargs,$arg_list);
        $text = $items[0];
        $css = $items[1];
        $str = "";
$str  += '<div class="col'+ $num +' '+ $css +'">';
$str  += '    '+ $text +'';
$str  += '</div>';
        return $str; 
    }

    function button($id,$onclick="",$text="",$cls="",$is_enabled=true){
        if(strlen($onclick) != 0){
            $onclick = "onclick="+$onclick+"";
        }   
        $is_enabled_str = ($is_enabled == false)? "disabled='true'" : "";
        $loader = $is_enabled ? " disable-on-loader " : "";     
        $str = "";
$str  += '<button type="button" '+ $onclick +' id="'+ $id +'"';
$str  += '    class="btn btn-primary '+ $loader +'  '+ $cls +' " '+ $is_enabled_str +' >'+ $text +'</button>';
        return $str;  
    }


    function button_block($id,$onclick="",$text="",$cls=""){
        return button($id,$onclick,$text="","btn-block " + $cls);
    }

    function img($src="",$cls=""){ 
        
        $str = "";
$str  += '<img src="'+ $src +'" class="'+ $cls +'" />';
        return $str;  
    }

    function img_item($src="",$items){ 
        $text = "";
        for ($i=0; $i < count($items); $i++) { 
            $temp = "<div class=\"item-text-row\">";
            $temp += "  " + $items[$i];
            $temp += "</div>";
            $text += $temp;
        }
        $str = "";
$str  += '<div class="ace-image-item">';
$str  += '    <div class="image">';
$str  += '        <img src="'+ $src +'" >';
$str  += '    </div>';
$str  += '    <div class="item-text-rows">';
$str  += '        '+ $text +'';
$str  += '    </div>';
$str  += '</div>';
        return $str;  
    }

    function div(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments));
        $text = $items[0];
        $css = $items[1];
$str = "";
$str  += '<div class="'+ $css +'">';
$str  += '    '+ $text +'';
$str  += '</div>';
        return $str;
    }

    function title($text){
$str = "";
$str  += '<title>';
$str  += '    '+ $text +'';
$str  += '</title>';
        return $str;
    }

    function head($text=""){
$str = "";
$str  += '    <head>';
$str  += '        '+ $text +'';
$str  += '    </head>';
        return $str;
    }

    function meta_standard(){
        $str = "";
$str  += '        <meta charset="utf-8">';
$str  += '        <!-- Tell the browser to be responsive to screen width -->';
$str  += '        <meta name="viewport" content="width=device-width, initial-scale=1">';
$str  += '        <meta http-equiv="x-ua-compatible" content="ie=edge">';
        return $str;
    }

    function icon($name){
$str = "";
$str  += '<i class="fa fa-'+ $name +'"></i>';
        return $str;
    }

    function image_uploader($id,$text,$src="/dist/img/placeholder.png",$cls="",$footer_text=""){
        $str = "";
$str  += '        <div class="ace-image-uploader mb-3 '+ $cls +'">';
$str  += '            <div class="input-group mb-0">';
$str  += '                <div class="input-group-text render_text_area_input">';
$str  += '                    '+ $text +'';
$str  += '                </div>';
$str  += '                <div class="input-group-append render_text_area_input upload-btn">';
$str  += '                    <div class="input-group-text ">';
$str  += '                        <span class="fas fa-camera"></span>&nbsp;click to upload';
$str  += '                    </div>';
$str  += '                </div>';
$str  += '            </div>';
$str  += '            <div class="image-holder">';
$str  += '                <img src="'+ $src +'" class="image-uploader-image" />';
$str  += '                <div class="image-holder-overlay d-none">';
$str  += '                    <div class="text-bold pt-2">';
$str  += '                        <i class="fas fa-3x fa-sync-alt fa-spin"></i> <br/>';
$str  += '                        uploading...';
$str  += '                    </div>';
$str  += '                </div>';
$str  += '            </div>';
$str  += '            <div class="image-footer">';
$str  += '                <div class="image-footer-text">';
$str  += '                    '+ $footer_text +'';
$str  += '                </div>';
$str  += '                <div class="image-footer-clear-btn">';
$str  += '                    <span class="fas fa-times-circle"></span>&nbsp;clear image';
$str  += '                </div>';
$str  += '            </div>';
$str  += '            <input type="file" class="fileinput"  />';
$str  += '            <input type="hidden" class="fileinput-value" id="'+ $id +'"  value="'+ $src +'" />';
$str  += '        </div>';
        return $str;
    }

    function user_preview_item($key,$value="",$id=""){
        $id = (strlen($id) > 0)? " id='$id' " : "";
        $str = "";
$str  += '<li class="nav-item" '+ $id +' >';
$str  += '    <a href="#" class="nav-link">';
$str  += '        <div class="float-left key" >'+ $key +'</div>';
$str  += '        <div class="float-right val">'+ $value +'</div>';
$str  += '        <div style="clear:both"></div>';
$str  += '    </a>';
$str  += '</li>';
        return $str;
    }


    function user_preview($src="/dist/img/user7-128x128.jpg",$title="",$sub_title="",$items=array(),$class_name="user-preview"){   
        $temp = _ace_user_preview_helper($src,$title,$sub_title,$items,$class_name);
        $str = "";
$str  += '<div class="card-widget widget-user-2 '+ $class_name +'">';
$str  += '    '+ $temp +'';
$str  += '</div>';
        return $str;
    }

    function user_preview_card($src="/dist/img/user7-128x128.jpg",$title="",$sub_title="",$items=array(),$class_name="user-preview"){
        $temp = _ace_user_preview_helper($src,$title,$sub_title,$items,$class_name);
        $str = "";
$str  += '<div class="card card-widget widget-user-2 '+ $class_name +'">';
$str  += '    '+ $temp +'';
$str  += '</div>';
        return $str;
    }

    function _ace_user_preview_helper($src="/dist/img/user7-128x128.jpg",$title="",$sub_title="",$items=array(),$class_prefix="user-preview"){
        $items_str = "";
        for ($i=0; $i < count($items); $i++) { 
            $item = $items[$i];
            $item_id = "";
            if(count($item) > 2){
                $item_id = $item[2];
            }
            $items_str +=  user_preview_item($item[0],$item[1],$item_id);
        }
        $str = "";
$str  += '<!-- Add the bg color to the header using any of the bg-* classes -->';
$str  += '<div class="widget-user-header bg-warning '+ $class_prefix +'-header">';
$str  += '    <div class="widget-user-image">';
$str  += '        <img class="img-circle elevation-2 '+ $class_prefix +'-image" src="'+ $src +'"';
$str  += '            alt="User Avatar">';
$str  += '    </div>';
$str  += '    <!-- /.widget-user-image -->';
$str  += '    <h3 class="widget-user-username"><strong class="'+ $class_prefix +'-title">'+ $title +'</strong></h3>';
$str  += '    <h5 class="widget-user-desc '+ $class_prefix +'-subtitle">'+ $sub_title +'</h5>';
$str  += '</div>';
$str  += '<div class="card-footer p-0">';
$str  += '    <ul class="nav flex-column">';
$str  += '        '+ $items_str +'';
$str  += '    </ul>';
$str  += '</div>';
        return $str;
    }

    function user_profile_card_item($key="", $value="", $icon="", $lmen_class=""){
        $str = "";
$str  += '        <div class="user-profile-card-header-item '+ $lmen_class +'">';
$str  += '            <i class="fas fa-'+ $icon +'"></i>';
$str  += '            <span class="key-display">'+ $key +'</span>';
$str  += '            <span>:<b> '+ $value +'</b></span>';
$str  += '        </div>';
        return $str;
    }

    function user_profile_item($key,$value="",$icon="",$lmen_class=""){
        $str = "";
$str  += '        <li class="nav-item user-profile-item '+ $lmen_class +'">';
$str  += '           <div class="icon"><i class="fas fa-'+ $icon +'"></i></div>';
$str  += '           <div class="key">'+ $key +'</div>';
$str  += '           <div class="value text-right">'+ $value +'</div>';
$str  += '        </li>';
        return $str;
    }

    function user_profile_card($src="/dist/img/user7-128x128.jpg",$header_items=array(),$profile_items=array()){
        $title = "";
        $header_text = "";
        for ($i=0; $i <  count($header_items); $i++) { 
           $header_text_item = $header_items[$i];
           if(is_array($header_text_item)){
                $cls = count($header_text_item)>3? $header_text_item[3]: "";
                $header_text += user_profile_card_item($header_text_item[0],$header_text_item[1],$header_text_item[2],$cls);
           }else{
                $header_text += $header_text_item;
           }
        }
        $profile_body = "";
        for ($i=0; $i <  count($profile_items); $i++) { 
            $profile_item = $profile_items[$i];
            if(is_array($profile_item)){
                 $cls = count($profile_item)>3? $profile_item[3]: "";
                 $profile_body += user_profile_item($profile_item[0],$profile_item[1],$profile_item[2],$cls);
            }else{
                 $profile_body += $profile_item;
            }
         }
        $str = "";
$str  += '<div class="card card-widget widget-user-2 ">';
$str  += '    <!-- Add the bg color to the header using any of the bg-* classes -->';
$str  += '    <div class="widget-user-header user-profile-card-header ">';
$str  += '        <div class="widget-user-image">';
$str  += '            <img class="img-square elevation-2 user-profile-card-image" src="'+ $src +'" alt="User Avatar">';
$str  += '        </div>';
$str  += '        <!-- /.widget-user-image -->';
$str  += '        '+ $header_text +'';
$str  += '    </div>';
$str  += '    <div class="card-footer p-0">';
$str  += '        <ul class="nav flex-column profile-body-wrapper">';
$str  += '            '+ $profile_body +'';
$str  += '        </ul>';
$str  += '    </div>';
$str  += '</div>';
        return $str;
    }


    function line_graph_card($id,$title,$total,$sub_title,$chart_height){
        $canvas_id = $id + "_chart";
        $str = "";
$str  += '<div class="card" id="'+ $id +'">';
$str  += '    <div class="card-header border-0">';
$str  += '        <div class="d-flex justify-content-between">';
$str  += '            <h3 class="card-title">'+ $title +'</h3>';
$str  += '        </div>';
$str  += '    </div>';
$str  += '    <div class="card-body">';
$str  += '        <div class="d-flex">';
$str  += '            <p class="d-flex flex-column">';
$str  += '                <span class="text-bold text-lg total">'+ $total +'</span>';
$str  += '                <span class="sub_title">'+ $sub_title +'</span>';
$str  += '            </p>';
$str  += '        </div>';
$str  += '        <!-- /.d-flex -->';
$str  += '        <div class="position-relative mb-4">';
$str  += '            <canvas id="'+ $canvas_id +'" height="'+ $chart_height +'"></canvas>';
$str  += '        </div>';
$str  += '    </div>';
$str  += '</div>';
$str  += '<!-- /.card -->';
        return $str;
    }

    function make_lmnt($tg,$items){
        $text = $items[0];
        $css = $items[1];
        $attr = $items[3];
        $id = strlen($items[2])>0? "id=\""+$id+"\"": "";
        $str = "<"+$tg+" "+$id+" class=\""+$css+"\" "+$attr+" >"+$text+"</"+$tg+">";
        return $str;
    }

    function td(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments));
        $str = make_lmnt("td",$items);
        return $str;
    }

    function th(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments));
        $str = make_lmnt("th",$items);
        return $str;
    }

    function _xxx(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments));
        $str = $items[0];
        return $str;
    }

    function tr(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments),"tr");
        //var_dump($items);
        $str = make_lmnt("tr",$items);
        return $str;
    }

    function make_td_from_array($data){
        $td = "";
        $text = $data[0];
        $clss = count($data)>1 ? "+"+$data[1]:"";
        $col_span = count($data)>2? "@colspan=\""+$data[2]+"\"" :"";
        $td += td($text,$clss,$col_span);
        return $td;
    }

    function dashboard_table_card_row($data){
        $str = "";
        if(is_array($data)){
            $td = "";
            for ($i=0; $i < count($data); $i++) { 
                $temp = $data[$i];
                if(is_string($temp)){
                    $td += starts_with($temp,"<td") ?$temp: td($temp);
                }else if(is_array($temp)){
                    $td += make_td_from_array($temp);
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
            $cols += "<th>"+$name+"</th>";
        }
        $rows = "";
        if(is_array($data)){
            for ($i=0; $i < count($data); $i++) { 
                $rows += dashboard_table_card_row($data[$i]);
            }
        }else{
            $rows = $data;
        }

        $height = strval($scroll_height)+"px";
        $scroll_height_text = strlen($scroll_height) > 0 ? "style=\"height:  "+$height+";\"" : "";
        
    
        $str = "";
$str  += '<div class="card" id="'+ $id +'">';
$str  += '    <div class="card-header border-0">';
$str  += '        <h3 class="card-title">'+ $title +'</h3>';
$str  += '    </div>';
$str  += '    <div class="card-body table-responsive p-0" '+ $scroll_height_text +' >';
$str  += '        <table class="table table-striped table-valign-middle '+ $cls +'" >';
$str  += '            <thead>';
$str  += '                <tr>'+ $cols +'</tr>';
$str  += '            </thead>';
$str  += '            <tbody>';
$str  += '                '+ $rows +'';
$str  += '            </tbody>';
$str  += '        </table>';
$str  += '    </div>';
$str  += '</div>';
        return $str;
    }

    function content_container_fluid(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments));
        $text = $items[0];
        $css = $items[1];
        return div("+content "+$css+"",div("+container-fluid",$text));
    }

    function fluid_content_container(){
        $items = make_text(func_num_args(arguments),func_get_args(arguments));
        $text = $items[0];
        $css = "."+$items[1]; //make edit
        return content_container_fluid($css,$text);
    }

    function content_container_header_fluid($title,$bread=array(),$css=""){
        $crumps = "";
        for ($i=0; $i < count($bread); $i++) { 
            $temp = $bread[$i];
            $title_ = count($temp) > 0 && is_array($temp) ? $temp[0] : $temp;
            $href = count($temp) > 1 && is_array($temp) ? $temp[1] : "";
            if($i == count($bread)-1){
                $crumps += "<li class=\"breadcrumb-item active\">"+$title_+"</li>";
            }else{
                $crumps += "<li class=\"breadcrumb-item\"><a href=\""+$href+"\">"+$title_+"</a></li>";
            }
        }
        $str = "";
$str  += '<!-- Content Header (Page header) -->';
$str  += '<div class="content-header '+ $css +'">';
$str  += '    <div class="container-fluid">';
$str  += '        <div class="row mb-2">';
$str  += '            <div class="col-sm-6">';
$str  += '                <h1 class="m-0 text-dark">'+ $title +'</h1>';
$str  += '            </div><!-- /.col -->';
$str  += '            <div class="col-sm-6">';
$str  += '                <ol class="breadcrumb float-sm-right">';
$str  += '                    '+ $crumps +'';
$str  += '                </ol>';
$str  += '            </div><!-- /.col -->';
$str  += '        </div><!-- /.row -->';
$str  += '    </div><!-- /.container-fluid -->';
$str  += '</div>';
$str  += '<!-- /.content-header -->';
        return $str;
    }

    function fluid_content_container_header($title,$bread=array(),$css=""){
        return content_container_header_fluid($title,$bread,$css);
    }


    function info_box($id,$text="",$number="",$symbol="",$icon="cog",$bg="info"){
        $symbol = strlen($symbol) > 0 ? " <small>"+$symbol+"</small> ": "";
        $str = "";
$str  += '<div class="info-box" id="'+ $id +'">';
$str  += '    <span class="info-box-icon bg-'+ $bg +' elevation-1"><i class="fas fa-'+ $icon +'"></i></span>';
$str  += '    <div class="info-box-content">';
$str  += '    <span class="info-box-text">'+ $text +'</span>';
$str  += '    <span class="info-box-number">';
$str  += '        '+ $number +'';
$str  += '        '+ $symbol +'';
$str  += '    </span>';
$str  += '    </div>';
$str  += '    <!-- /.info-box-content -->';
$str  += '</div>';
$str  += '<!-- /.info-box -->';
        return $str;
    }

    function product_list_card_item($id,$image="/dist/img/default-150x150.png", $name ="", $description = "", $badge = ""){
        $str = "";
$str  += '<li class="item" id="'+ $id +'">';
$str  += '    <div class="product-img">';
$str  += '        <img src="'+ $image +'" alt="Product Image" class="img-size-50">';
$str  += '    </div>';
$str  += '    <div class="product-info">';
$str  += '        <a href="javascript:void(0)" class="product-title">';
$str  += '            '+ $name +'';
$str  += '            <span class="badge badge-warning float-right">'+ $badge +'</span>';
$str  += '        </a>';
$str  += '        <span class="product-description">';
$str  += '            '+ $description +'';
$str  += '        </span>';
$str  += '    </div>';
$str  += '</li>';
$str  += '<!-- /.item -->';
        return $str;
    }

    function product_list_card($id,$title,$products,$footer_text="",$onclick="",$onclickfooter=""){
        //ministru=y of imigration services
        $products_str = "";
        for ($i=0; $i < count($products); $i++) { 
            $product = $products[$i];
            if(is_array($product)){
                $products_str += product_list_card_item(
                    count($product) > 0 ? $product[0] : "",
                    count($product) > 1 ? $product[1] : "/dist/img/default-150x150.png",
                    count($product) > 2 ? $product[2] : "",
                    count($product) > 3 ? $product[3] : "",
                    count($product) > 4 ? $product[4] : ""
                ); 
            }else{
                $products_str += $product;
            }
        }
        $str = "";
$str  += '<!-- PRODUCT LIST -->';
$str  += '<div class="card" id="'+ $id +'" '+ $onclick +'>';
$str  += '    <div class="card-header">';
$str  += '        <h3 class="card-title">'+ $title +'</h3>';
$str  += '    </div>';
$str  += '    <!-- /.card-header -->';
$str  += '    <div class="card-body p-0">';
$str  += '        <ul class="products-list product-list-in-card pl-2 pr-2">';
$str  += '            '+ $products_str +'';
$str  += '        </ul>';
$str  += '    </div>';
$str  += '    <!-- /.card-body -->';
$str  += '    <div class="card-footer text-center" '+ $onclickfooter +'>';
$str  += '        <a href="javascript:void(0)" class="uppercase">'+ $footer_text +'</a>';
$str  += '    </div>';
$str  += '    <!-- /.card-footer -->';
$str  += '</div>';
$str  += '<!-- /.card -->';
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
        $str = "";
$str  += '<li class="nav-item">';
$str  += '    <a href="'+ $href +'" class="nav-link '+ $ct +' ">';
$str  += '        <i class="nav-icon fas fa-'+ $icon +'"></i>';
$str  += '        <p>';
$str  += '            '+ $text +'';
$str  += '            <!-- <span class="badge badge-info right">6</span> -->';
$str  += '        </p>';
$str  += '    </a>';
$str  += '</li>';
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
                    $menu_items +=  menu_item($item[0],$item[1],$item[2]);
                    // $act += get_menu_active_class($item[1]);
                }else{
                    $menu_items +=  $item; 
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
        $str = "";
$str  += '<li class="nav-item has-treeview '+ $open +'">';
$str  += '    <a href="#" class="nav-link '+ $act +'">';
$str  += '        <i class="nav-icon fas fa-'+ $icon +'"></i>';
$str  += '        <p>';
$str  += '            '+ $text +'';
$str  += '            <i class="fas fa-angle-left right"></i>';
$str  += '        </p>';
$str  += '    </a>';
$str  += '    <ul class="nav nav-treeview">';
$str  += '        '+ $menu_items +'';
$str  += '    </ul>';
$str  += '</li>';
        return $str;
    }


    function include_script($src){
        echo ( "<script src=\""+$src+"\"></script> \n");
    }


    function strong_image_card($src="/dist/img/placeholder.png",$body="",$footer="",$css=""){
        if(strlen(trim($footer)) > 0){
            $footer = "<div class=\"card-footer\">"+$footer+"</div>";
        }
        $str = "";
$str  += '<div class="card '+ $css +'">';
$str  += '    <div class="card-body">';
$str  += '        <div class="row">';
$str  += '            <div class="col-5">';
$str  += '                <img src="'+ $src +'" />';
$str  += '            </div>';
$str  += '            <div class="body col-7">';
$str  += '                '+ $body +'';
$str  += '            </div>';
$str  += '        </div>';
$str  += '    </div>';
$str  += '    '+ $footer +'';
$str  += '</div>';
$str  += '<!-- /.card -->';
        return $str;
    }

    function _arg($placehoder){
        return "";
    }

    function form_card($title="",$body="",$footer="",$css="",$onsubmit="",$loader=""){
        
        if(strlen(trim($footer)) > 0){
            $footer = "<div class=\"card-footer\">"+$footer+"</div>";
        }

        $onsubmit_txt = "";
        if(strlen(trim($onsubmit)) > 0){
            $onsubmit_txt = "onsubmit=\""+$onsubmit+"\"";
        }
        

        $str = "";
$str  += '<div class="card '+ $css +'">';
$str  += '    <div class="card-header border-0 visibility-hidden">';
$str  += '        <div class="d-flex justify-content-between">';
$str  += '            <h3 class="card-title">'+ $title +'</h3>';
$str  += '        </div>';
$str  += '        '+ $loader +'';
$str  += '    </div>';
$str  += '    <div class="card-body">';
$str  += '        <form '+ $onsubmit_txt +' >';
$str  += '            <fieldset>';
$str  += '                '+ $body +'';
$str  += '            </fieldset>';
$str  += '        </form>';
$str  += '    </div>';
$str  += '    '+ $footer +'';
$str  += '</div>';
$str  += '<!-- /.card -->';
        return $str;
    }


    function callout($title="",$body="",$small="",$kind="default"){
        $str = "";
$str  += '<div class="callout callout-'+ $kind +'">';
$str  += '    <h5>'+ $title +' <span class="float-right">'+ $small +'</span></h5>';
$str  += '    <p>';
$str  += '        '+ $body +'';
$str  += '    </p>';
$str  += '</div>';
        return $str;
    }

    function multi_form_page($title,$body="",$footer="",$cls=""){
        $title_text = strlen($title) > 0 ? "<h2  class=\"fs-title multi-form-page-title\">"+$title+"</h2>" : "";
        $str = "";
$str  += '<fieldset class="'+ $cls +'">';
$str  += '    '+ $title_text +'';
$str  += '    <div class="multi-form-page-fields">';
$str  += '        '+ $body +'';
$str  += '    </div>';
$str  += '    '+ $footer +'';
$str  += '</fieldset>';
        return $str;
    }

    function multi_form($id="msform",$progress_id="progressbar",$progress_items=array(),$pages=array(),$clas=""){
        $id = strlen($id) > 0 ? "id='"+$id+"'" : "id='msform'";
        $progress_id = strlen($progress_id) > 0 ? "id='"+$progress_id+"'" : "id='progressbar'";
        $progress_tabs = "";
        for ($i=0; $i < count($progress_items); $i++) { 
            $progress_item = $progress_items[$i];
            $cls = ($i==0)?"active":"";
            $progress_tabs += "<li class=\""+$cls+"\">"+$progress_item+"</li>";
        }

        $pages_text = "";
        if(is_array($pages)){
            for ($i=0; $i < count($pages); $i++) { 
                $page = $pages[$i];
                if(is_array($page)){
                    $pages_text +=  multi_form_page($page[0],$page[1],$page[2]);
                }else{
                    $pages_text +=  $page;
                }
            }
        }else{
            $pages_text = $pages;
        }
        


        
        $str = "";
$str  += '        <form '+ $id +' class="diplay-block '+ $clas +'">';
$str  += '            <!-- progressbar -->';
$str  += '            <ul '+ $progress_id +'>';
$str  += '                '+ $progress_tabs +'';
$str  += '            </ul>';
$str  += '            <!-- fieldsets -->';
$str  += '            '+ $pages_text +'';
$str  += '        </form>';
        return $str;
    }

    function card($title="",$body="",$footer="",$css=""){
        
        if(strlen(trim($footer)) > 0){
            $footer = "<div class=\"card-footer\">"+$footer+"</div>";
        }

        $header_text = "";
$header_text  += '    <div class="card-header border-0 visibility-hidden">';
$header_text  += '        <div class="d-flex justify-content-between">';
$header_text  += '            <h3 class="card-title">'+ $title +'</h3>';
$header_text  += '        </div>';
$header_text  += '    </div>';
        $header_text = strlen($title) > 0? $header_text : "";
        
        $str = "";
$str  += '<div class="card '+ $css +'">';
$str  += '    '+ $header_text +'';
$str  += '    <div class="card-body">';
$str  += '        <form >';
$str  += '            <fieldset>';
$str  += '                '+ $body +'';
$str  += '            </fieldset>';
$str  += '        </form>';
$str  += '    </div>';
$str  += '    '+ $footer +'';
$str  += '</div>';
$str  += '<!-- /.card -->';
        return $str;
    }




    function business_profile_card(
        $id= "",
        $src="/dist/img/user7-128x128.jpg",
        $name="",
        $description="",
        $business_image="/dist/img/photo1.png",
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
                 $profile_body += user_profile_item($profile_item[0],$profile_item[1],$profile_item[2],$cls);
            }else{
                 $profile_body += $profile_item;
            }
         }
        $str = "";
$str  += '<div class="row" id="'+ $id +'">';
$str  += '    <div class="col-6 pr-0">';
$str  += '        <div class="card card-widget widget-user-2 btrr-0 bbrr-0 ">';
$str  += '            <!-- Add the bg color to the header using any of the bg-* classes -->';
$str  += '            <div class="widget-user-header user-profile-card-header ">';
$str  += '                <div class="widget-user-image">';
$str  += '                    <img class="img-square elevation-2 business-profile-card-logo-image" src="'+ $src +'" alt="User Avatar">';
$str  += '                </div>';
$str  += '                <!-- /.widget-user-image -->';
$str  += '                <div class="user-profile-card-header-item">';
$str  += '                    <i class="fas fa-info"></i>';
$str  += '                    <span class="key-display">'+ $name_key +'</span>:';
$str  += '                    <span><b>'+ $name +'</b></span>';
$str  += '                </div>';
$str  += '                <div class="user-profile-card-header-item">';
$str  += '                    <i class="fas fa-info"></i>';
$str  += '                    <span class="key-display">'+ $description_key +'</span>:';
$str  += '                    <div class="pt-10"><b>'+ $description +'</b></div>';
$str  += '                </div>';
$str  += '            </div>';
$str  += '            <div class="card-body" style="padding-top: 23px;" >';
$str  += '                <img class="img-square elevation-2 business-profile-card-image" src="'+ $business_image +'" alt="Business Image">';
$str  += '            </div>';
$str  += '        </div>';
$str  += '    </div>';
$str  += '    <div class="col-6 pl-0">';
$str  += '        <div class="card card-widget widget-user-2 bblr-0 btlr-0">';
$str  += '            <div class="card-body p-0">';
$str  += '                <ul class="nav flex-column profile-body-wrapper">';
$str  += '                    '+ $profile_body +'';
$str  += '                </ul>';
$str  += '            </div>';
$str  += '            <div class="card-footer business-profile-card-buttons">';
$str  += '                '+ $buttons +'';
$str  += '            </div>';
$str  += '        </div>';
$str  += '    </div>';
$str  += '</div>';
        return $str;
    }

    function def_arg($key,$args,$default_value=""){
        return array_key_exists($key,$args)?$args[$key]:$default_value;
    }

    function graph_key($text,$class="text-primary"){
        $str = "";
$str  += '<span class="mr-2">';
$str  += '    <i class="fas fa-square '+ $class +'"></i> '+ $text +'';
$str  += '</span>';
        return $str;
    }

    function bar_graph_card($args){
        $id=def_arg("id",$args);
        $id_chart = $id + "_chart";
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
        }else if(strlen($link) > 0){
            if($link_text == 0){
                $link_text = $link;
            }
            $link_text = "<a href=\""+$link+"\">"+$link_text+"</a>";
        }else if(strlen($link) == 0){
            $link_text = "<a href=\"javascript:void(0);\">"+$link_text+"</a>";
        }
        $keys_text = "";
        if(is_array($keys)){
            for ($i=0; $i < count($keys); $i++) { 
                $key = $keys[$i];
                if(is_array($key)){
                    $keys_text += graph_key($key[0],$key[1]);
                }else{
                    $keys_text += $key;
                }
            }
        }else{
            $keys_text = $keys;
        }
        $str = "";
$str  += '<div class="card" id="'+ $id +'">';
$str  += '    <div class="card-header border-0">';
$str  += '        <div class="d-flex justify-content-between">';
$str  += '            <h3 class="card-title">'+ $title +'</h3>';
$str  += '            '+ $link_text +'';
$str  += '        </div>';
$str  += '    </div>';
$str  += '    <div class="card-body">';
$str  += '        <div class="d-flex">';
$str  += '            <p class="d-flex flex-column">';
$str  += '                <span class="text-bold text-lg">'+ $total +'</span>';
$str  += '                <span>'+ $sub_title +'</span>';
$str  += '            </p>';
$str  += '            <p class="ml-auto d-flex flex-column text-right">';
$str  += '                <span class="text-success">';
$str  += '                    <i class="fas fa-'+ $total_icon_right +'"></i> '+ $total_right +'';
$str  += '                </span>';
$str  += '                <span class="text-muted">'+ $sub_right_title +'</span>';
$str  += '            </p>';
$str  += '        </div>';
$str  += '        <!-- /.d-flex -->';
$str  += '';
$str  += '        <div class="position-relative mb-4">';
$str  += '            <canvas id="'+ $id_chart +'" height="'+ $height +'"></canvas>';
$str  += '        </div>';
$str  += '        <div class="d-flex flex-row justify-content-end">';
$str  += '            '+ $keys_text +'';
$str  += '        </div>';
$str  += '    </div>';
$str  += '</div>';
        return $str;
    }

    function pie_graph_card($args){
        $id=def_arg("id",$args);
        $id_chart = $id + "_chart";
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
        $str = bar_graph_card({//so
            "id" : $id,
            "id_chart" : $id_chart,
            "title" : $title,
            "link" : $link,
            "link" : $link,
            "link_text" : $link_text,
            "total" : $total,
            "sub_title" : $sub_title,
            "sub_right_title" : $sub_right_title,
            "total_right_icon" : $total_right_icon,
            "total_right" : $total_right,
            "height" : $height,
            "keys" : $keys
        });//eo
        return $str;
    }

    function css_menu_item($text="",$href="",$active_niddle="/"){
        $active = get_menu_active_class($active_niddle);
        $str = "";
$str  += '    <li class="'+ $active +'">';
$str  += '        <a href="'+ $href +'">'+ $text +'</a>';
$str  += '    </li>';
        return $str;
    }

    function css_menu($id="cssmenu",$items=array()){
        
        $items_str = "";
        if(is_array($items)){
            for ($i=0; $i < count($items); $i++) { 
                $item = $items[$i];
                if(is_array($item)){
                    $items_str +=  css_menu_item($item[0],$item[1],$item[2]);
                }else{
                    $items_str +=  $item;
                }
            }
        }else{
            $items_str += $items;
        }
        $str = "";
$str  += '<div id="'+ $id +'">';
$str  += '    <ul>';
$str  += '        '+ $items_str +'';
$str  += '    </ul>';
$str  += '</div>';
        return $str;
    }

    function demo_fill_btn($text="fill helper button",$onclick="alert('no action assigned')"){
        $str ="";
$str  += '        <button class="btn btn-small btn-infox btn-outline-info btn-sm  demo-fill-btn" onclick="'+ $onclick +'">';
$str  += '            <i class="fa fa-bug">'+ $text +'</i>';
$str  += '        </button>';
        return $str;
    }

    function demo_fill($btns){
        $btn_text = "";
        if(is_array($btns)){
            for ($i=0; $i < count($btns); $i++) { 
                $btn = $btns[$i];
                $btn_text += demo_fill_btn($btn[0],$btn[1]);
            }
        }else{
            $btn_text = $btns;
        }
        $str ="";
$str  += '    <div class="demo-fill-div">';
$str  += '        '+ $btn_text +'';
$str  += '    </div>';
        return $str;
    }


    function error_modal($id="errors_modal",$title="Error Messages"){
        $str = "";
$str  += '<!-- /. error modal -->';
$str  += '<div class="modal fade" id="'+ $id +'">';
$str  += '    <div class="modal-dialog">';
$str  += '        <div class="modal-content bg-danger">';
$str  += '            <div class="modal-header">';
$str  += '                <h4 class="modal-title">'+ $title +'</h4>';
$str  += '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
$str  += '                <span aria-hidden="true">&times;</span>';
$str  += '                </button>';
$str  += '            </div>';
$str  += '            <div class="modal-body">';
$str  += '                <div id="errors_display">';
$str  += '                </div>';
$str  += '            </div>';
$str  += '            <div class="modal-footer justify-content-between">';
$str  += '                <div>&nbsp;</div>';
$str  += '                <button type="button" class="btn btn-outline-light" data-dismiss="modal">Close</button>';
$str  += '            </div>';
$str  += '        </div>';
$str  += '        <!-- /.modal-content -->';
$str  += '    </div>';
$str  += '    <!-- /.modal-dialog -->';
$str  += '</div>';
$str  += '<!-- /. error modal -->';
        return $str;
    }


    function loader($id="form_loader",$cls=""){
        $str = "";
$str  += '<div class="progress progress-xs d-none '+ $cls +' " id="'+ $id +'">';
$str  += '    <div class="progress-bar progress-bar-danger progress-bar-striped progress-bar-animated ace_loader" role="progressbar"';
$str  += '        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%">';
$str  += '        <!-- <span class="sr-only">60% Complete (warning)</span> -->';
$str  += '    </div>';
$str  += '</div>';
        return $str;
    }


    function style_link($title="",$href=""){
        $str = "";
$str  += '        <!-- '+ $title +' -->';
$str  += '        <link rel="stylesheet" href="'+ $href +'">';
        return $str;
    }

    function spinner($cls="spinner-grow spinner-grow-sm"){
        $str = "";
$str  += '        <span class="'+ $cls +'" role="status" aria-hidden="true"></span>';
        return $str;
    }
