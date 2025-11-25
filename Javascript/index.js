import { EditorView, basicSetup } from "https://esm.sh/codemirror@6.0.2";
import { css } from "https://esm.sh/@codemirror/lang-css@6.2.1";


let styleSheet = document.getElementById("main-css").sheet;
const applyButton = document.querySelector("button.apply-btn")
const allowedCodeWords = ["child-square","parent-square","display","flex","inline-flex","flex-direction","row","row-reverse","column","column-reverse","flex-wrap","nowrap","wrap","wrap-reverse","flex-flow","justify-content","flex-start","flex-end","center","space-between","space-around","space-evenly","align-items","stretch","baseline","align-content","flex-grow","flex-shrink","flex-basis","auto","none","initial","align-self","order",];

let levelCounter = 0;
let levelStarter = [`.parent-square {
    
    }`, `.parent-square {
    
    }`];



let cssEditor = new EditorView({
    doc: levelStarter[levelCounter],
    extensions: [basicSetup, css()],
    parent: document.getElementById("parentCodeWindow")
});
function levelProgressFunc() {
    if (document.querySelector(`.level-${levelCounter + 2}`)) {
        // hiding current level
        document.querySelector(`.level-${levelCounter + 1}`).style.display = "none";
        levelCounter++;
        // showing next level
        document.querySelector(`.level-${levelCounter + 1}`).style.display = "block";
        cssEditor.dispatch({
            changes: {
                from: 0,
                to: cssEditor.state.doc.length,
                insert: levelStarter[levelCounter],
            }
        })
    } else {
        console.log("You Won!, but there is no next level for now")
    }
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

    styleSheet.insertRule(`.level-${levelCounter + 1} ` + writtenCode, styleSheet.cssRules.length);
    let miniBoxes = document.querySelectorAll(`.level-${levelCounter + 1} .parent-square .child-square`);
    miniBoxes.forEach((miniBox) => {miniBox.style.alignSelf = "auto";});
    
    let winCondition;



    switch(levelCounter) {
        // level one
        case 0:
        winCondition = levelOneWinCondition();
        break;

        // level two
        case 1:
        winCondition = levelTwoWinCondition();
        break;
    }

    if (winCondition === true) {
        setTimeout(levelProgressFunc, 1500)
    } else {
        document.querySelector("p.wrong").style.display = "block";
    }
}






function levelOneWinCondition() {
    // checking if all mini squares are at center
    let squareParent = document.querySelector(`.level-${levelCounter + 1} .parent-square`);

    if (getComputedStyle(squareParent).alignItems === "center" && getComputedStyle(squareParent).flexDirection === "row") {
        return true;
    } else {
        return false;
    }
}


function levelTwoWinCondition() {
    // checking if all mini squares at the bottom
    let squareParent = document.querySelector(`.level-${levelCounter + 1} .parent-square`);


    if (getComputedStyle(squareParent).alignItems === "flex-end" && getComputedStyle(squareParent).flexDirection === "row") {
        return true;
    } else {
        return false;
    }
}