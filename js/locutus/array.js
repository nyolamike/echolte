var array = exports.array =  function array() {
    var temp = [];
    var args = Array.prototype.slice.call(arguments);
    for (var index = 0; index < args.length; index++) {
        var arg = args[index];
        temp.push(arg);
    }
    return temp;
}