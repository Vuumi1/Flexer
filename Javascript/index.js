import { EditorView, basicSetup } from "https://esm.sh/codemirror@6.0.2";
import { css } from "https://esm.sh/@codemirror/lang-css@6.2.1";


let styleSheet = document.getElementById("main-css").sheet;




const cssEditor = new EditorView({
    doc: "/*START*/",
    extensions: [basicSetup, css()],
    parent: document.getElementById("parentCodeWindow")
});



function applyCode() {
    const writtenCode = cssEditor.state.doc.toString();
    styleSheet.insertRule(writtenCode, styleSheet.cssRules.length)
    
}



