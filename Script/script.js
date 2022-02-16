// 
//import {checkTie, checkWinner} from './validator.js';

// Options
const selectBox = document.querySelector(".select-box");
const selectBtnX = selectBox.querySelector(".options .playerX");
const selectBtnO = selectBox.querySelector(".options .playerO");
const selectSize = document.querySelector(".list-boards");

// Game
const playBoard = document.querySelector(".play-board");
const players = document.querySelector(".players");
const playArea = document.querySelector(".play-area");
var allBox;

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

var sizeBoard = 2;

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
function checkRows(playerSign) {
    var isWinner = false;
    var cont;
    
    allBox.forEach((box, i) => {
        if (i % sizeBoard === 0)
            cont = 0;

        if (playerSign === box.id)
            cont++;

        if (cont === sizeBoard)
            isWinner = true;
    });
    return isWinner;
}

function checkColumns(playerSign) {
    var cont;

    for (let i = 0; i < sizeBoard; i++) {
        cont = 0;
        for (let j = 0; j < sizeBoard; j++) {
            if (allBox[i + j * sizeBoard].id === playerSign)
                cont++;
        }
        if (cont === sizeBoard)
            return true;
    }
    return false;
}

function checkDiagonals(playerSign) {
    var cont = 0;

    for (let i = 0; i < sizeBoard; i++) {
        if (allBox[(sizeBoard + 1) * i].id === playerSign)
            cont++;
    }

    if (cont === sizeBoard)
        return true;

    cont = 0;

    for (let i = 0; i < sizeBoard; i++) {
        if (allBox[(sizeBoard - 1) * (i + 1)].id === playerSign)
            cont++;
    }

    if (cont === sizeBoard)
        return true;

    return false;
}

function checkWinner(playerSign) {
    return (checkRows(playerSign) ||
        checkColumns(playerSign) ||
        checkDiagonals(playerSign));
}

function checkTie() {
    var isTie = false;
    var cont = 0;
    
    allBox.forEach((box, i) => {
        if (box.id === xSign || box.id === oSign)
            cont++;

        if (cont === allBox.length)
            isTie = true;
    });
    return isTie;
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

//
function getSizeBoard(element){
    sizeBoard = parseInt(element.value);
    setupBoard();
}

// Replay
replayBtn.onclick = () => {
    window.location.reload();
}

// Setup
function setupDropBox(){
    selectSize.setAttribute("onchange", "getSizeBoard(this)");
}

function setupBoard(){
    setupBoxes();
    allBox = document.querySelectorAll("section span");
    setupSpanItems();
}

function setupBoxes(){
    var cont = '1';
    var boxes = '';

    for (let i = 0; i < sizeBoard; i++){
        boxes += '<section>';
        for (let j = 0; j < sizeBoard; j++){
            boxes+=`<span class="box${cont}"></span>`;
            cont++;
        }
        boxes += '</section>'
    }

    playArea.innerHTML = boxes;
}

function setupSpanItems(){
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}


window.onload = () => {
    setupDropBox();
    setupBoard();
}