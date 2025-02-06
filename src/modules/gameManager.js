import { domInitialize } from './domManager.js';
import { placeShips } from './placeShips.js';
import { player1, player2 } from './domManager.js';

export function playGame() {
  const randomizeButton = document.getElementById('randomizeButton');
  randomizeButton.addEventListener('click', () => {
    player1.gameBoard.initializeBoard();
    placeShips(player1);
  });
  placeShips(player1);
  placeShips(player2);
  domInitialize(); // renders the boards for the first time
}
