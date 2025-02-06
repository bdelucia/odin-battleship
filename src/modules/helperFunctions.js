export function randomBetweenTwo(value1, value2) {
  return Math.random() < 0.5 ? value1 : value2;
}

export function getRandomCoordinates() {
  const x = Math.floor(Math.random() * 10); // 0-9
  const y = Math.floor(Math.random() * 10); // 0-9
  return { x, y };
}
