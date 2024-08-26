// Selezioniamo gli elementi dal DOM
const playButton = document.getElementById('play');
const gridContainer = document.getElementById('grid');
const difficultySelect = document.getElementById('difficulty');

playButton.addEventListener('click', () => {
  const gridSize = parseInt(difficultySelect.value);
  generateGrid(gridSize);
});

function generateGrid(gridSize) {
  gridContainer.innerHTML = '';

  gridContainer.style.setProperty('--num-columns', gridSize);

  const totalCells = gridSize * gridSize;

  for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    cell.textContent = i;

    cell.addEventListener('click', () => {
      cell.classList.add('clicked');
      console.log(`Hai cliccato sulla cella numero: ${i}`);
    });

    gridContainer.appendChild(cell);
  }
}
