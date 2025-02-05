import { domInitialize } from './domManager.js';
import { placeShips } from './placeShips.js';

export const isPlayer1sTurn = true;

export function playGame() {
  domInitialize(); // renders the boards for the first time
  placeShips();
}
