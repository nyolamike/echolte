//https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript/18108463
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function unEscapeHtml(safe) {
    return safe
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
}

//https://github.com/googlearchive/code-prettify/blob/master/docs/getting_started.md
window.addEventListener('load', function(event) {
    var dirtyEscapedCode = document.getElementById("output").innerHTML;
    var dirtyCode = unEscapeHtml(dirtyEscapedCode);
    var formatedCode = prettier.format(dirtyCode, {
        parser: "html",
        plugins: prettierPlugins
    });
    var escapedFormatedCode = escapeHtml(formatedCode);
    document.getElementById("output").innerHTML = escapedFormatedCode;

    PR.prettyPrint();
}, false);