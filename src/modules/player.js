import { player1 } from './domManager.js';
import { gameBoard } from './gameBoard.js';

export function createPlayer(type, name) {
  return type === 'human' ? new HumanPlayer(name) : new ComputerPlayer();
}

class Player {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this.ships = [];
    this.gameBoard = gameBoard();
    this.gameBoard.initializeBoard();
    this.previousMoves = new Set();
  }

  hitShipAt(x, y) {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].spacesTakenUp.includes(`${x},${y}`)) {
        this.ships[i].hit();
        return true; // hit
      }
    }
    return false; // miss
  }

  // returns false if move has already been made at coords
  trackMove(x, y) {
    if (this.previousMoves.has(`${x},${y}`)) {
      return false;
    }
    this.previousMoves.add(`${x},${y}`);
    return true;
  }
}

class HumanPlayer extends Player {
  constructor(name) {
    super('human', name);
  }

  makeMove(x, y, opponent) {
    if (!this.trackMove(x, y)) {
      alert(`Already attacked at ${x},${y}`);
      return { isValid: false, isHit: false };
    }

    const isHit = opponent.hitShipAt(x, y);
    opponent.gameBoard.receiveAttack(x, y, true);

    return { isValid: true, isHit: isHit };
  }
}

class ComputerPlayer extends Player {
  constructor() {
    super('computer', 'CPU');
  }

  makeMove(opponent) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (!this.trackMove(x, y));

    const isHit = opponent.hitShipAt(x, y);
    opponent.gameBoard.receiveAttack(x, y, false);

    return {
      isValid: true,
      isHit: isHit,
      coordinates: { x, y },
    };
  }
}
