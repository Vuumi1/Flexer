import { EditorView, basicSetup } from "https://esm.sh/codemirror@6.0.2";
import { css } from "https://esm.sh/@codemirror/lang-css@6.2.1";


let styleSheet = document.getElementById("main-css").sheet;
const applyButton = document.querySelector("button.apply-btn")
const allowedCodeWords = ["child-square","parent-square","display","flex","inline-flex","flex-direction","row","row-reverse","column","column-reverse","flex-wrap","nowrap","wrap","wrap-reverse","flex-flow","justify-content","flex-start","flex-end","center","space-between","space-around","space-evenly","align-items","stretch","baseline","align-content","flex-grow","flex-shrink","flex-basis","auto","none","initial","align-self","order",];

let levelCounter = 0;
let levelStarter = [`.parent-square {
    
    }`]



const cssEditor = new EditorView({
    doc: levelStarter[levelCounter],
    extensions: [basicSetup, css()],
    parent: document.getElementById("parentCodeWindow")
});
function levelProgressFunc() {
    cssEditor = new EditorView({
        doc: levelStarter[levelCounter],
        extensions: [basicSetup, css()],
        parent: document.getElementById("parentCodeWindow")
    });
}




applyButton.addEventListener("click", () => {applyCode()})



function checkCode(code) {
    const allCodeWords = code.toLowerCase().match(/[a-z-]+/g);


    for (let i = 0; i < allCodeWords.length; i++) {
        if (!allowedCodeWords.includes(allCodeWords[i])) {
            return false;
        }
    }
}


function applyCode() {
    const writtenCode = cssEditor.state.doc.toString();
    let errorMSG = document.querySelector("p.error");
    if (checkCode(writtenCode) === false) {
        errorMSG.style.display = "block";
        errorMSG.innerText = "You Can Only Use Flex Properties."
        return;
    }

    styleSheet.insertRule(writtenCode, styleSheet.cssRules.length);
    let miniBoxes = document.querySelectorAll(".parent-square .child-square");
    miniBoxes.forEach((miniBox) => {miniBox.style.alignSelf = "auto";});
    
    let winCondition;
    winCondition = levelOneWinCondition();

    if (winCondition === true) {
        levelCounter++;
        console.log(levelCounter);
    } else {
        document.querySelector("p.wrong").style.display = "block";
    }
}






function levelOneWinCondition() {
    // checking if all flex elements are at center
    let squareParent = document.querySelector(".parent-square");

    if (getComputedStyle(squareParent).alignItems === "center") {
        return true;
    } else {
        return false;
    }
}