let currentTheme = 'dark';
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
  playersTurn.style.border = '2px solid #98FB98'; // Pastel green
  playersTurn.style.boxShadow = `0 4px 10px rgba(0, 0, 0, 0.3), 0 0 10px  #98FB98`;
  playersTurn.style.color = '#98FB98';
}

export function displayPlayer2Turn(name) {
  playersTurn.textContent = name;
  playersTurn.style.border = '2px solid #FFB6C1'; // Pastel red/pink
  playersTurn.style.boxShadow = `0 4px 10px rgba(0, 0, 0, 0.3), 0 0 10px  #FFB6C1`;
  playersTurn.style.color = '#FFB6C1';
}

export function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function toggleTheme() {
  const themeSwitchBtn = document.getElementById('themeSwitchBtn');
  const root = document.documentElement;
  // Remove all existing theme classes
  root.classList.remove('light-theme', 'dark-theme');

  // Toggle the theme
  if (currentTheme === 'light') {
    currentTheme = 'dark';
    root.classList.add('dark-theme');
    themeSwitchBtn.textContent = '☀️'; // Sun emoji for light mode switch
  } else {
    currentTheme = 'light';
    root.classList.add('light-theme');
    themeSwitchBtn.textContent = '🌙'; // Moon emoji for dark mode switch
  }

  // Save theme preference to localStorage
  localStorage.setItem('theme', currentTheme);
}
