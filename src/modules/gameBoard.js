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
  const gameBoard = Array.from(Array(rows), () => new Array(columns).fill(0));
  return {
    placeShip(x, y, ship) {
      gameBoard[x][y].push(ship);
    },
  };
};
module.exports(gameBoard);
