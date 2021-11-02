//Con el fin de llevar seguimiento de cada casilla, creamos atributo position en html

// 0 = empty  1 = X   2 = 0
let currentState = [0, 1, 0, 2, 0, 0, 1, 0, 0];
// 0 =
function draw() {
    let container = document.getElementById("screen");
    while (container.firstChild) {
        container.firstChild.remove()
    }
    let rowI = 0;
    let rowC = 0;
    while (rowI < 3) {
        let tempRow = document.createElement("div");
        tempRow.classList.add("row");
        for (let i = 0; i < currentState.length; i++) {
            console.log("yep")
            let item = document.createElement("div");
            item.classList.add("item");
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
draw();