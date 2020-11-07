'use strict'

/* return a random cell: {row,col} */
const gameGrid = function(size) {
  let grid = [];
  for (let i = 0; i < size; i++){
    grid.push([]);
    for (let j=0; j<size; j++) {
      grid[i].push(0);
    }
  }
  const randomCell = function(max) {
    return function() {
      let row = Math.floor(Math.random() * Math.floor(max));
      let col = Math.floor(Math.random() * Math.floor(max));
      return { row, col };
    }
  }
  const updateNeighbors = function(cell){
    let neighborRow = [-1, -1, -1, 0, 0, 1, 1, 1];
    let neighborCol = [-1, 0, 1, -1, +1, -1, 0, +1];
    console.log(`update neighbors of ${cell.row}:${cell.col}`)
    for (let i=0; i<8; i++){
    }
  };
  const isValid = function() {
  };
  return{
    placeBombs : function(bombCount, BOMB_ENUM = -1){
      const getCell = randomCell(size);
      for (let i=0; i < bombCount; i++) {
        let cell = getCell();
        if (grid[cell.row][cell.col] === 0) {
          grid[cell.row][cell.col] = BOMB_ENUM;
          updateNeighbors(cell);
        }else{
          console.log(`duplicate bomb ${cell.row} ${cell.col}`);
        }
      }
      return grid; 
    }
  }
}
// console.log(grid);
export const game = gameGrid; 
