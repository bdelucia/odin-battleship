import { gameBoard } from './gameBoard.js';
import { createPlayer } from './player.js';

const player1board = document.getElementById('player1board');
const player2board = document.getElementById('player2board');

const player1 = createPlayer('human', 'Player 1');
const player2 = createPlayer('cpu');

export function domInitialize() {
  player1.gameBoard.initializeBoard();
  player2.gameBoard.initializeBoard();

  player1.gameBoard.placeShip(1, 1);
  player1.gameBoard.placeShip(1, 2);
  player1.gameBoard.placeShip(1, 3);
  player1.gameBoard.placeShip(1, 4);

  player2.gameBoard.placeShip(4, 1);
  player2.gameBoard.placeShip(3, 1);
  player2.gameBoard.placeShip(2, 1);
  player2.gameBoard.placeShip(1, 1);

  renderPlayerBoard(player1, player1board, true);
  renderPlayerBoard(player2, player2board, false);
}

function renderPlayerBoard(player, boardElement, isHuman) {
  boardElement.innerHTML = ''; // Clear previous content

  const boardSize = 10;
  boardElement.style.display = 'grid';
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
  boardElement.style.gridTemplateRows = `repeat(${boardSize}, 40px)`;
  boardElement.style.gap = '2px';

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement('div');
      cell.id = `${isHuman ? 'p1' : 'p2'}-${x}${y}`;
      cell.classList.add('cell');
      cell.style.width = '50px';
      cell.style.height = '50px';
      cell.style.border = '1px solid black';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';

      const boardCell = player.gameBoard.getCell(x, y);

      if (boardCell.hasShip && boardCell.attackMissed === null && isHuman) {
        // cell has a ship that hasn't been hit yet
        cell.style.backgroundColor = 'grey';
      } else if (boardCell.hasShip && boardCell.attackMissed === false) {
        // cell has a ship that has been hit
        cell.style.backgroundColor = 'red';
      } else if (!boardCell.hasShip && boardCell.attackMissed === null) {
        // cell doesn't have a ship, hit attempt hasn't been made
        cell.style.backgroundColor = 'lightblue';
      } else if (!boardCell.hasShip && boardCell.attackMissed === true) {
        // cell doesn't have a ship, hit attempt has been made
        cell.style.backgroundColor = 'blue';
      }

      // Attach event listener if it’s a human player’s board
      if (isHuman) {
        cell.addEventListener('click', () => {
          console.log(`Clicked on (${x}, ${y})`);

          player1.makeMove(x, y, player2);
          renderPlayerBoard(player2, player2board, false);

          setTimeout(() => {
            player2.makeMove(player1);
            renderPlayerBoard(player1, player1board, true);
          }, 1000);
        });
      }

      boardElement.appendChild(cell);
    }
  }
}
