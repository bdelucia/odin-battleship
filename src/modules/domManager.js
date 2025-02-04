function renderPlayerBoard(playerBoard, boardElement) {
  boardElement.innerHTML = '';

  const boardSize = 10;
  boardElement.style.display = 'grid';
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
  boardElement.style.gridTemplateRows = `repeat(${boardSize}, 40px)`;
  boardElement.style.gap = '2px';

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement('div');
      cell.id = `${x}${y}`; // Assign id in xy format
      cell.classList.add('cell');
      cell.style.width = '40px';
      cell.style.height = '40px';
      cell.style.border = '1px solid black';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.backgroundColor = playerBoard.gameBoard[x][y].hasShip
        ? 'gray'
        : 'lightblue';

      boardElement.appendChild(cell);
    }
  }
}
