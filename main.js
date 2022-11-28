import verdictTemplate from './components/Verdict.js';
import { squares, gameStatus, resetButton, verdict } from './helper/Selectors.js';
import playerFactory from './factory-functions/Player.js';
import gameBoardFactory from './factory-functions/GameBoard.js';

const player1 = playerFactory('Player 1', 'X');
const player2 = playerFactory('Player 2', 'O');

const gameBoard = gameBoardFactory();

const game = (() => {
  let currentPlayer = player1;
  let gameOver = false;
  gameStatus.textContent = `${currentPlayer.getName()}'s turn - ${currentPlayer.getSymbol()}`;

  const changePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    gameStatus.textContent = `${currentPlayer.getName()}'s turn - ${currentPlayer.getSymbol()}`;
  };

  // gameover true if checkWin returns true or checkDraw returns true
  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombos.some((combo) => {
      return combo.every((index) => {
        return gameBoard.board[index] === currentPlayer.getSymbol();
      });
    });
  };

  const checkDraw = () => {
    return gameBoard.board.every((square) => {
      return square !== '';
    });
  };

  const play = (index) => {
    if (gameBoard.board[index] === '' && !gameOver) {
      gameBoard.board[index] = currentPlayer.getSymbol();
      gameBoard.render();
      if (checkWin()) {
        gameStatus.textContent = `${currentPlayer.getName()} win!`;
        gameOver = true;
      }
      else if (checkDraw()) {
        gameStatus.textContent = "It's a draw!";
        gameOver = true;
      }
      else changePlayer();
      if (gameOver) {
        verdict.innerHTML = verdictTemplate(gameStatus.textContent);
        document.body.appendChild(verdict);
        gameStatus.textContent = '';
      }
    }
  };

  const reset = () => {
    if (document.body.contains(verdict)) {
      document.body.removeChild(verdict);
    }
    gameOver = false;
    gameBoard.reset();
    changePlayer();
  };

  return { play, reset };
})();

// event driven dvelopment

squares.forEach((square, index) => {
  square.addEventListener('click', () => {
    game.play(index);
  });
});

resetButton.addEventListener('click', () => {
  game.reset();
});

