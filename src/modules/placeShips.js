import { ship } from './ship.js';
import { renderPlayerBoard, player1, player2 } from './domManager.js';
import { getRandomCoordinates, randomBetweenTwo } from './helperFunctions.js';

const player1board = document.getElementById('player1board');
const player2board = document.getElementById('player2board');

export function placeShips(player) {
  const carrier = ship(5);
  const battleship = ship(4);
  const cruiser = ship(3);
  const submarine = ship(3);
  const destroyer = ship(2);
  const ships = [carrier, battleship, cruiser, submarine, destroyer];
  player.ships = ships;

  for (let i = 0; i < ships.length; i++) {
    const shipLength = ships[i].length;
    const direction = randomBetweenTwo('horizontal', 'vertical');

    let coordinates;
    if (direction === 'horizontal') {
      do {
        coordinates = getRandomCoordinates();
      } while (coordinates.x > 10 - shipLength);
    } else {
      do {
        coordinates = getRandomCoordinates();
      } while (coordinates.y > 10 - shipLength);
    }

    ships[i].takeUpSpace(coordinates.x, coordinates.y);
    let boardCell = player.gameBoard.getCell(coordinates.x, coordinates.y);
    boardCell.placeShip();
    for (let l = 1; l < shipLength; l++) {
      if (direction === 'horizontal') {
        ships[i].takeUpSpace(coordinates.x + l, coordinates.y);
        boardCell = player.gameBoard.getCell(coordinates.x + l, coordinates.y);
        boardCell.placeShip();
      } else {
        ships[i].takeUpSpace(coordinates.x, coordinates.y + l);
        boardCell = player.gameBoard.getCell(coordinates.x, coordinates.y + l);
        boardCell.placeShip();
      }
    }
    console.log(ships[i].spacesTakenUp);
  }
  renderPlayerBoard(player1, player1board, true);
}
