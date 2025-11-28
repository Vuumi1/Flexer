import { EditorView, basicSetup } from "https://esm.sh/codemirror@6.0.2";
import { css } from "https://esm.sh/@codemirror/lang-css@6.2.1";





let styleSheet = document.getElementById("main-css").sheet;
const applyButton = document.querySelector("button.apply-btn")
const allowedCodeWords = ["-" ,"nth-child" ,"last-child" ,"first-child" ,"child-square","parent-square","display","flex","inline-flex","flex-direction","row","row-reverse","column","column-reverse","flex-wrap","nowrap","wrap","wrap-reverse","flex-flow","justify-content","flex-start","flex-end","center","space-between","space-around","space-evenly","align-items","stretch","baseline","align-content","flex-grow","flex-shrink","flex-basis","auto","none","initial","align-self","order"];

let levelCounter = 0;
let levelStarter = [`.level-${levelCounter + 1} .parent-square {
    
    }`, `.level-${levelCounter + 2} .parent-square {
    
    }`, `.level-${levelCounter + 3} .parent-square {
    
    }`, `.level-${levelCounter + 4} .parent-square .child-square:first-child {
    
    }
    
    .level-${levelCounter + 4} .parent-square .child-square:nth-child(2) {
    
    }
    
    .level-${levelCounter + 4} .parent-square .child-square:last-child {
    
    }`, `.level-${levelCounter + 5} .parent-square .child-square:first-child {
    
    }
    
    .level-${levelCounter + 5} .parent-square .child-square:nth-child(2) {
    
    }
    
    .level-${levelCounter + 5} .parent-square .child-square:last-child {
    
    }`, `.level-${levelCounter + 6} .parent-square .child-square:first-child {
    
    }
    
    .level-${levelCounter + 6} .parent-square .child-square:nth-child(2) {
    
    }
    
    .level-${levelCounter + 6} .parent-square .child-square:last-child {
    
    }`, `.level-${levelCounter + 7} .parent-square {
    
    }`, `.level-${levelCounter + 8} .parent-square {
    
    }
    
    .level-${levelCounter + 8} .parent-square .child-square:first-child {
    
    }
    
    .level-${levelCounter + 8} .parent-square .child-square:nth-child(2) {
    
    }

    .level-${levelCounter + 8} .parent-square .child-square:nth-child(3) {
    
    }
    
    .level-${levelCounter + 8} .parent-square .child-square:last-child {
    
    }`, `.level-${levelCounter + 9} .parent-square {
    
    }

    .level-${levelCounter + 9} .parent-square .child-square:nth-child(2) {
    
    }

    .level-${levelCounter + 9} .parent-square .child-square:nth-child(3) {
    
    }`, `.level-${levelCounter + 10} .parent-square {
    
    }
    
    .level-${levelCounter + 10} .parent-square .child-square:first-child {
    
    }
    
    .level-${levelCounter + 10} .parent-square .child-square:nth-child(2) {
    
    }

    .level-${levelCounter + 10} .parent-square .child-square:nth-child(3) {
    
    }

    .level-${levelCounter + 10} .parent-square .child-square:nth-child(4) {
    
    }
    
    .level-${levelCounter + 10} .parent-square .child-square:last-child {
    
    }`];



let cssEditor = new EditorView({
    doc: levelStarter[levelCounter],
    extensions: [basicSetup, css()],
    parent: document.getElementById("parentCodeWindow")
})



function readOnlyCode(editorState) {
    switch(levelCounter) {
        case 0:
        return [{from: 0, to: editorState.doc.line(1).to}]
    }
}


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
        console.log(allCodeWords[i])
        if (allCodeWords[i] === "level-") {
            continue;
        }
        if (!allowedCodeWords.includes(allCodeWords[i])) {
            return false;
        }
    }
}


function applyCode() {
    const writtenCode = cssEditor.state.doc.toString();
    let CSSrule = "";
    let errorMSG = document.querySelector("p.error");
    if (checkCode(writtenCode) === false) {
        errorMSG.style.display = "block";
        errorMSG.innerText = "You Can Only Use Flex Properties."
        return;
    }


    for (let i = 0; i < writtenCode.length; i++) {
        CSSrule = CSSrule + writtenCode[i];

        if (writtenCode[i] === "}") {
            styleSheet.insertRule(CSSrule, styleSheet.cssRules.length);
            CSSrule = "";
        }
    }
    let miniBoxes = document.querySelectorAll(`.level-${levelCounter + 1} .parent-square .child-square`);
    let parentBox = document.querySelector(`.level-${levelCounter + 1} .parent-square`);

    if (getComputedStyle(parentBox).alignItems !== "stretch" && getComputedStyle(parentBox).alignItems !== "normal") {
        console.log("test", getComputedStyle(parentBox).alignItems)
        miniBoxes.forEach((miniBox) => {miniBox.style.alignSelf = "auto";});
    }
    
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

        // level three
        case 2:
        winCondition = levelThreeWinCondition();
        break;

        // level four
        case 3:
        winCondition = levelFourWinCondition();
        break;

        // level five
        case 4:
        winCondition = levelFiveWinCondition();
        break;

        // level six
        case 5:
        winCondition = levelSixWinCondition();
        break;

        // level seven
        case 6:
        winCondition = levelSevenWinCondition();
        break;

        // level 8
        case 7:
        winCondition = levelEightWinCondition();
        break;

        // level 9
        case 8:
        winCondition = levelNineWinCondition();
        break;

        // level 10
        case 9:
        winCondition = levelTenWinCondition();
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



function levelThreeWinCondition() {
    // checking if all mini squares are vertically centered
    let squareParent = document.querySelector(`.level-${levelCounter + 1} .parent-square`);



    if (getComputedStyle(squareParent).alignItems === "normal" && getComputedStyle(squareParent).flexDirection === "column" || getComputedStyle(squareParent).alignItems === "center" && getComputedStyle(squareParent).flexDirection === "column") {
        return true;
    } else {
        return false;
    }
}



function levelFourWinCondition() {
    // checking if first square is top right, second is middle, third is bottom left
    let firstMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:first-child`);
    let secondMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(2)`);
    let thirdMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:last-child`);

    if (getComputedStyle(firstMiniSquare).alignSelf === "flex-start" && getComputedStyle(secondMiniSquare).alignSelf === "center" && getComputedStyle(thirdMiniSquare).alignSelf === "flex-end") {
        return true;
    } else {
        return false;
    }
}




function levelFiveWinCondition() {
    // checking if first square is top left, and third is bottom left, and second is middle

    let firstMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:first-child`);
    let secondMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(2)`);
    let thirdMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:last-child`);


    if (getComputedStyle(firstMiniSquare).alignSelf === "flex-start", getComputedStyle(secondMiniSquare).alignSelf === "center" && getComputedStyle(thirdMiniSquare).alignSelf === "flex-start") {
        return true;
    } else {
        return false;
    }
}





