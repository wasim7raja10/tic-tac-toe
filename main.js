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
  playerTurn.textContent = `${currentPlayer.getName()}'s turn`;

  const changePlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playerTurn.textContent = `${currentPlayer.getName()}'s turn`;
  };
})();
