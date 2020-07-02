
function echo(){
    var args = Array.prototype.slice.call(arguments);
    var content = args.join('');
    document.currentScript.parentElement.replaceChild(document.currentScript, content);
}


function $_SERVER($key){
    if($key == 'REQUEST_URI'){
        return window.location.pathname;
    }
    throw new Error('Unsupported key' + $key);
}

function func_get_args(items){
    var func_args = Array.prototype.slice.call(items);
    return func_args;
}

function func_num_args(items){
    var func_args = func_get_args(items);
    return func_args.length;
}




/*
//https://www.codementor.io/@dhruvkumarjha/extending-the-javascript-string-prototype-f3o5xjia6
function phpfn($str){
    
    //we can access the text via 'this'
    var _temp = this.toString();
    _temp = _temp == '[object Window]' ? "" : _temp;
    _temp += $str;
    return _temp;
}
String.prototype.phpfn = phpfn;


    td = function (signature of td){
        var temp = td(cleaned signatures);
        this.content = this.content + temp;
        return  ;
    }

ace("#users tbody")
.td(
    td().xx().yy().zz()
)
.td()
.td()
.echo();

eco()
    .td()
    .td()
    .td()
    .ace("#users tbody");

*/