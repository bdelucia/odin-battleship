class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hasShip = false;
  }
  getCoords() {
    return [this.x, this.y];
  }
  placeShip() {
    this.hasShip = true;
  }
}

const gameBoard = function () {
  const columns = 10;
  const rows = 10;

  return {
    gameBoard: [],
    initializeBoard() {
      for (let i = 0; i < rows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
          const cell = new Cell(i, j);
          gameBoard[i][j] = cell;
        }
      }
    },

    printBoard() {
      console.log(gameBoard);
    },

    placeShip(x, y) {
      gameBoard[x][y].hasShip = true;
    },
  };
};

const test = gameBoard();
test.initializeBoard();
test.printBoard();

module.exports = gameBoard;
