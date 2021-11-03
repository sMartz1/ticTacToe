//TICTACTOE

// 0 = player1   1 = player2
let currentPlayer = 1;
let isPlaying = false;
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
        if (isPlaying) {
            currentState[parseInt(e.target.getAttribute("position"))] = currentPlayer;
            draw();
        }


    }
}

let startButton = document.getElementById("start-button");

function resetClick() {
    currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    startButton.classList.remove("no-visibility");
    isPlaying = false;
    draw();
}

function start() {
    isPlaying = true;
    startButton.classList.add("no-visibility");
}


draw();