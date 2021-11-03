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

            let item = document.createElement("div");
            item.classList.add("item");
            item.setAttribute("position", i);
            item.addEventListener("click", e => {
                currentState[parseInt(e.target.getAttribute("position"))] = currentPlayer;
                draw();
            });
            item.innerHTML = currentState[i] == 0 ? "" : currentState[i] == 1 ? "X" : "O";
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
}

function resetClick() {
    currentState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    draw();
}




draw();