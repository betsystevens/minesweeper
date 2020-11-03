'use strict'

const fieldSize = 10;

/******************************** */
/* create the table in the dom    */
/******************************** */
function makeTable(size) {
  const table = document.getElementsByTagName("table")[0];
  for (let i=0; i<size; i++) {
    let row = table.insertRow(i);
    for (let j=0; j<size; j++) {
      let cell = row.insertCell(j);
      cell.className = "brick";
    }
  }
  return table;
}

const table = makeTable(fieldSize);
table.addEventListener("click", handleClick, false);
table.addEventListener("contextmenu", handleRightClick, false);

function handleClick(e) {
  let row = e.target.parentElement.rowIndex;
  let column = e.target.cellIndex;
    if (field[row][column] === BOMB_ENUM) {
    e.target.className = "detonated mine";
  } else {
    e.target.className = "detonated neighbor";
  }
}

function handleRightClick(e) {
  e.preventDefault();
  e.target.className = "brick flag";
}

/******************************** */
/* place the bombs */
/******************************** */

const randomPoint = function(max) {
  return function() {
    let x = Math.floor(Math.random() * Math.floor(max));
    let y = Math.floor(Math.random() * Math.floor(max));
    return [x,y]; 
  }
}
let getPoint = randomPoint(fieldSize);
let pointStrings = [];
let field = [];
for (let i = 0; i < fieldSize; i++){
  field.push([]);
}
/* randomly place bombs */
const bombCount = 15;
const BOMB_ENUM = 7;
for (let i=0; i<bombCount; i++) {
  let p = getPoint();
  field[p[0]][p[1]] = BOMB_ENUM;
}

console.log(field);


