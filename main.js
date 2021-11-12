//TICTACTOE

// 0 = player1   1 = player2
let currentPlayer = 1;
let isPlaying = false;
let gameMode = 0;
let isWin = false;
let winner = 0;
let turn = 0;
let roundTime = 16;
let currentTime = 15;
let scores = [0, 0];
let playersCointainer = document.getElementById("players");
let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let gameContainer = document.getElementsByClassName("game-container")[0];
let gameModeContainer = document.getElementById("game-mode");
let startButton = document.getElementById("start-button");
let timerElement = document.getElementById("time-bar");
let replay = document.getElementById("reset-button");
// 0 = empty  1 = X   2 = 0
let currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * Function to draw all the items
 * @param email {string}
 * @return  {boolean}
 */

function draw() {
    //We remove all childs from gameScreen
    let container = document.getElementById("screen");

    let rowI = 0;
    let rowC = 0;
    while (container.firstChild) {
        container.firstChild.remove()
    }


    //We create the 3 rows with 3 elements each one and draw the content depending on currentState
    while (rowI < 3) {
        let tempRow = document.createElement("div");
        tempRow.classList.add("row");
        for (let i = 0; i < currentState.length; i++) {

            let item = createItem(i);
            tempRow.appendChild(item);
            rowC++;
            if (rowC == 3) {
                container.appendChild(tempRow);
                tempRow = document.createElement("div");
                tempRow.classList.add("row");
                rowC = 0;
                rowI++;
            }
        }
    }


    currentPlayerRender();
    checkStateGame();
    if (isWin || turn == 10) {
        changeVisibility(playersCointainer, replay);
        if (isWin) {
            let winnerStr = winner == 1 ? "X" : "O"
            document.getElementById("result").innerHTML = "Ha ganado la partida " + winnerStr;
            scores[winner == 1 ? 0 : 1]++;
            updateScores();
            changeVisibility(timerElement);
        } else {
            document.getElementById("result").innerHTML = "Ha acabado la partida com empate"
        }

        isPlaying = false;

    }



    /**
     * Verifies if the string is in a valid email format
     * @param item position value {int}
     * @return  {HTMLElement}
     */
    function createItem(pos) {
        let tempElement = document.createElement("div");
        tempElement.classList.add("item");
        tempElement.setAttribute("position", pos);
        tempElement.addEventListener("click", clickItem);
        tempElement.addEventListener("mouseenter", mouseEnterItem);
        tempElement.addEventListener("mouseleave", mouseLeaveItem);

        tempElement.innerHTML = currentState[pos] == 0 ? "" : currentState[pos] == 1 ? "X" : "O";
        return tempElement;
    }
    let tempFilled = false;

    function clickItem(e) {

        if (isPlaying && tempFilled) {
            if (gameMode == 1 && currentPlayer == 1) {} else {
                tempFilled = false;
                currentState[parseInt(e.target.getAttribute("position"))] = currentPlayer + 1;
                turn++;
                currentTime = roundTime;
                draw();
            }
        }
    }


    function mouseEnterItem(e) {

        if (e.target.innerHTML == "" && isPlaying) {
            tempFilled = true;
            e.target.innerHTML = currentPlayer == 0 ? "X" : "O"
            e.target.classList.add("item-hint");
        }
    }

    function mouseLeaveItem(e) {
        if (tempFilled && isPlaying) {
            tempFilled = false;
            e.target.innerHTML = "";
            e.target.classList.remove("item-hint");
        }
    }

    function updateScores() {
        document.getElementById("score-text-p1").innerHTML = `X = ${scores[0]}`;
        document.getElementById("score-text-p2").innerHTML = `O = ${scores[1]}`;


    }


}

/**
 * Change the header to the current player
 */

function currentPlayerRender() {

    if (isPlaying) {
        currentPlayer == 0 ? currentPlayer = 1 : currentPlayer = 0;
        if (currentPlayer == 0 && player1.classList.contains("no-visibility")) {
            changeVisibility(player1, player2);
        }
        if (currentPlayer == 1 && player2.classList.contains("no-visibility")) {
            changeVisibility(player1, player2);
        }
    }

}
/**
 * Function to start the timer
 */

