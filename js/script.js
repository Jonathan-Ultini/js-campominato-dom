// Selezioniamo gli elementi dal DOM
const playButton = document.getElementById('play');
const gridContainer = document.getElementById('grid');

const difficultySelect = document.getElementById('difficulty');

playButton.addEventListener('click', function () {
  const difficulty = difficultySelect.value;
  generateGrid(difficulty);
});

function generateGrid(difficulty) {
  gridContainer.innerHTML = '';

  let gridSize;
  let gridClass;

  if (difficulty == 1) {
    gridSize = 100;
    gridClass = 'grid-10';
  } else if (difficulty == 2) {
    gridSize = 81;
    gridClass = 'grid-9';
  } else {
    gridSize = 49;
    gridClass = 'grid-7';
  }

  gridContainer.className = `grid ${gridClass}`;

  for (let i = 1; i <= gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.innerHTML = i;

    // Aggiungiamo l'evento di click su ogni cella
    cell.addEventListener('click', function () {
      cell.classList.add('clicked');
      console.log(`Hai cliccato sulla cella numero: ${i}`);
    });

    gridContainer.appendChild(cell);
  }
}
