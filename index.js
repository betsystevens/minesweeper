"use strict";
import { game } from "./game.js";
const gridSize = 12;
const myGame = game(gridSize, 20);
const bombCount = myGame.bombCount;
let game_over = false;

const header = document.getElementsByTagName("h2")[0];
header.innerHTML = "Find " + bombCount + " bombs";
/* add rows and cells(bricks) to the dom table */
const makeTable = function(size, tableID) {
  let table = document.getElementById(tableID);
  for (let i = 0; i < size; i++) {
    insertBricks.call(table.insertRow(), size);
  }
  return table;
};
// add cells(bricks)to a row in the table
const insertBricks = function(brickCount) {
  for (let i = 0; i < brickCount; i++) {
    this.insertCell().className = "brick";
  }
};
const table = makeTable(gridSize, "grid");

/* add event listeners and handlers */
table.addEventListener("click", brickClickedHandler, false);
table.addEventListener("contextmenu", flagHandler, false);

function getCellsToOpen(cell) {
  // open cells that have 0 bomb neighbors and the wall of 
  //   numbered cells that surround these neutral cells
  let cellsToOpen = [];
  cellsToOpen.push(cell);
  // track cells as they are processed
  let visited = [...Array(gridSize*gridSize)].fill(false);
  const markVisited = function(cell) {
    let index = cell.row * gridSize + cell.col;
    visited[index] = true;
  }
  markVisited(cell);
  const isVisited = function(cell) {
    let index = cell.row * gridSize + cell.col;
    return visited[index] === true;
  }
  // track neutral cells so their neighbors can be processed
  let neutrals = [];
  neutrals.push(cell)
  // valid, unvisited neighbors will be opened, mark as visited 
  while (neutrals.length !== 0 ) {
    cell = neutrals.pop();
    const neighbor = myGame.generateNeighbor(cell);
    
    let neighbors = [...Array(8)].map(() => neighbor.next().value);
    neighbors = neighbors.filter(neighborCell => myGame.isValid(neighborCell));
    neighbors = neighbors.filter(neighborCell => !isVisited(neighborCell));
    neighbors.forEach((neighborCell) => {
      markVisited(neighborCell);
      cellsToOpen.push(neighborCell);
    });
    // a neighbor's neutral neighbors will need to be processed, save them 
    neighbors = neighbors.filter(neighborCell => (myGame.isNeutral(neighborCell)));
    neighbors.forEach((neighborCell => { neutrals.push(neighborCell) }));
  }
  return cellsToOpen;
}
function updateClass(cells, className) {
  let table = document.getElementById("grid");
  cells.forEach((cell) => {
    let row = cell.row;
    let col = cell.col;
    let value = myGame.getValue(cell);
    table.rows[row].cells[col].innerHTML = (value !== 0) ? value : "";
    table.rows[row].cells[col].className = className; 
  })
};
function brickClickedHandler(e) {
  // get cell that was clicked
  let row = e.target.parentElement.rowIndex;
  let col = e.target.cellIndex;
  let cell = { row: row, col: col};
  switch(myGame.getValue(cell)) {
    case myGame.enums.BOMB:
      e.target.className = "mine";
      game_over = true;
      break;
    case myGame.enums.NEUTRAL:
      updateClass(getCellsToOpen(cell), "expand");
      break;
    default:
      e.target.className = "detonated neighbor";
      e.target.innerHTML = myGame.getValue(cell);
  } 
}
function flagHandler(e) {
  e.preventDefault();
  e.target.className = (e.target.className === "brick") ? "brick flag" : "brick";
}

//≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
// reveal button open all cells 
let button = document.getElementById("reveal");
button.addEventListener("click", function(){
  let rows = document.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < gridSize; j++ ) {
      let cell = { row: i, col: j}
      let tableCell = rows[i].getElementsByTagName("td")[j];

      if (myGame.isBomb(cell)) {
        tableCell.className = "mine";
        game_over = true;
      } else {
        if (myGame.isNeutral(cell)) {
          tableCell.className = "expand";
        } else {
          tableCell.className = "detonated neighbor";
          tableCell.innerHTML = myGame.getValue(cell);
        }
      }
    }
  }
})