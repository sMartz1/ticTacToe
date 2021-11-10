//TICTACTOE

// 0 = player1   1 = player2
let currentPlayer = 1;
let isPlaying = false;
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
let startButton = document.getElementById("start-button");
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

    currentPlayer == 0 ? currentPlayer = 1 : currentPlayer = 0;
    currentPlayerRender();
    checkStateGame();
    if (isWin || turn == 10) {
        playersCointainer.classList.add("no-visibility");
        if (isWin) {
            let winnerStr = winner == 1 ? "Player 1" : "Player 2"
            document.getElementById("result").innerHTML = "Ha ganado la partida " + winnerStr;
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
            tempFilled = false;
            currentState[parseInt(e.target.getAttribute("position"))] = currentPlayer + 1;
            turn++;
            currentTime = roundTime;
            draw();


        }


    }


    function mouseEnterItem(e) {
        if (e.target.innerHTML == "") {
            tempFilled = true;
            e.target.innerHTML = currentPlayer == 0 ? "X" : "O"
            e.target.classList.add("item-hint");
        }
    }

    function mouseLeaveItem(e) {
        if (tempFilled) {
            tempFilled = false;
            e.target.innerHTML = "";
            e.target.classList.remove("item-hint");
        }
    }


}

/**
 * Change the header to the current player
 */

function currentPlayerRender() {

    if (isPlaying) {
        if (currentPlayer == 0) {
            player2.classList.add("no-visibility");
            player1.classList.remove("no-visibility");
        } else {
            player1.classList.add("no-visibility");
            player2.classList.remove("no-visibility");
        }
    }

}
/**
 * Function to start the timer
 */

function startTimer() {
    let timerElement = document.getElementById("time-bar");

    timerElement.innerHTML = currentTime;

    let loopTimer = setInterval(() => {

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
 * Function to reset the game
 */
function resetClick() {
    currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    startButton.classList.remove("no-visibility");
    player1.classList.remove("no-visibility");
    player2.classList.remove("no-visibility");
    gameContainer.classList.add("no-visibility");
    isPlaying = false;
    turn = 0;
    isWin = false;
    document.getElementById("result").innerHTML = ""

    draw();
}

/**
 * Function to start the game
 */
function start() {
    let title = document.getElementById("title");
    title.classList.add("in-game-header");
    playersCointainer.classList.remove("no-visibility");
    isPlaying = true;
    gameContainer.classList.remove("no-visibility");
    currentPlayer = 0;
    turn = 1;
    startButton.classList.add("no-visibility");
    startTimer();
    currentPlayerRender();

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