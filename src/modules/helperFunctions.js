export function randomBetweenTwo(value1, value2) {
  return Math.random() < 0.5 ? value1 : value2;
}

export function getRandomCoordinates() {
  const x = Math.floor(Math.random() * 10); // 0-9
  const y = Math.floor(Math.random() * 10); // 0-9
  return { x, y };
}

export function convertToRGBA(color, alpha) {
  let rgbaMatch = color.match(/\d+/g); // Extract numbers from rgb/rgba string
  if (!rgbaMatch || rgbaMatch.length < 3) return color; // Return original if format is unexpected

  let [r, g, b] = rgbaMatch; // Extract RGB values
  return `rgba(${r}, ${g}, ${b}, ${alpha})`; // Return with modified opacity
}

const playersTurn = document.getElementById('playersTurn');

export function displayPlayer1Turn(name) {
  playersTurn.textContent = name;
  playersTurn.style.backgroundColor = '#98FB98'; // Pastel green
  playersTurn.style.color = '#006400'; // Darker green for text
}

export function displayPlayer2Turn(name) {
  playersTurn.textContent = name;
  playersTurn.style.backgroundColor = '#FFB6C1'; // Pastel red/pink
  playersTurn.style.color = '#8B0000'; // Darker red for text
}
