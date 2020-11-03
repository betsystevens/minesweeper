'use strict'

let table = document.getElementById("grid");
let fieldSize = 10;

for (let i=0; i<fieldSize; i++) {
  let row = table.insertRow(i);
    for (let j=0; j<fieldSize; j++) {
      let cell = row.insertCell(j);
      cell.className = "brick";
    }
};

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
for (let i=0; i<fieldSize; i++){
  let row = [];
  for (let j=0; j<fieldSize; j++){
    row.push(0);
  }
  field.push(row);
}

for (let i=0; i<fieldSize; i++) {
  let p = getPoint();
  field[p[0]][p[1]] = 7;
}

function handleClick(e) {
  let row = e.target.parentElement.rowIndex;
  let column = e.target.cellIndex;
  if (field[row][column] === 7) {
    e.target.className = "detonated mine";
  } else {
    e.target.className = "detonated neighbor";
  }
}

function handleRightClick(e) {
  e.preventDefault();
  e.target.className = "brick flag";
}
const el = document.getElementById("grid");
el.addEventListener("click", handleClick, false);
el.addEventListener("contextmenu", handleRightClick, false);



