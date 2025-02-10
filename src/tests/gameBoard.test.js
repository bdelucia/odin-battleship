// gameBoard.test.js

import { gameBoard } from '../modules/gameBoard.js';

// Mock DOM elements
const mockDocument = () => {
  const cells = {};

  return {
    getElementById: jest.fn((id) => {
      if (!cells[id]) {
        cells[id] = {
          style: {},
        };
      }
      return cells[id];
    }),
  };
};

describe('gameBoard Module', () => {
  let board;

  beforeEach(() => {
    // Reset gameBoard before each test
    board = gameBoard();
    board.initializeBoard();

    // Mock the document object
    global.document = mockDocument();
  });

  afterEach(() => {
    // Clean up
    jest.clearAllMocks();
  });

  test('initializes board correctly', () => {
    expect(board.gameBoard.length).toBe(10); // 10 rows
    board.gameBoard.forEach((row) => {
      expect(row.length).toBe(10); // 10 columns
      row.forEach((cell) => {
        expect(cell).toBeDefined();
        expect(cell).toHaveProperty('x');
        expect(cell).toHaveProperty('y');
        expect(cell.hasShip).toBe(false);
        expect(cell.attackMissed).toBeNull();
      });
    });
  });

  test('places ship correctly', () => {
    board.placeShip(2, 3);
    const cell = board.getCell(2, 3);
    expect(cell.hasShip).toBe(true);
  });

  test('receiveAttack registers a hit', () => {
    // Place a ship at position (5,5)
    board.placeShip(5, 5);

    // Simulate attack
    board.receiveAttack(5, 5, true); // attackerIsHuman: true

    const cell = board.getCell(5, 5);
    expect(cell.attackMissed).toBe(false);

    // Verify DOM manipulation
    expect(document.getElementById).toHaveBeenCalledWith('p2-55');
    const attackedCell = document.getElementById('p2-55');
    expect(attackedCell.style.backgroundColor).toBe('red');
  });

  test('receiveAttack registers a miss', () => {
    // Simulate attack at position without a ship
    board.receiveAttack(6, 6, true);

    const cell = board.getCell(6, 6);
    expect(cell.attackMissed).toBe(true);
    expect(board.missedShots).toContainEqual([6, 6]);

    // Verify DOM manipulation
    expect(document.getElementById).toHaveBeenCalledWith('p2-66');
    const attackedCell = document.getElementById('p2-66');
    expect(attackedCell.style.backgroundColor).toBe('blue');
  });

  test('getCell returns correct cell', () => {
    const cell = board.getCell(1, 1);
    expect(cell).toBeDefined();
    expect(cell.x).toBe(1);
    expect(cell.y).toBe(1);
  });

  test('getCell returns null for out-of-bounds indices', () => {
    const cell = board.getCell(10, 10); // Out of bounds (0-9 valid)
    expect(cell).toBeNull();
  });

  test('printCell returns JSON string of the cell', () => {
    const cellString = board.printCell(2, 2);
    const expectedString = JSON.stringify(board.gameBoard[2][2]);
    expect(cellString).toBe(expectedString);
  });
});
