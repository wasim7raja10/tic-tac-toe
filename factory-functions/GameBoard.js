import { squares } from "../helper/Selectors";

const gameBoardFactory = () => {
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
}

export default gameBoardFactory;