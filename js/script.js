// Selezioniamo gli elementi dal DOM
const playButton = document.getElementById('play');
const gridContainer = document.getElementById('grid');
const difficultySelect = document.getElementById('difficulty');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

let score = 0;
let maxScore;
let gameOver = false;

playButton.addEventListener('click', () => {
  const gridSize = parseInt(difficultySelect.value);
  startGame(gridSize);
});

function startGame(gridSize) {
  gridContainer.innerHTML = '';
  gridContainer.style.setProperty('--num-columns', gridSize);

  // Reset game state
  score = 0;
  gameOver = false;
  maxScore = gridSize * gridSize - 16;

  // Display initial score
  updateScore();

  // Create grid cells
  createGridCells(gridSize);
}

function updateScore() {
  scoreDisplay.textContent = `Punteggio: ${score}`;
}

function createGridCells(gridSize) {
  const totalCells = gridSize * gridSize;

  for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.textContent = i;

    cell.addEventListener('click', () => {
      if (gameOver) return;

      if (!cell.classList.contains('clicked')) {
        cell.classList.add('clicked');
        score++;
        updateScore();
      }
    });

    gridContainer.appendChild(cell);
  }
}