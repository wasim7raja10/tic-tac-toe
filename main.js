const squares = Array.from(document.querySelectorAll('.square'));
const playerTurn = document.querySelector('.player-turn');
const resetButton = document.querySelector('.restart');

const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
}

const player1 = playerFactory('Player 1', 'X');
const player2 = playerFactory('Player 2', 'O');

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    squares.forEach((square, index) => {
      square.textContent = board[index];
    });
  };

  const reset = () => {
    board.forEach((_, index) => {
      board[index] = '';
    });
    render();
  };

  return { board, render, reset };
})();

const game = (() => {
  let currentPlayer = player1;
  let gameOver = false;
  playerTurn.textContent = `${currentPlayer.getName()}'s turn`;

  const changePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playerTurn.textContent = `${currentPlayer.getName()}'s turn`;
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
        playerTurn.textContent = `${currentPlayer.getName()} wins!`;
        gameOver = true;
      }
      if (checkDraw()) {
        playerTurn.textContent = "It's a draw!";
        gameOver = true;
      }
      if(!gameOver) changePlayer();
    }
  };

  const reset = () => {
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
}
);

resetButton.addEventListener('click', () => {
  game.reset();
});

