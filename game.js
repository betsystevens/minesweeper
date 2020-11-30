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
  // function* generateNeighbor(cell) {
  const generateNeighbor = function* (cell) {
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
  const updateNeighbors = function(bomb) {
    // update the 8 neighbors of the bomb
    const neighbor = generateNeighbor(bomb);
    for (let i = 0; i < 8; i++) {
      let cell = neighbor.next().value;
      if (isValid(cell)) {
        if (!isBomb(cell))
          incrementBombCount(cell);
      }
    }
  };
  /* check out of bounds of grid */
  const isValid = function(cell) {
    let row = cell.row;
    let col = cell.col;
    return row >= 0 && row < size && col >= 0 && col < size;
  };
  const isNeutral = function(cell) {
    return grid[cell.row][cell.col] === 0;
  };
  const isBomb = function(cell) {
    return grid[cell.row][cell.col] === BOMB_ENUM;
  };
  const incrementBombCount = function(cell) {
    setValue(cell, grid[cell.row][cell.col] + 1) 
  }
  const setValue = function(cell, value) {
    grid[cell.row][cell.col] = value;
  };
  const getValue = function(cell) {
    return grid[cell.row][cell.col];
  };
  const placeBombs = function(numberOfBombs) {
    const getRandomCell = randomCell(size);
    let count = 0;
    for (let i = 0; i < numberOfBombs; i++) {
      let cell = getRandomCell();
      if (!isBomb(cell)) {
        count++;
        setValue(cell, BOMB_ENUM);
        updateNeighbors(cell);
      }
    }
    return count;
  };
  
  const BOMB_ENUM = "∞";
  let grid = createGrid(size);
  let bombCount = placeBombs(numberOfBombs, "∞");

  return {
    grid: grid,
    bombCount: bombCount,
    isBomb: isBomb,
    isNeutral: isNeutral,
    isValid: isValid,
    getValue: getValue,
    generateNeighbor : generateNeighbor
  }
};

// es6 import / export
export const game = gameGrid;

// unit testing without esm (es6 modules)
// module.exports.game = gameGrid;
