// 
//import {checkTie, checkWinner} from './validator.js';

// Options
const selectBox = document.querySelector(".select-box");
const selectBtnX = selectBox.querySelector(".options .playerX");
const selectBtnO = selectBox.querySelector(".options .playerO");

// Game
const playBoard = document.querySelector(".play-board");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");

// Result
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

// Icons
const playerXIcon = "fas fa-times";
const playerOIcon = "far fa-circle";

// Vars
const xSign = "X";
const oSign = "O";
var playerSign = xSign;
var runBot = true;



// Options
selectBtnX.onclick = () => {
    goToGameBoard();
}

selectBtnO.onclick = () => {
    goToGameBoard();
    players.setAttribute("class", "players active player");
}

// Go To
function goToGameBoard() {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

function goToResultBox() {
    resultBox.classList.add("show");
    playBoard.classList.remove("show");
}

// Game
function setIconToBox(element, icon) {
    element.innerHTML = `<i class="${icon}"></i>`;
    element.setAttribute("id", playerSign);
}

function disableElement(element) {
    element.style.pointerEvents = "none";
}

function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = oSign;
        setIconToBox(element, playerOIcon);
        players.classList.remove("active");
    } else {
        setIconToBox(element, playerXIcon);
        players.classList.add("active");
    }
    selectWinner();

    disableElement(element);
    disableElement(playBoard);

    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runBot);
    }, randomTimeDelay);
}

// Bot
function getFreePositions(freePositions) {
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            freePositions.push(i);
        }
    }
}

function bot() {
    let freePositions = [];
    if (runBot) {
        playerSign = oSign;
        getFreePositions(freePositions);
        let randomBox = freePositions[Math.floor(Math.random() * freePositions.length)];

        if (freePositions.length > 0) {
            if (players.classList.contains("player")) {
                playerSign = xSign;
                setIconToBox(allBox[randomBox], playerXIcon);
                players.classList.add("active");
            } else {
                setIconToBox(allBox[randomBox], playerOIcon);
                players.classList.remove("active");
            }
            selectWinner();
        }
        disableElement(allBox[randomBox]);
        playBoard.style.pointerEvents = "auto";

        playerSign = xSign;
    }
}

// Validators
function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return (getIdVal(val1) == sign &&
        getIdVal(val2) == sign &&
        getIdVal(val3) == sign);
}

function checkWinner(playerSign) {
    return (checkIdSign(1, 2, 3, playerSign) ||
        checkIdSign(4, 5, 6, playerSign) ||
        checkIdSign(7, 8, 9, playerSign) ||
        checkIdSign(1, 4, 7, playerSign) ||
        checkIdSign(2, 5, 8, playerSign) ||
        checkIdSign(3, 6, 9, playerSign) ||
        checkIdSign(1, 5, 9, playerSign) ||
        checkIdSign(3, 5, 7, playerSign));
}

function checkTie() {
    return (getIdVal(1) != "" &&
        getIdVal(2) != "" &&
        getIdVal(3) != "" &&
        getIdVal(4) != "" &&
        getIdVal(5) != "" &&
        getIdVal(6) != "" &&
        getIdVal(7) != "" &&
        getIdVal(8) != "" &&
        getIdVal(9) != "");
}

function selectWinner() {
    if (checkWinner(playerSign)) {
        runBot = false;
        setTimeout(() => {
            goToResultBox();
        }, 1000);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    } else {
        if (checkTie()) {
            runBot = false;
            setTimeout(() => {
                goToResultBox();
            }, 1000);
            wonText.textContent = "Game ends in a draw!";
        }
    }
}

// Replay
replayBtn.onclick = () => {
    window.location.reload();
}

// Setup
window.onload = () => {
    for (let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}