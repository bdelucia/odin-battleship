const gameBoard = function () {
  const columns = 10;
  const rows = 10;
  const gameBoard = Array.from(Array(rows), () => new Array(columns).fill(0));
  return {
    placeShip(x, y, ship) {},
  };
};
