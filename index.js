'use strict'

const fieldSize = 5;
const BOMB_ENUM = 7;

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
/* create a random point: [x,y] */
const randomPoint = function(max) {
  return function() {
    let x = Math.floor(Math.random() * Math.floor(max));
    let y = Math.floor(Math.random() * Math.floor(max));
    return [x,y]; 
  }
}
const getPoint = randomPoint(fieldSize);

/* create a virtual field  */
const virtualField = function(size) {
  let field = [];
  for (let i = 0; i < size; i++){
    field.push([]);
  }
  return {
    size, 
    field,
    getField() {
      return this.field;
    },
    /* randomly place bombs */
    placeBombs(bombCount){
      for (let i=0; i < bombCount; i++) {
        let p = getPoint();
        this.field[p[0]][p[1]] = BOMB_ENUM;
      }
      return this;
    }
  }
}

const field = virtualField(fieldSize).placeBombs(15).getField();
console.log(field);

/* add event listeners and handlers */
const table = makeTable(fieldSize, "grid");
table.addEventListener("click", handleClick, false);
table.addEventListener("contextmenu", handleRightClick, false);

function handleClick(e) {
  let row = e.target.parentElement.rowIndex;
  let column = e.target.cellIndex;
    if (field[row][column] === BOMB_ENUM) {
    e.target.className = "mine";
  } else {
    e.target.className = "detonated neighbor";
  }
}
function handleRightClick(e) {
  e.preventDefault();
  e.target.className = "brick flag";
}

