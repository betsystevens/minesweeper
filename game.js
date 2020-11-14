"use strict";

const gameGrid = function(size, numberOfBombs) {
  /* create two dimensional array filled with 0 */
  const createGrid = (size) => {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid.push([]);
      for (let j = 0; j < size; j++) {
        grid[i].push(0);
      }
    }
    return grid;
  };
  /* return a random cell: {row,col} */
  const randomCell = function(max) {
    return function() {
      let row = Math.floor(Math.random() * Math.floor(max));
      let col = Math.floor(Math.random() * Math.floor(max));
      return { row, col };
    };
  };
  const updateNeighbors = function(bomb, BOMB_ENUM) {
    // update the 8 neighbors of the bomb
    let neighborRow = [-1, -1, -1, 0, 0, 1, 1, 1];
    let neighborCol = [-1, 0, 1, -1, 1, -1, 0, 1];
    let cell = {};
    for (let i = 0; i < 8; i++) {
      cell.row = neighborRow[i] + bomb.row;
      cell.col = neighborCol[i] + bomb.col;
      if (isValid(cell.row, cell.col)) {
        if (!isBomb(cell))
          incrementBombCount(cell);
      }
    }
  };
  /* check out of bounds of grid */
  const isValid = function(row, col) {
    return row >= 0 && row < size && col >= 0 && col < size;
  };
  const isBomb = function(cell) {
    return grid[cell.row][cell.col] === BOMB_ENUM;
  };
  const incrementBombCount = function(cell) {
    setCell(cell, grid[cell.row][cell.col] + 1) 
  }
  const setCell = function(cell, value) {
    grid[cell.row][cell.col] = value;
  };
  const placeBombs = function(numberOfBombs, BOMB_ENUM) {
    const getCell = randomCell(size);
    for (let i = 0; i < numberOfBombs; i++) {
      let cell = getCell();
      if (!isBomb(cell)) {
        setCell(cell, BOMB_ENUM);
        updateNeighbors(cell, BOMB_ENUM);
      } else {
        console.log(`duplicate bomb ${cell.row} ${cell.col}`);
      }
    }
  };

  let grid = createGrid(size);
  const BOMB_ENUM = "∞";
  placeBombs(numberOfBombs, "∞");
  return grid;
};
// console.log(grid);
export const game = gameGrid;
