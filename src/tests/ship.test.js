const ship = require('../modules/ship.js');

test('hit function', () => {
  let player = ship();
  player.hit();
  expect(player.timesHit).toBe(1);
});
