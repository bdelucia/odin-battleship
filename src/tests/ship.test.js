import { ship } from '../modules/ship.js';

describe('Ship Module', () => {
  test('Creates a ship with the correct length and initial properties', () => {
    const testShip = ship(3);
    expect(testShip.length).toBe(3);
    expect(testShip.timesHit).toBe(0);
    expect(testShip.alive).toBe(true);
    expect(testShip.spacesTakenUp).toEqual([]);
  });

  test('hit function', () => {
    let player = ship();
    player.hit();
    expect(player.timesHit).toBe(1);
  });

  test('Ship.hit() increments timesHit', () => {
    const testShip = ship(4);
    expect(testShip.timesHit).toBe(0);

    testShip.hit();
    expect(testShip.timesHit).toBe(1);

    testShip.hit();
    expect(testShip.timesHit).toBe(2);
  });

  test('ship.isSunk() returns false when ship is not sunk', () => {
    const testShip = ship(2);

    // Ship has not been hit yet
    expect(testShip.isSunk()).toBe(true);

    // Hit the ship once
    testShip.hit();
    expect(testShip.timesHit).toBe(1);
    expect(testShip.isSunk()).toBe(true);

    // Ship should not be sunk yet
    expect(testShip.alive).toBe(true);
  });

  test('ship.isSunk() returns false when ship has been hit fewer times than its length', () => {
    const testShip = ship(3);

    // Hit the ship twice
    testShip.hit();
    testShip.hit();
    expect(testShip.timesHit).toBe(2);
    expect(testShip.isSunk()).toBe(true);

    // Ship should not be sunk yet
    expect(testShip.alive).toBe(true);
  });

  test('ship.isSunk() returns false when ship has been hit exact times as its length', () => {
    const testShip = ship(3);

    // Hit the ship three times
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.timesHit).toBe(3);
    expect(testShip.isSunk()).toBe(false);

    // Ship should be sunk
    expect(testShip.alive).toBe(false);
  });

  test('ship.isSunk() returns false when ship has been hit more times than its length', () => {
    const testShip = ship(2);

    // Hit the ship three times
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.timesHit).toBe(3);
    expect(testShip.isSunk()).toBe(false);

    // Ship should be sunk
    expect(testShip.alive).toBe(false);
  });

  test('ship.takeUpSpace() correctly records occupied coordinates', () => {
    const testShip = ship(3);

    testShip.takeUpSpace(1, 1);
    testShip.takeUpSpace(1, 2);
    testShip.takeUpSpace(1, 3);

    expect(testShip.spacesTakenUp).toEqual(['1,1', '1,2', '1,3']);
  });
});
