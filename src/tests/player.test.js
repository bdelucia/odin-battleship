// player.test.js

import { createPlayer } from '../modules/player.js';
import { gameBoard } from '../modules/gameBoard.js';
import { ship } from '../modules/ship.js';

// Mock dependencies and DOM interactions
jest.mock('../modules/gameBoard.js', () => {
  const originalModule = jest.requireActual('../modules/gameBoard.js');
  return {
    ...originalModule,
    gameBoard: jest.fn(() => {
      return {
        gameBoard: [],
        missedShots: [],
        initializeBoard() {
          // Initialize a 10x10 board with empty cells
          this.gameBoard = Array.from({ length: 10 }, (_, x) =>
            Array.from({ length: 10 }, (_, y) => ({
              x,
              y,
              hasShip: false,
              attackMissed: null,
            })),
          );
        },
        receiveAttack(x, y) {
          // Simplified receiveAttack logic for testing
          const cell = this.getCell(x, y);
          if (cell) {
            if (cell.hasShip) {
              cell.attackMissed = false;
            } else {
              cell.attackMissed = true;
              this.missedShots.push([x, y]);
            }
          }
        },
        getCell(x, y) {
          if (x >= 0 && x < 10 && y >= 0 && y < 10) {
            return this.gameBoard[x][y];
          }
          return null;
        },
      };
    }),
  };
});

describe('Player Module', () => {
  let humanPlayer, computerPlayer, opponent;

  beforeEach(() => {
    humanPlayer = createPlayer('human', 'Alice');
    computerPlayer = createPlayer('computer');
    opponent = createPlayer('human', 'Bob');

    // Mock ships and place them on the opponent's board
    const opponentShip = ship(1); // Ship of length 1 for simplicity
    opponentShip.spacesTakenUp = ['5,5'];
    opponent.ships.push(opponentShip);
  });

  test('createPlayer creates a human player', () => {
    expect(humanPlayer.type).toBe('human');
    expect(humanPlayer.name).toBe('Alice');
  });

  test('createPlayer creates a computer player', () => {
    expect(computerPlayer.type).toBe('computer');
    expect(computerPlayer.name).toBe('CPU');
  });

  test('human player makes a valid move and hits a ship', () => {
    const result = humanPlayer.makeMove(5, 5, opponent);
    expect(result.isValid).toBe(true);
    expect(result.isHit).toBe(true);

    // Check that the opponent's ship has been hit
    expect(opponent.ships[0].timesHit).toBe(1);

    // Check that the move is tracked
    expect(humanPlayer.previousMoves.has('5,5')).toBe(true);
  });

  test('human player makes a valid move and misses', () => {
    const result = humanPlayer.makeMove(6, 6, opponent);
    expect(result.isValid).toBe(true);
    expect(result.isHit).toBe(false);

    // Check that the move is tracked
    expect(humanPlayer.previousMoves.has('6,6')).toBe(true);

    // Check that the opponent's game board has recorded the attack
    const attackedCell = opponent.gameBoard.getCell(6, 6);
    expect(attackedCell.attackMissed).toBe(true);
    expect(opponent.gameBoard.missedShots).toContainEqual([6, 6]);
  });

  test('human player tries to make an invalid move (repeated coordinates)', () => {
    // First move
    humanPlayer.makeMove(7, 7, opponent);
    // Second move at the same coordinates
    const result = humanPlayer.makeMove(7, 7, opponent);

    expect(result.isValid).toBe(false);
    expect(result.isHit).toBe(false);
  });

  test('computer player makes a move and hits or misses', () => {
    // Mock random coordinates for deterministic testing
    jest
      .spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.55)
      .mockReturnValueOnce(0.55); // x=5, y=5

    const result = computerPlayer.makeMove(opponent);

    expect(result.isValid).toBe(true);
    expect(result.isHit).toBe(true);
    expect(result.coordinates).toEqual({ x: 5, y: 5 });

    // Clean up the mock
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('player hits ship at given coordinates', () => {
    // Opponent has a ship at (5,5)
    const wasHit = opponent.hitShipAt(5, 5);
    expect(wasHit).toBe(true);
    expect(opponent.ships[0].timesHit).toBe(1);

    // Attempt to hit at empty coordinates
    const wasMissed = opponent.hitShipAt(4, 4);
    expect(wasMissed).toBe(false);
  });

  test('player tracks moves and prevents repeats', () => {
    const move1 = humanPlayer.trackMove(1, 1);
    expect(move1).toBe(true); // Move was added

    const move2 = humanPlayer.trackMove(1, 1);
    expect(move2).toBe(false); // Move was already made

    expect(humanPlayer.previousMoves.has('1,1')).toBe(true);
  });
});
