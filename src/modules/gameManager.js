import { domInitialize } from './domManager.js';
import { placeShips } from './placeShips.js';
import { player1, player2 } from './domManager.js';

export function playGame() {
  domInitialize();
  placeShips(player1);
  placeShips(player2);
}