function levelSixWinCondition() {
    // reverse squares

    let firstMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:first-child`);
    let secondMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(2)`);
    let thirdMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:last-child`);

    if (parseInt(getComputedStyle(thirdMiniSquare).order) < parseInt(getComputedStyle(secondMiniSquare).order) && parseInt(getComputedStyle(secondMiniSquare).order) < parseInt(getComputedStyle(firstMiniSquare).order)) {
        return true;
    } else {
        return false;
    }
}



function levelSevenWinCondition() {
    // invert diagonal

    let squareParent = document.querySelector(`.level-${levelCounter + 1} .parent-square`);

    if (getComputedStyle(squareParent).flexDirection === "column-reverse") {
        return true;
    } else {
        return false;
    }
}



function levelEightWinCondition() {
    // checking if 4 at top left, 1 at top right, 2 and 3 bottom center
    let squareParent = document.querySelector(`.level-${levelCounter + 1} .parent-square`);

    let firstMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:first-child`);
    let secondMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(2)`);
    let thirdMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(3)`);
    let fourthMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:last-child`);


    if (getComputedStyle(squareParent).flexDirection === "row" && parseInt(getComputedStyle(firstMiniSquare).order) > parseInt(getComputedStyle(fourthMiniSquare).order) && parseInt(getComputedStyle(secondMiniSquare).order) === parseInt(getComputedStyle(thirdMiniSquare).order) && parseInt(getComputedStyle(secondMiniSquare).order) < parseInt(getComputedStyle(firstMiniSquare).order) && parseInt(getComputedStyle(secondMiniSquare).order) > parseInt(getComputedStyle(fourthMiniSquare).order) && getComputedStyle(firstMiniSquare).alignSelf === "flex-start" && getComputedStyle(fourthMiniSquare).alignSelf === "flex-start" && getComputedStyle(secondMiniSquare).alignSelf === "flex-end" && getComputedStyle(thirdMiniSquare).alignSelf === "flex-end") {
        console.log("that was hard");
        return true;
    } else {
        return false
    }
}




function levelNineWinCondition() {
    let squareParent = document.querySelector(`.level-${levelCounter + 1} .parent-square`);

    let firstMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:first-child`);
    let secondMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(2)`);
    let thirdMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(3)`);
    let fourthMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:last-child`);

    console.log(`${getComputedStyle(squareParent).flexDirection}, ${getComputedStyle(squareParent).justifyContent}, ${getComputedStyle(secondMiniSquare).alignSelf}, getComputedStyle(thirdMiniSquare).alignSelf`)
    if (getComputedStyle(squareParent).flexDirection === "row" && getComputedStyle(squareParent).justifyContent === "space-between" && getComputedStyle(secondMiniSquare).alignSelf === "flex-end" && getComputedStyle(thirdMiniSquare).alignSelf === "flex-start") {
        return true;
    } else {
        return false;   
    }
}



function levelTenWinCondition() {
    let squareParent = document.querySelector(`.level-${levelCounter + 1} .parent-square`);

    let firstMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:first-child`);
    let secondMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(2)`);
    let thirdMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(3)`);
    let fourthMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:nth-child(4)`);
    let fifthMiniSquare = document.querySelector(`.level-${levelCounter + 1} .parent-square .child-square:last-child`);


    if (getComputedStyle(squareParent).justifyContent === "space-between" && getComputedStyle(squareParent).flexDirection === "row-reverse" && getComputedStyle(firstMiniSquare).alignSelf === "flex-start" && getComputedStyle(fifthMiniSquare).alignSelf === "flex-start" && getComputedStyle(secondMiniSquare).alignSelf === "flex-end" && getComputedStyle(fourthMiniSquare).alignSelf === "flex-end" && getComputedStyle(thirdMiniSquare).alignSelf === "center") {
        return true;
    } else {
        return false;
    }
}