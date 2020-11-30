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
// add cells(bricks)to a row
const insertBricks = function(brickCount) {
  for (let i = 0; i < brickCount; i++) {
    this.insertCell().className = "brick";
  }
};
const table = makeTable(gridSize, "grid");

/* add event listeners and handlers */
table.addEventListener("click", brickClickedHandler, false);
table.addEventListener("contextmenu", flagHandler, false);

function getNeutralCells(cell) {
  let visited = [...Array(gridSize*gridSize)].fill(false);
  let openCells = [];
  openCells.push(cell);
  const markVisited = function(cell) {
    let index = cell.row * gridSize + cell.col;
    visited[index] = true;
  }
  markVisited(cell);
  const isVisited = function(cell) {
    let index = cell.row * gridSize + cell.col;
    return visited[index] === true;
  }
  let stack = [];
  let done = false;
  while (!done) {
    const neighbor = myGame.generateNeighbor(cell);
    for (let i = 0; i < 8; i++) {
      let adjacentCell  = neighbor.next().value;
      if ( (myGame.isValid(adjacentCell)) && (!isVisited(adjacentCell)) ) {
        markVisited(adjacentCell);
        openCells.push(adjacentCell);
        if (myGame.isNeutral(adjacentCell)) {
          stack.push(adjacentCell);
        }
      }
    }
    if (stack.length === 0) done = true;
    else {
      cell = stack.pop();
    }
  }
  return openCells;
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
  let row = e.target.parentElement.rowIndex;
  let col = e.target.cellIndex;
  let cell = { row: row, col: col};
  if (myGame.isBomb(cell)) {
    e.target.className = "mine";
    game_over = true;
  } else {
      if (myGame.isNeutral(cell)) {
        let openCells = getNeutralCells(cell);
        console.table(openCells);
        updateClass(openCells, "expand");
    } else {
      e.target.className = "detonated neighbor";
      e.target.innerHTML = myGame.getValue(cell);
    }
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