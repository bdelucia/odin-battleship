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
  return {
    gameBoard: [],

    initializeBoard() {
      const columns = 10;
      const rows = 10;
      this.gameBoard = [];
      for (let i = 0; i < rows; i++) {
        this.gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
          const cell = new Cell(i, j);
          this.gameBoard[i][j] = cell;
        }
      }
    },

    printBoard() {
      console.log(this.gameBoard);
    },

    printCell(x, y) {
      return JSON.stringify(this.gameBoard[x][y]);
    },

    placeShip(x, y) {
      this.gameBoard[x][y].hasShip = true;
    },

    // TODO
    receiveAttack(x, y) {
      if (this.gameBoard[x][y].hasShip) {
      }
    },
  };
};

module.exports = gameBoard;
