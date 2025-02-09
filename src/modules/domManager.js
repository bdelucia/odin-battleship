import { gameBoard } from './gameBoard.js';
import { createPlayer } from './player.js';
import {
  convertToRGBA,
  displayPlayer1Turn,
  displayPlayer2Turn,
} from './helperFunctions.js';
import { placeShips } from './placeShips.js';
import { endOfGame } from './gameManager.js';

export const player1board = document.getElementById('player1board');
export const player2board = document.getElementById('player2board');

export const player1 = createPlayer('human', 'Player 1');
export const player2 = createPlayer('cpu');

const playersTurn = document.getElementById('playersTurn');

export function domInitialize() {
  player1board.classList.remove('disabled');
  player2board.classList.remove('disabled');
  displayPlayer1Turn(player1.name);

  const player1nameContainer = document.getElementById('player1nameContainer');

  const speedSlider = document.getElementById('slider');
  const speedLabel = document.getElementById('speedLabel');

  window.addEventListener('load', () => {
    document.getElementById('slider').value = 500; // Reset to default value
  });

  speedSlider.addEventListener('input', () => {
    const speed = Number(speedSlider.value);
    let displayText = 'Normal';

    if (speed === 1000) displayText = '⚡ Very Fast';
    else if (speed >= 750) displayText = 'Fast';
    else if (speed >= 500) displayText = 'Normal';
    else if (speed >= 250) displayText = 'Slow';
    else displayText = '🐢 Very Slow';

    speedLabel.textContent = `Speed: ${displayText}`;
  });

  const randomizeButton = document.getElementById('randomizeButton');
  if (randomizeButton) {
    randomizeButton.addEventListener('click', () => {
      player1.gameBoard.initializeBoard();
      placeShips(player1);
    });
  }

  const nameInput = document.getElementById('player1name');
  if (nameInput) {
    nameInput.value = '';
  }

  const submitNameBtn = document.getElementById('submitName');
  if (submitNameBtn) {
    submitNameBtn.addEventListener('click', () => {
      let name = nameInput.value.trim();
      if (name === '') {
        player1.name = 'Player 1';
      } else {
        player1.name = name;
      }

      displayPlayer1Turn(player1.name);
      nameInput.remove();
      submitNameBtn.remove();

      const nameLabel = document.createElement('div');
      nameLabel.id = 'nameLabel';
      nameLabel.textContent = player1.name;
      player1nameContainer.append(nameLabel);
    });
  } else {
    const oldNameLabel = document.getElementById('nameLabel');
    if (oldNameLabel) oldNameLabel.remove();

    const newNameInput = document.createElement('input');
    newNameInput.id = 'player1name';
    newNameInput.placeholder = 'Another game another name';

    const newSubmitBtn = document.createElement('button');
    newSubmitBtn.id = 'submitName';
    newSubmitBtn.textContent = 'Submit';
    newSubmitBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('player1name');
      let name = nameInput.value.trim();
      if (name === '') {
        player1.name = 'Player 1';
      } else {
        player1.name = name;
      }

      displayPlayer1Turn(player1.name);

      nameInput.remove();
      newSubmitBtn.remove();

      const nameLabel = document.createElement('div');
      nameLabel.id = 'nameLabel';
      nameLabel.textContent = player1.name;
      player1nameContainer.append(nameLabel);
    });

    const newRandomizeBtn = document.createElement('button');
    const player1container = document.getElementById('player1container');
    newRandomizeBtn.id = 'randomizeButton';
    newRandomizeBtn.textContent = 'Randomize Placement';
    newRandomizeBtn.addEventListener('click', () => {
      player1.gameBoard.initializeBoard();
      placeShips(player1);
      player2.gameBoard.initializeBoard();
      placeShips(player2);
    });

    player1container.append(newRandomizeBtn);

    player1nameContainer.append(newNameInput);
    player1nameContainer.append(newSubmitBtn);
  }

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

    console.log(`${player1.name} total # of hits: ${totalHits2}`);
    console.log(`${player2.name} total # of hits: ${totalHits1}`);

    if (totalHits1 >= 2) {
      alert(`${player2.name} has won!`);
      endOfGame(player2);
      return true;
    } else if (totalHits2 >= 2) {
      alert(`${player1.name} has won!`);
      endOfGame(player1);
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
      let cellColorHover = convertToRGBA(cellColor, 0.6);
      cell.style.backgroundColor = cellColor;

      // Attach event listener if it’s a human player’s board
      if (!isHuman) {
        cell.addEventListener('mouseenter', () => {
          const player2cell = document.getElementById(`p2-${x}${y}`);
          cell.style.backgroundColor = cellColorHover;
          cell.style.cursor = 'pointer';
          if (player2cell) {
            player2cell.style.backgroundColor = cellColorHover;
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

        cell.addEventListener('click', () => {
          const gameSpeed =
            1000 / parseInt(document.getElementById('slider').value);

          const randomButton = document.getElementById('randomizeButton');
          if (randomButton) {
            randomButton.remove();
          }

          const instructionsLabel =
            document.getElementById('instructionsLabel');
          if (instructionsLabel && instructionsLabel.textContent !== '') {
            instructionsLabel.textContent = '';
          }

          const moveResult = player1.makeMove(x, y, player2);
          renderPlayerBoard(player2, player2board, false);

          if (moveResult.isValid) {
            if (!moveResult.isHit) {
              displayPlayer2Turn('CPU');
              setTimeout(() => {
                let computerMoveResult;
                do {
                  computerMoveResult = player2.makeMove(player1);
                  renderPlayerBoard(player1, player1board, true);

                  if (checkIfGameWon(player1, player2)) {
                    break; // Exit if game is won
                  }
                } while (computerMoveResult.isHit); // Continue computer's turn if it was a hit
                displayPlayer1Turn(player1.name);
              }, gameSpeed);
            } else {
              // If it was a hit, check for win but don't switch turns
              checkIfGameWon(player1, player2);
            }
          }
        });
      }

      boardElement.appendChild(cell);
    }
  }
}
