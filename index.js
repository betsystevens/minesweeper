import { game } from './game.js';

'use strict'

const gridSize = 10;
const BOMB_ENUM = 7;
const grid = game(gridSize).placeBombs(74, BOMB_ENUM);

/*********** */
/* dom table */
/*********** */

/* add rows and cells(bricks) to the dom table */
const makeTable = function(size, tableID) {
  let table = document.getElementById(tableID);
  for (let i=0; i<size; i++) {
    insertBricks.call(table.insertRow(), size);
  }
  return table;
}
// add cells(bricks)to a row
const insertBricks = function(brickCount){
  for (let i=0; i<brickCount; i++){
    this.insertCell().className = "brick";
  }
}
const table = makeTable(gridSize, "grid");

/* add event listeners and handlers */
table.addEventListener("click", handleClick, false);
table.addEventListener("contextmenu", handleRightClick, false);

function handleClick(e) {
  let row = e.target.parentElement.rowIndex;
  let column = e.target.cellIndex;
    if (grid[row][column] === BOMB_ENUM) {
    e.target.className = "mine";
  } else {
    e.target.className = "detonated neighbor";
  }
}
function handleRightClick(e) {
  e.preventDefault();
  e.target.className = "brick flag";
}
