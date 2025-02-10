import { domInitialize } from './domManager.js';
import { placeShips } from './placeShips.js';
import { player1, player2, player1board, player2board } from './domManager.js';

export function playGame() {
  domInitialize();
  placeShips(player1);
  placeShips(player2);
}

export function endOfGame(winningPlayer) {
  function getEndOfGameMsg(winningPlayer) {
    let randomMessage = '';
    const losingMessages = [
      'Maybe Go Fish is more our speed...',
      'Time for us to shuffle off and try again!',
      'You know what they say, the house always wins!',
      'Looks like we found out who the real Joker is!',
      'Oh no, were you bluffing too?',
      "Looks like the joke's on us!",
      'If I had hands I would have covered my eyes!',
      "I'm literally a fool, what's your excuse?",
      'What a flop!',
    ];

    const winningMessages = [
      'You dealt with that pretty well!',
      "Looks like you weren't bluffing!",
      "Looks like I've taught you well!",
      'You made some heads up plays!',
      "Good thing I didn't bet against you!",
    ];
    if (winningPlayer.name === 'CPU') {
      randomMessage =
        losingMessages[Math.floor(Math.random() * losingMessages.length)];
    } else {
      randomMessage =
        winningMessages[Math.floor(Math.random() * winningMessages.length)];
    }
    return randomMessage;
  }

  player1board.classList.add('disabled');
  player2board.classList.add('disabled');

  // generate random message depending on who won
  const instructionsLabel = document.getElementById('instructionsLabel');
  instructionsLabel.classList.remove('hidden');
  instructionsLabel.textContent = getEndOfGameMsg(winningPlayer);

  // resets the player 1's name
  player1.name = 'Player 1';

  // displays a button to allow for successive games
  const player1nameContainer = document.getElementById('player1container');
  const replayBtn = document.createElement('button');
  replayBtn.id = 'replayBtn';
  replayBtn.textContent = 'Play another';

  // resets both players' previousMoves sets
  player1.previousMoves = new Set();
  player2.previousMoves = new Set();

  replayBtn.addEventListener('click', () => {
    const instructionsLabel = document.getElementById('instructionsLabel');
    instructionsLabel.textContent = 'Well, you know what to do by now.';
    player1.gameBoard.initializeBoard();
    player2.gameBoard.initializeBoard();
    placeShips(player1);
    placeShips(player2);

    replayBtn.remove();
    domInitialize();
  });

  player1nameContainer.append(replayBtn);
}
