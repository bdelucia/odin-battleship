const gameBoard = require('../modules/gameBoard.js');

test('placeShip + printCell', () => {
  const testBoard = gameBoard();
  testBoard.initializeBoard();
  testBoard.placeShip(5, 5);
  const result = testBoard.printCell(5, 5);
  expect(result).toBe('{"x":5,"y":5,"hasShip":true}');
});
