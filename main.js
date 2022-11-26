const square = Array.from(document.querySelectorAll('.square'));
const playerTurn = document.querySelector('.player-turn');
const resetButton = document.querySelector('.restart');

const playerFactory = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
}

const player1 = playerFactory('Player 1', 'X');
const player2 = playerFactory('Player 2', 'O');
