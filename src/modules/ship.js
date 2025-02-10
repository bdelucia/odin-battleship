export const ship = function (length) {
  return {
    length: length,
    timesHit: 0,
    alive: true,
    spacesTakenUp: [],

    hit() {
      this.timesHit++;
    },

    // TODO
    takeUpSpace(x, y) {
      this.spacesTakenUp.push(`${x},${y}`);
    },

    isSunk() {
      if (this.timesHit >= this.length) this.alive = false;
      return this.alive;
    },
  };
};
