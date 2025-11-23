let textArea = document.getElementById("codeWindow")
const codeWindow = CodeMirror.fromTextArea(textArea, {
    mode: "css",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
});



function getCode() {
    console.log(codeWindow.getValue());
}