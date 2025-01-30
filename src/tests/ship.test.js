const ship = require('../modules/ship');

test('hit function', () => {
  let player = ship();
  player.hit();
  expect(player.timesHit).toBe(1);
});
