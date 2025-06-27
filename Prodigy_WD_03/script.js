const board = document.getElementById('board');
const status = document.getElementById('status');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],  // Rows
  [0,3,6], [1,4,7], [2,5,8],  // Columns
  [0,4,8], [2,4,6]            // Diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(index => gameState[index] === currentPlayer);
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = Array(9).fill("");
  status.textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

// Create cells dynamically
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
  status.textContent = `Player ${currentPlayer}'s turn`;
}

createBoard();

