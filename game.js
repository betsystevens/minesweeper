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
  const updateNeighbors = function(cell, BOMB_ENUM){
    // update 8 neighbors of the bomb
    let neighborRow = [-1, -1, -1, 0, 0, 1, 1, 1];
    let neighborCol = [-1, 0, 1, -1, 1, -1, 0, 1];
    for (let i=0; i<8; i++){
      let row = neighborRow[i] + cell.row;
      let col = neighborCol[i] + cell.col;
      if (isValid(row, col)) {
        grid[row][col] = (grid[row][col] === BOMB_ENUM) ? BOMB_ENUM : grid[row][col] + 1;
      }
    }
  };
  const isValid = function(row, col) {
    return ( (row >= 0) && (row < size) && (col >= 0) && (col < size) ) 
  };
  return{
    placeBombs : function(bombCount, BOMB_ENUM){
      const getCell = randomCell(size);
      for (let i=0; i < bombCount; i++) {
        let cell = getCell();
        if (grid[cell.row][cell.col] === 0) {
          grid[cell.row][cell.col] = BOMB_ENUM;
          updateNeighbors(cell, BOMB_ENUM);
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
