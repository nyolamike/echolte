    function table_filter(){
        $args = func_get_args(arguments);
        $num = func_num_args(arguments);
        
        //nyd
        //add provision for adding custom drop downs
        //nyd
        //add provision for hiding and showing columns
        //nyd
        //add provision for sorting, by asc, dec etc
        //these additions could all be put under the 
        //same mutilevel drop dowm options menu
        $show_from_date_str = false;
        $from_date_str = "";
        $show_to_date_str = false;
        $to_date_str = "";
        $show_search_str = false;
        $search_str = "";
        $show_refresh_btn_str = false;
        $refresh_str = "";
        $refresh_btn_str = "";
        $show_excell_str = false;
        $excell_str = "";
        $show_csv_str = false;
        $csv_str = "";
        $show_pdf_str = false;
        $pdf_str = "";
        $cls = "";
        $id = "";
        for ($i=0; $i < $num; $i++) { 
            $arg = $args[$i];
            if(starts_with($arg,"+")){
                $cls  = $arg;
                continue;
            }
            if(starts_with($arg,"#")){
                $id  = str_replace("#","",$arg);
                continue;
            }
            if($arg == "from_date"){
                $show_from_date_str = true;
            }else if($arg == "to_date"){
                $show_to_date_str = true;
            }else if($arg == "search"){
                $show_search_str = true;
            }else if($arg == "refresh"){
                $show_refresh_btn_str = true;
            }else if($arg == "excell"){
                $show_excell_str  = true;
            }else if($arg == "csv"){
                $show_csv_str  = true;
            }else if($arg == "pdf"){
                $show_pdf_str  = true;
            }
        }
        
        if($show_from_date_str == true){
            $id_temp = strlen($id) > 0 ? "id=\""+$id+"_filter_start_date\"" : "";

            //process from_date_str
            $from_date_str = "";
$from_date_str  += '    <div class="input-group-prepend">';
$from_date_str  += '        <span class="input-group-text"><i class="fas fa-calendar"></i>&nbsp;From </span>';
$from_date_str  += '    </div>';
$from_date_str  += '    <input type="date" '+ $id_temp +' name="table_filter_start_date" pattern="\d{4}-\d{2}-\d{2}" class="form-control disable-on-loader " >';
        }

        if($show_to_date_str == true){
            $id_temp = strlen($id) > 0 ? "id=\""+$id+"_filter_end_date\"" : "";
            //process to_date_str
            $to_date_str = "";
$to_date_str  += '        <div class="input-group-append">';
$to_date_str  += '            <span class="input-group-text"><i class="fas fa-calendar"></i>&nbsp;To </span>';
$to_date_str  += '        </div>';
$to_date_str  += '        <input type="date" '+ $id_temp +'  name="table_filter_end_date" pattern="\d{4}-\d{2}-\d{2}" class="form-control disable-on-loader" >';
        }

        if($show_search_str == true){
            $id_temp = strlen($id) > 0 ? "id=\""+$id+"_filter_search_input\"" : "";
            //process search_str
            $search_str = "";
$search_str  += '        <input type="text"  '+ $id_temp +' name="table_search" class="form-control xfloat-right" placeholder="Search">';
$search_str  += '        <div class="input-group-append">';
$search_str  += '            <button type="button" class="btn btn-primary disable-on-loader " onclick="on_table_filter_search()" ><i class="fas fa-search"></i> search </button>';
$search_str  += '        </div>';
        }

        if($show_refresh_btn_str == true){
            //process refresh_btn_str
            $refresh_btn_str = "";
$refresh_btn_str  += '';
$refresh_btn_str  += '        <div class="input-group-append">';
$refresh_btn_str  += '            <button type="button" class="btn btn-default disable-on-loader"><i class="fas fa-redo"></i> reload </button>';
$refresh_btn_str  += '        </div>';
        }

        if($show_excell_str == true){
            $fk = "'excell'";
            //process excell_str 
            $excell_str = "";
$excell_str  += '        <div class="input-group-append">';
$excell_str  += '            <button type="button"  onclick="table_filter_download_file('+ $fk +')" class="btn btn-default disable-on-loader">';
$excell_str  += '                <i class="fas fa-arrow-down"></i>';
$excell_str  += '                <i class="fas fa-file-excel"></i>';
$excell_str  += '            </button>';
$excell_str  += '        </div>';
        }

        if($show_csv_str == true){
            $fk = "'csv'";
            //process csv_str 
            $csv_str = "";
$csv_str  += '        <div class="input-group-append">';
$csv_str  += '            <button type="button"  onclick="table_filter_download_file('+ $fk +')" class="btn btn-default disable-on-loader">';
$csv_str  += '                <i class="fas fa-arrow-down"></i>';
$csv_str  += '                <i class="fas fa-file-csv"></i>';
$csv_str  += '            </button>';
$csv_str  += '        </div>';
        }

        if($show_pdf_str == true){
            $fk = "'pdf'";
            //process pdf_str 
            $pdf_str = "";
$pdf_str  += '        <div class="input-group-append">';
$pdf_str  += '            <button type="button" onclick="table_filter_download_file('+ $fk +')" class="btn btn-default disable-on-loader">';
$pdf_str  += '                <i class="fas fa-arrow-down"></i>';
$pdf_str  += '                <i class="fas fa-file-pdf"></i>';
$pdf_str  += '            </button>';
$pdf_str  += '        </div>';
        }

        //nyd
        //add hover texts to button
        $str = "";
$str  += '<div class="card-tools table-filter '+ $cls +'" >';
$str  += '    <div class="input-group input-group-sm table-filter-items" >';
$str  += '        '+ $from_date_str +'';
$str  += '        '+ $to_date_str +'';
$str  += '        '+ $search_str +'';
$str  += '        '+ $refresh_btn_str +'';
$str  += '        '+ $excell_str +'';
$str  += '        '+ $csv_str +'';
$str  += '        '+ $pdf_str +'';
$str  += '    </div>';
$str  += '</div>';
        return $str;
    }

    function content_table_pagination($page=1,$total=0,$no_page_buttons=3,$page_size=null,$title=null,
        $use_href_navigation = false,
        $href_tmeplate="#",
        $page_url_variable=":page"
        ){
        $pg_buttons = "";
        $page = intval($page);
        $total = intval($total);
        $no_page_buttons = intval($no_page_buttons);
        $href_tmeplate = trim($href_tmeplate);
        if($no_page_buttons == 0 || $total==0){
            return "";
        }
        if($page_size == null || $page_size == 0){
            $page_size = floor($total / $no_page_buttons);
        }
        $total_numberof_pages = ceil($total / $page_size);
        if($page > $total_numberof_pages){
            $page = $total_numberof_pages;//last page;
        }else if($page < 1){
            $page = 1;
        }
        $mod = $page % $no_page_buttons;
        $acive_button = $page < $no_page_buttons ? $page : ( $mod  == 0 ? $no_page_buttons :  $mod);
        
        $lower_start = ($page_size * ($page - 1)) + 1;
        $upper_end = $page_size * $page;
        $upper_end = $upper_end > $total ? $total : $upper_end;

        $prev_button_href ="href=\""+$href_tmeplate+"\"";
        $prev_button_active = "";

        $next_button_href = "href=\""+$href_tmeplate+"\"";
        $next_button_active = "";

        $onclick_function_name = "pagination_click_page";
        $onclick_page_temp = "onclick=\""+$onclick_function_name+"";

        $onpage_size_change_function_name = "pagination_update_page_size";
        
        //echo $acive_button, $mod, $page;
        for ($i=1; $i <= $no_page_buttons; $i++) { 
            $active = ($acive_button == $i)?"active" : "";
            $button_page_text_number = ($i - $acive_button) + $page;
            $pg_text = $button_page_text_number;
            $href = str_replace($page_url_variable,$pg_text,"href=\""+$href_tmeplate+"\"");
            if($button_page_text_number > $total_numberof_pages){
                $href= " ";
                $active = " disabled";
                $next_button_href = $href;
                $next_button_active = $active;
            }else if($button_page_text_number == $total_numberof_pages){
                $next_button_href = "";
                $next_button_active = "disabled";
            }
            if($acive_button == 1 && $button_page_text_number == 1){
                $prev_button_href = " ";
                $prev_button_active = " disabled";
            }
            $onclick_button_page = "";
            if($use_href_navigation == false){
                $onclick_button_page = $onclick_page_temp + "("+$pg_text+", this)\"";
                $href = ""; //we are using javascript
                if(trim($active) == 'disabled'){
                    $onclick_button_page = "";
                }
            }
            $pg_buttons += "<li class=\"page-item\"><a "+$onclick_button_page+" class=\"page-link render_pagination "+$active+"\" "+$href+" >"+$pg_text+"</a></li>";
        }
        if($title == null || $title == true){
            //use the default title
            if($total == 0){
                $title = "No results to display";
            }else{
                $title = "Showing "+$lower_start+" to "+$upper_end+" of "+$total+" entries";
            }
        }
        $onclick_next_page = "";
        if(trim($next_button_active) == "" && $use_href_navigation == false){
            $next_page_number = $page + 1;
            if($next_page_number > $total_numberof_pages){
                $onclick_next_page = "";
            }else{
                $onclick_next_page =  $onclick_page_temp + "("+$next_page_number+", this)\"";
            }
            $next_button_href = ""; //we are using js
        }else if(trim($next_button_active) == "" && $use_href_navigation == true){
            $next_page_number = $page + 1;
            if($next_page_number > $total_numberof_pages){
                $next_button_href = ""; //dont go anywhere
            }else{
                $next_button_href =  str_replace($page_url_variable,$next_page_number,"href=\""+$href_tmeplate+"\"");
            }
            $onclick_next_page = ""; //we are using href
        }
        $onclick_prev_page = "";
        if(trim($prev_button_active) == "" && $use_href_navigation == false){
            $prev_page_number = $page - 1;
            if($prev_page_number < 1){
                $onclick_prev_page =  "";
            }else{
                $onclick_prev_page =  $onclick_page_temp + "("+$prev_page_number+", this)\"";
            }
            $prev_button_href = ""; //we are using js
        }else if(trim($prev_button_active) == "" && $use_href_navigation == true){
            $prev_page_number = $page - 1;
            if($prev_page_number < 1){
                $prev_button_href = ""; //dont go anywhere
            }else{
                $prev_button_href =  str_replace($page_url_variable,$prev_page_number,"href=\""+$href_tmeplate+"\"");
            }
            $onclick_prev_page = ""; //we are using href
        }
        $go_btn_behavior = "";
        $go_input_keydown = "";
        if($use_href_navigation == false){
            //we rely on our javascript functiion

            //nyd
            //sanitise input value
            
            $go_btn_behavior = "(function(val,btn){ "+$onclick_function_name+"(val,this); return false;})($('.pagination_page_input').val(),this);return false;";

            //input keydown
            //https://stackoverflow.com/questions/15270585/inline-javascript-alert-on-enter-keypress-using-inline-coding
            $go_input_keydown = "javascript: if(event.keyCode == 13){ "+$go_btn_behavior+" }";
        }else{
            //nyd
            //sanitise input value    
            $href_to_go = "'$href_tmeplate'.replace('"+$page_url_variable+"',parseInt(val))";
            $go_btn_behavior = "(function(val,btn){ window.location = "+$href_to_go+"; return false;})($('.pagination_page_input').val(),this);return false;";
            
            //input keydown
            $go_input_keydown = "javascript: if(event.keyCode == 13){ "+$go_btn_behavior+" }";
        }

        $update_pg_size_all_btn_behavior = "";
        $update_pg_size_btn_behavior = "";
        $update_pg_size_btn_keydown = "";
        if($use_href_navigation == false){
            //we rely on our javascript functiion

            //nyd
            //sanitise input value
            
            $update_pg_size_btn_behavior = "(function(val,btn){ "+$onpage_size_change_function_name+"(val,this); return false;})($('.pagination_page_size_input').val(),this);return false;";

            //input keydown
            //https://stackoverflow.com/questions/15270585/inline-javascript-alert-on-enter-keypress-using-inline-coding
            $update_pg_size_btn_keydown = "javascript: if(event.keyCode == 13){ "+$update_pg_size_btn_behavior+" }";

            $update_pg_size_all_btn_behavior = "(function(val,btn){ $('.pagination_page_size_input').val("+$total+"); "+$onpage_size_change_function_name+"("+$total+",this); return false;})();return false;";
            
            
        }else{
            //nyd
            //please define how these controls work in the sceneria of
            //using href
        }

        $str = "";
$str  += '    <h3 class="card-title">'+ $title +'</h3>';
$str  += '    <ul class="pagination pagination-sm float-right mb-0 ml-10" >';
$str  += '        <li class="page-item"><a class="page-link  render_pagination disabled" > Show </a></li>';
$str  += '        <li class="page-item"><a class="page-link btn btn-flat btn-primary" onclick="'+ $update_pg_size_all_btn_behavior +'" > All </a></li>';
$str  += '        <li class="page-item">';
$str  += '            <a class="page-link  disabled" style="padding:2px;" >';
$str  += '                <input type="number" min="1"  max="'+ $total +'" value="'+ $page_size +'" onkeydown="'+ $update_pg_size_btn_keydown +'"  class="pagination_page_size_input" />';
$str  += '            </a>';
$str  += '        </li>';
$str  += '        <li class="page-item"><a class="page-link render_pagination disabled" > items per page </a></li>';
$str  += '        <li class="page-item"><a class="page-link btn btn-primary" onclick="'+ $update_pg_size_btn_behavior +'" > Update </a></li>';
$str  += '    </ul>';
$str  += '    <ul class="pagination pagination-sm float-right mb-0 ml-10" >';
$str  += '        <li class="page-item"><a class="page-link  render_pagination disabled" > Move to Page </a></li>';
$str  += '        <li class="page-item">';
$str  += '            <a class="page-link  disabled" style="padding:2px;" >';
$str  += '                <input type="number" min="1" value="'+ $page +'" onkeydown="'+ $go_input_keydown +'"  class="pagination_page_input" max="'+ $total_numberof_pages +'" />';
$str  += '            </a>';
$str  += '        </li>';
$str  += '        <li class="page-item"><a class="page-link render_pagination disabled" > of '+ $total_numberof_pages +' </a></li>';
$str  += '        <li class="page-item"><a class="page-link btn btn-primary" onclick="'+ $go_btn_behavior +'" > Go </a></li>';
$str  += '    </ul>';
$str  += '    <ul class="pagination pagination-sm float-right mb-0" >';
$str  += '        <li class="page-item"><a '+ $onclick_prev_page +' class="page-link render_pagination '+ $prev_button_active +'" '+ $prev_button_href +' >&laquo;</a></li>';
$str  += '        '+ $pg_buttons +'';
$str  += '        <li class="page-item"><a '+ $onclick_next_page +' class="page-link render_pagination '+ $next_button_active +'" '+ $next_button_href +' >&raquo;</a></li>';
$str  += '    </ul>';
$str  += '';
$str  += '';
        return $str;
    }

    function pagination($page=1,$total=0,$no_page_buttons=3,$page_size=null,$title=null,
    $use_href_navigation = false,
    $href_tmeplate="#",
    $page_url_variable=":page"){
        $temp = content_table_pagination($page,$total,$no_page_buttons,$page_size,$title,
            $use_href_navigation, $href_tmeplate, $page_url_variable
        );
        return $temp;
    }


    function content_table($id="content_table_card",$title="",$headers=array(),$data=array(),$footers=array(),$height=500,$tools="",$pagination="",$loader=""){
        $header = "";
        for ($i=0; $i < count($headers); $i++) { 
            $text = $headers[$i];
            $header +=  starts_with($text,"<th") ? $text : "<th>"+$text+"</th>";
        }
        $body = "";
        for ($i=0; $i < count($data); $i++) { 
            $row = $data[$i];
            $body += "<tr>";
            for ($j=0; $j < count($row); $j++) { 
                $text = $row[$j];
                $body += "<td>"+$text+"</td>";
            }
            $body += "</tr>";
        }
        $footer = "";
        for ($i=0; $i < count($footers); $i++) { 
            $text = $footers[$i];
            $footer +=  starts_with($text,"<th") ? $text : "<th>"+$text+"</th>";
        }
        $height = strval($height) + "px";
        if(strlen($pagination)>0){
            $pagination= "<div class=\"card-footer\">"+$pagination+"</div>";
        }
        $id = strlen($id) > 0 ? "id=\""+$id+"\"" : "";
        $str = "";
$str  += '<div class="card" '+ $id +' >';
$str  += '    <div class="card-header">';
$str  += '        <h3 class="card-title">'+ $title +'</h3>';
$str  += '        '+ $tools +'';
$str  += '    </div>';
$str  += '    '+ $loader +'';
$str  += '    <!-- /.card-header -->';
$str  += '    <div class="card-body table-responsive p-0" style="height: '+ $height +';">';
$str  += '        <table class="table table-head-fixed table-foot-fixed  text-nowrap"  >';
$str  += '            <thead>';
$str  += '                <tr>'+ $header +'</tr>';
$str  += '            </thead>';
$str  += '            <tbody>';
$str  += '                '+ $body +'';
$str  += '            </tbody>';
$str  += '            <tfoot>';
$str  += '                '+ $footer +'';
$str  += '            </tfoot>';
$str  += '        </table>';
$str  += '    </div>';
$str  += '    <!-- /.card-body -->';
$str  += '    '+ $pagination +'';
$str  += '</div>';
$str  += '<!-- /.card -->';
        return $str;
    }
