//TICTACTOE

// 0 = player1   1 = player2
let currentPlayer = 1;
let isPlaying = false;
let isWin = false;
let winner = 0;
let turn = 0;
// 0 = empty  1 = X   2 = 0
let currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//Function to draw all the items
function draw() {
    //We remove all childs from gameScreen

    let container = document.getElementById("screen");
    while (container.firstChild) {
        container.firstChild.remove()
    }

    let rowI = 0;
    let rowC = 0;
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
    if (isWin || turn == 9) {
        if (isWin) {
            let winnerStr = winner == 0 ? "Player 2" : "Player 1"
            document.getElementById("result").innerHTML = "Ha acabado la partida " + winnerStr;
        } else {
            document.getElementById("result").innerHTML = "Ha acabado la partida com empate"
        }

        isPlaying = false;

    }

    //Function create item
    function createItem(pos) {
        let tempElement = document.createElement("div");
        tempElement.classList.add("item");
        tempElement.setAttribute("position", pos);
        tempElement.addEventListener("click", clickItem);
        tempElement.innerHTML = currentState[pos] == 0 ? "" : currentState[pos] == 1 ? "X" : "O";
        return tempElement;
    }

    function clickItem(e) {
        if (isPlaying && e.target.innerHTML == "") {

            currentState[parseInt(e.target.getAttribute("position"))] = currentPlayer + 1;
            turn++;
            draw();


        }


    }


}
let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");

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

let startButton = document.getElementById("start-button");

function resetClick() {
    currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    startButton.classList.remove("no-visibility");
    player1.classList.remove("no-visibility");
    player2.classList.remove("no-visibility");
    isPlaying = false;
    turn = 0;
    isWin = false;
    document.getElementById("result").innerHTML = ""
    draw();
}

function start() {
    isPlaying = true;
    currentPlayer = 0;
    turn = 1;
    startButton.classList.add("no-visibility");
    currentPlayerRender();
}



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

draw();