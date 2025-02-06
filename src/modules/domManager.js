import { gameBoard } from './gameBoard.js';
import { createPlayer } from './player.js';

const player1board = document.getElementById('player1board');
const player2board = document.getElementById('player2board');

export const player1 = createPlayer('human', 'Player 1');
export const player2 = createPlayer('cpu');

export function domInitialize() {
  renderPlayerBoard(player1, player1board, true);
  renderPlayerBoard(player2, player2board, false);
}

// renders the player's board in HTML
export function renderPlayerBoard(player, boardElement, isHuman) {
  boardElement.innerHTML = ''; // Clear previous content

  const boardSize = 10;
  const cellSize = 50;
  boardElement.style.display = 'grid';
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, ${cellSize}px)`;
  boardElement.style.gridTemplateRows = `repeat(${boardSize}, ${cellSize}px)`;

  // returns cell color based off boardCell conditions
  function getCellColor(boardCell, isHuman) {
    // only display ships on the human board
    if (boardCell.hasShip && boardCell.attackMissed === null && isHuman) {
      return 'rgba(46, 139, 87, 1)';
    } else if (boardCell.hasShip && boardCell.attackMissed === false) {
      return 'rgba(139, 0, 0, 0.6)';
    } else if (!boardCell.hasShip && boardCell.attackMissed === null) {
      return 'rgba(30, 144, 255, 1)';
    } else if (!boardCell.hasShip && boardCell.attackMissed === true) {
      return 'rgba(70, 130, 180, 1)';
    } else if (boardCell.hasShip && boardCell.attackMissed === null) {
      return 'rgba(30, 144, 255, 1)';
    }
  }

  function checkIfGameWon(player1, player2) {
    const totalHits1 = player1.ships.reduce(
      (sum, ship) => sum + ship.timesHit,
      0,
    );
    const totalHits2 = player2.ships.reduce(
      (sum, ship) => sum + ship.timesHit,
      0,
    );

    console.log(`${player1.name} total # of hits: ${totalHits1}`);
    console.log(`${player2.name} total # of hits: ${totalHits2}`);

    if (totalHits1 >= 17) {
      alert(`${player2.name} has won!`);
      return true;
    } else if (totalHits2 >= 17) {
      alert(`${player1.name} has won!`);
      return true;
    } else {
      return false;
    }
  }

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement('div');
      cell.id = `${isHuman ? 'p1' : 'p2'}-${x}${y}`;
      cell.classList.add('cell');

      const boardCell = player.gameBoard.getCell(x, y);
      let cellColor = getCellColor(boardCell, isHuman);
      cell.style.backgroundColor = cellColor;

      cell.addEventListener('mouseenter', () => {
        const player2cell = document.getElementById(`p2-${x}${y}`);
        cell.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        cell.style.cursor = 'pointer';
        if (player2cell) {
          player2cell.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
          player2cell.style.cursor = 'pointer';
        }
      });

      cell.addEventListener('mouseleave', () => {
        const player2cell = document.getElementById(`p2-${x}${y}`);
        if (player2cell) {
          const p2BoardCell = player2.gameBoard.getCell(x, y);
          cell.style.backgroundColor = getCellColor(boardCell, isHuman);
          cell.style.cursor = 'default';
          if (player2cell && p2BoardCell) {
            player2cell.style.backgroundColor = getCellColor(
              p2BoardCell,
              false,
            );
            player2cell.style.cursor = 'default';
          }
        }
      });

      // Attach event listener if it’s a human player’s board
      if (!isHuman) {
        cell.addEventListener('click', () => {
          const randomButton = document.getElementById('randomizeButton');
          if (randomButton) {
            randomButton.remove();
          }
          const moveWasValid = player1.makeMove(x, y, player2);
          renderPlayerBoard(player2, player2board, false);

          if (moveWasValid) {
            setTimeout(() => {
              player2.makeMove(player1);
              renderPlayerBoard(player1, player1board, true);
              checkIfGameWon(player1, player2);
            }, 500);
          }
        });
      }

      boardElement.appendChild(cell);
    }
  }
}
