import { gameBoard } from './gameBoard.js';

export function createPlayer(type, name) {
  return type === 'human' ? new HumanPlayer(name) : new ComputerPlayer();
}

class HumanPlayer {
  constructor(name) {
    this.name = name;
    this.type = 'human';
    this.gameBoard = gameBoard();
    this.gameBoard.initializeBoard();
  }

  makeMove(x, y, opponent) {
    console.log(`${this.name} is attacking (${x}, ${y})`);
    opponent.gameBoard.receiveAttack(x, y, true);
  }
}

class ComputerPlayer {
  constructor() {
    this.name = 'AI';
    this.type = 'computer';
    this.gameBoard = gameBoard();
    this.gameBoard.initializeBoard();
    this.previousMoves = new Set();
  }

  makeMove(opponent) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.previousMoves.has(`${x},${y}`));

    console.log(`Computer is attacking (${x}, ${y})`);
    this.previousMoves.add(`${x},${y}`);
    opponent.gameBoard.receiveAttack(x, y, false);
  }
}
