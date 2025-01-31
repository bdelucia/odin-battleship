const gameBoard = require('./gameBoard');

function createPlayer(type, name) {
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
    opponent.gameBoard.receiveAttack(x, y);
  }
}

class ComputerPlayer {
  constructor() {
    this.name = 'AI';
    this.type = 'computer';
    this.gameBoard = gameBoard();
    this.gameBoard.initializeBoard();
  }

  makeMove(opponent) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    console.log(`Computer is attacking (${x}, ${y})`);
    opponent.gameBoard.receiveAttack(x, y);
  }
}
