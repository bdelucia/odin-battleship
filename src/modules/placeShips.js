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

  function isWithinBounds(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }

  // Helper function to check if placement is valid
  function isValidPlacement(x, y, length, direction) {
    // Check area around ship (including diagonals)
    for (let i = -1; i <= length; i++) {
      for (let j = -1; j <= 1; j++) {
        let checkX, checkY;

        if (direction === 'horizontal') {
          checkX = x + i;
          checkY = y + j;
        } else {
          checkX = x + j;
          checkY = y + i;
        }

        // Skip if outside board bounds
        if (!isWithinBounds(checkX, checkY)) {
          continue;
        }

        // Check if cell already has a ship
        const cell = player.gameBoard.getCell(checkX, checkY);
        if (cell.hasShip) {
          return false;
        }
      }
    }
    return true;
  }

  // iterate over every ship in the players inventory
  for (let i = 0; i < ships.length; i++) {
    const shipLength = ships[i].length;
    const direction = randomBetweenTwo('horizontal', 'vertical');
    let coordinates;
    let validPlacement = false;

    // Keep trying until we find a valid placement
    while (!validPlacement) {
      if (direction === 'horizontal') {
        do {
          coordinates = getRandomCoordinates();
        } while (coordinates.x > 10 - shipLength);
      } else {
        do {
          coordinates = getRandomCoordinates();
        } while (coordinates.y > 10 - shipLength);
      }

      // Check if this placement is valid
      validPlacement = isValidPlacement(
        coordinates.x,
        coordinates.y,
        shipLength,
        direction,
      );
    }

    // Place the ship once we've found a valid position
    ships[i].takeUpSpace(coordinates.x, coordinates.y); // update ship object's spacesTakenUp array
    let boardCell = player.gameBoard.getCell(coordinates.x, coordinates.y); // get actual cell object and update its hasShip to true
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
    // console.log(ships[i].spacesTakenUp);
  }
  renderPlayerBoard(player1, player1board, true);
}
