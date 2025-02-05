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
  const cellSize = 50;
  boardElement.style.display = 'grid';
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, ${cellSize}px)`;
  boardElement.style.gridTemplateRows = `repeat(${boardSize}, ${cellSize}px)`;

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement('div');
      cell.id = `${isHuman ? 'p1' : 'p2'}-${x}${y}`;
      cell.classList.add('cell');
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.border = '1px solid black';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';

      const boardCell = player.gameBoard.getCell(x, y);

      let originalColor;

      if (boardCell.hasShip && boardCell.attackMissed === null && isHuman) {
        originalColor = 'grey';
        cell.style.backgroundColor = originalColor;
      } else if (boardCell.hasShip && boardCell.attackMissed === false) {
        originalColor = 'red';
        cell.style.backgroundColor = originalColor;
      } else if (!boardCell.hasShip && boardCell.attackMissed === null) {
        originalColor = 'lightblue';
        cell.style.backgroundColor = originalColor;
      } else if (!boardCell.hasShip && boardCell.attackMissed === true) {
        originalColor = 'blue';
        cell.style.backgroundColor = originalColor;
      } else if (boardCell.hasShip && boardCell.attackMissed === null) {
        originalColor = 'lightblue';
        cell.style.backgroundColor = originalColor;
      }

      cell.addEventListener('mouseenter', () => {
        cell.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'; // Light hover effect
        cell.style.cursor = 'pointer';
      });

      cell.addEventListener('mouseleave', () => {
        cell.style.backgroundColor = originalColor;
        cell.style.cursor = 'default';
      });

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
