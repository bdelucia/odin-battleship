class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hasShip = false;
    this.attackMissed = null;
  }
  getCoords() {
    return [this.x, this.y];
  }
  placeShip() {
    this.hasShip = true;
  }
}

export function gameBoard() {
  return {
    gameBoard: [],
    missedShots: [],

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

    receiveAttack(x, y) {
      const cellId = `p2-${x}${y}`;
      const attackedCell = document.getElementById(cellId);
      const cell = this.getCell(x, y);
      if (this.gameBoard[x][y].hasShip) {
        attackedCell.style.backgroundColor = 'red';
        cell.attackMissed = false;
      } else {
        this.missedShots.push([x, y]);
        attackedCell.style.backgroundColor = 'blue';
        cell.attackMissed = true;
      }
    },

    getCell(x, y) {
      if (
        x >= 0 &&
        x < this.gameBoard.length &&
        y >= 0 &&
        y < this.gameBoard[x].length
      ) {
        return this.gameBoard[x][y];
      }
      return null; // Return null if out of bounds
    },
  };
}
