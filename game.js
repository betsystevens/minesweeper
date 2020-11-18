"use strict";

const gameGrid = function(size, numberOfBombs) {
  /* create two dimensional array filled with 0 */
 const createGrid = (size) => {
    let grid = [ ...Array(size)].map(() => Array(size).fill(0) );
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
  function* generateNeighbor(cell) {
    // generate 8 neighbors of cell
    let neighborRow = [-1, -1, -1, 0, 1, 1, 1, 0];
    let neighborCol = [-1, 0, 1, 1, 1, 0, -1, -1];
    for (let i = 0; i < 8; i++) {
      yield { 
        row: neighborRow[i] + cell.row,
        col: neighborCol[i] + cell.col
       }
    }
  }
  const updateNeighbors = function(bomb, BOMB_ENUM) {
    // update the 8 neighbors of the bomb
    const neighbor = generateNeighbor(bomb);
    for (let i = 0; i < 8; i++) {
      let cell = neighbor.next().value;
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
        console.count(`duplicate bomb ${cell.row} ${cell.col}`);
      }
    }
  };

  let grid = createGrid(size);

  const BOMB_ENUM = "∞";
  placeBombs(numberOfBombs, "∞");
  return grid;
};
// es6 import / export
export const game = gameGrid;

// unit testing without esm (es6 modules)
// module.exports.game = gameGrid;