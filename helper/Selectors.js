const squares = Array.from(document.querySelectorAll('.square'));
const gameStatus = document.querySelector('.game-status');
const resetButton = document.querySelector('.restart');
const verdict = document.createElement('div');

export { squares, gameStatus, resetButton, verdict };