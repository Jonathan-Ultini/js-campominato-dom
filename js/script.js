// Selezioniamo gli elementi dal DOM
const playButton = document.getElementById('play');
const gridContainer = document.getElementById('grid');
const difficultySelect = document.getElementById('difficulty');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

let score = 0;
let maxScore;
let gameOver = false;
let bombNumbers = [];

// Aggiunge un evento al pulsante "Play" per iniziare una nuova partita
playButton.addEventListener('click', () => {
  const gridSize = parseInt(difficultySelect.value);
  startGame(gridSize);
});

// Funzione che avvia una nuova partita
function startGame(gridSize) {
  resetGameState(gridSize);
  bombNumbers = generateBombs(gridSize * gridSize);
  createGridCells(gridSize);
}

// Funzione che resetta lo stato del gioco
function resetGameState(gridSize) {
  gridContainer.innerHTML = '';
  gridContainer.style.setProperty('--num-columns', gridSize);

  score = 0;
  gameOver = false;
  maxScore = gridSize * gridSize - 16;

  updateScore();
  messageDisplay.innerHTML = '';
}

// Funzione che aggiorna il punteggio visualizzato
function updateScore() {
  scoreDisplay.innerHTML = `Punteggio: ${score}`;
}

// Funzione che crea le celle della griglia
function createGridCells(gridSize) {
  const totalCells = gridSize * gridSize;

  for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.dataset.cellNumber = i;

    // Aggiunge un evento di click alla cella
    cell.addEventListener('click', () => handleCellClick(cell, i));

    gridContainer.appendChild(cell);
  }
}

// Funzione che gestisce il click su una cella
function handleCellClick(cell, cellNumber) {
  if (gameOver || cell.classList.contains('clicked')) return; // Blocca ulteriori clic se il gioco è finito o la cella è già stata cliccata

  if (bombNumbers.includes(cellNumber)) {
    cell.classList.add('bomb');
    endGame(false);
  } else {
    cell.classList.add('clicked');
    score++;
    updateScore();
    checkForVictory();
  }
}

// Funzione che controlla se il giocatore ha raggiunto il punteggio massimo
function checkForVictory() {
  if (score === maxScore) {
    endGame(true);
  }
}

// Funzione che genera numeri casuali per le bombe
function generateBombs(maxNumber) {
  let bombNumbers = [];
  while (bombNumbers.length < 16) {
    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    if (!bombNumbers.includes(randomNumber)) {
      bombNumbers.push(randomNumber);
    }
  }
  console.log('Numeri bomba:', bombNumbers); //da togliere
  return bombNumbers;
}

// Funzione che gestisce la fine della partita
function endGame(victory) {
  gameOver = true;
  if (victory) {
    messageDisplay.innerHTML = `Hai vinto! Punteggio finale: ${score}`;
  } else {
    messageDisplay.innerHTML = `Hai perso! Punteggio finale: ${score}`;
    revealBombs();
  }
}

// Funzione che rivela tutte le bombe alla fine del gioco
function revealBombs() {
  const cells = document.querySelectorAll('.grid-item');
  cells.forEach(cell => {
    if (bombNumbers.includes(parseInt(cell.dataset.cellNumber))) {
      cell.classList.add('bomb'); // Colora tutte le celle bomba
    }
  });
}
