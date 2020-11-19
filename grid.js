
const gameGrid = function(size, numberOfBombs) {
  const createGrid = (size) => {
    let grid = [ ...Array(size)].map(() => Array(size).fill(0) );
    return grid;
  }
  let grid = createGrid(size);
  return {
    grid: grid,
    BOMB_ENUM : "∞",
    isBomb(cell) {
      return grid[cell.row][cell.col] === BOMB_ENUM;
    }, 
  }
}