function startTimer() {


    timerElement.innerHTML = currentTime;

    let loopTimer = setInterval(() => {
        //How much time the robot takes to play
        let robotSpeed = 2;
        if (currentPlayer == 1 && gameMode == 1 && currentTime < roundTime - robotSpeed) {
            currentTime = roundTime;
            randomPick();
        }
        if (currentTime <= 0.5) {
            currentTime = roundTime;
            randomPick();
        } else {
            currentTime -= 0.2;
            timerElement.innerHTML = parseInt(currentTime);
        }
        if (!isPlaying) {
            clearInterval(loopTimer);
        }

    }, 200);


}
/**
 * Function to select a random spot
 */
function randomPick() {
    let choiceMake = false;
    while (!choiceMake) {
        for (let index = 0; index < currentState.length; index++) {

            if (currentState[index] == "") {
                let randomNumber = getRandomInt(0, 5);
                if (randomNumber == 1 && !choiceMake) {
                    currentState[index] = currentPlayer + 1;
                    choiceMake = true;
                }

            }
        }
    }

    currentTime = roundTime;
    turn++;
    draw();

}

/**
 * Retorna un entero aleatorio entre min (incluido) y max (excluido)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Funtion to define gameMode
 * @param  gameMode {int} 
 */
function setGameMode(gameM) {
    gameMode = gameM;
    changeVisibility(gameModeContainer);
    start();
}
/**
 * Funtion to setup game
 */
function setupGame() {

    changeVisibility(startButton, gameModeContainer);
}
/**
 * 
 * Function to reset the game
 */
function resetClick() {
    currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    changeVisibility(gameContainer, replay);
    document.getElementById("result").innerHTML = ""
    start();
    currentPlayer = 1;
    draw();


}

/**
 * Function to start the game
 */
function start() {
    let title = document.getElementById("title");
    let scoresContainer = document.getElementById("scores");
    title.classList.add("in-game-header");
    currentTime = 15;
    isPlaying = true;
    isWin = false;
    turn = 1;
    changeVisibility(playersCointainer, gameContainer, timerElement, scoresContainer);
    startTimer();
    currentPlayerRender();

}

/**
 * Function that adds or removes no-visibility
 * @param HTMLelements {...any} 
 */
function changeVisibility(...elements) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains("no-visibility")) {
            elements[i].classList.remove("no-visibility");
        } else {
            elements[i].classList.add("no-visibility");
        }

    }
}

/**
 * Function to check if the game ended.
 */
function checkStateGame() {

    if (turn > 5) {
        if (currentState[0] == "1" || currentState[0] == "2") {

            if (currentState[0] == currentState[1]) {

                if (currentState[1] == currentState[2]) {

                    isWin = true;
                    winner = currentState[0];
                    return
                }
            }
            if (currentState[0] == currentState[3]) {
                if (currentState[3] == currentState[6]) {
                    isWin = true;
                    winner = currentState[0];
                    return
                }
            }
            if (currentState[0] == currentState[4]) {
                if (currentState[4] == currentState[8]) {
                    isWin = true;
                    winner = currentState[0];
                    return
                }
            }
        }


        if (currentState[1] == "1" || currentState[1] == "2") {

            if (currentState[1] == currentState[4]) {

                if (currentState[4] == currentState[7]) {

                    isWin = true;
                    winner = currentState[1];
                    return
                }
            }
        }
        if (currentState[2] == "1" || currentState[2] == "2") {
            if (currentState[2] == currentState[4]) {
                if (currentState[4] == currentState[6]) {
                    isWin = true;
                    winner = currentState[2];
                    return
                }
            }
            if (currentState[2] == currentState[5]) {
                if (currentState[5] == currentState[8]) {
                    isWin = true;
                    winner = currentState[2];
                    return
                }
            }
        }
        if (currentState[3] == "1" || currentState[3] == "2") {
            if (currentState[3] == currentState[4]) {
                if (currentState[4] == currentState[5]) {
                    isWin = true;
                    winner = currentState[3];
                    return
                }
            }
        }
        if (currentState[6] == "1" || currentState[6] == "2") {
            if (currentState[6] == currentState[7]) {
                if (currentState[7] == currentState[8]) {
                    isWin = true;
                    winner = currentState[6]
                    return

                }
            }

        }
    }
}

//Run draw func at the start

draw();