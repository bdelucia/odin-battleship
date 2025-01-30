const ship = function (length) {
  return {
    length: length,
    timesHit: 0,
    alive: true,

    hit() {
      this.timesHit++;
    },

    isSunk() {
      if (this.length - this.timesHit) this.alive = false;
      return this.alive;
    },
  };
};
