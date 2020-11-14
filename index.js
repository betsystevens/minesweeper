"use strict";
import { game } from "./game.js";

const gridSize = 7;
const BOMB_ENUM = "∞";
const grid = game(gridSize, 25);
let game_over = false;

/*********** */
/* dom table */
/*********** */

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
table.addEventListener("click", handleClick, false);
table.addEventListener("contextmenu", handleRightClick, false);

function handleClick(e) {
  let row = e.target.parentElement.rowIndex;
  let column = e.target.cellIndex;
  if (grid[row][column] === BOMB_ENUM) {
    e.target.className = "mine";
    game_over = true;
  } else {
    e.target.className = "detonated neighbor";
    e.target.innerHTML = grid[row][column];
  }
}
function handleRightClick(e) {
  e.preventDefault();
  e.target.className = "brick flag";
}
