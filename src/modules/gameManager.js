import { domInitialize } from './domManager.js';
import { placeShips } from './placeShips.js';
import { player1, player2 } from './domManager.js';

export function playGame() {
  placeShips(player1);
  placeShips(player2);
  domInitialize(); // renders the boards for the first time
}
