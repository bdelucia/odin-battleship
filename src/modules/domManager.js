import gameBoard from './gameBoard.js';
import ship from './ship.js';
import { createPlayer } from './player.js';

const player1board = document.getElementById('player1board');
const player2board = document.getElementById('player2board');

const human = createPlayer('human', 'Player 1');
const CPU = createPlayer('computer');

function renderPlayerBoard(player) {}
