
let grid = [];
let score = 0;
let gridSize = 4;
let highScores = [];

// Initialize the game
function initGame() {
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    score = 0;
    document.getElementById('score').textContent = score;
    addNewTile();
    addNewTile();
    updateGridDisplay();
}

// Add a new tile to the grid
function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }
    if (emptyCells.length) {
        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Update the grid display
function updateGridDisplay() {
    const gridElement = document.getElementById('grid');
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
    gridElement.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            const value = grid[i][j];
            cell.textContent = value || '';
            if (value) {
                const bgLightness = 100 - Math.log2(value) * 9;
                cell.style.backgroundColor = `hsl(25, 60%, ${bgLightness}%)`;
                cell.style.color = bgLightness < 50 ? 'white' : 'black';
            }
            gridElement.appendChild(cell);
        }
    }
}

// Handle keyboard input
document.addEventListener('keydown', function(event) {
    if (!document.getElementById('game').style.display === 'block') return;

    let moved = false;
    switch (event.key) {
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
    }

    if (moved) {
        addNewTile();
        updateGridDisplay();
        checkGameOver();
    }
});

// Move functions
function moveLeft() {
    return moveTiles(grid);
}

function moveRight() {
    grid = grid.map(row => row.reverse());
    const moved = moveTiles(grid);
    grid = grid.map(row => row.reverse());
    return moved;
}

function moveUp() {
    grid = transposeGrid(grid);
    const moved = moveTiles(grid);
    grid = transposeGrid(grid);
    return moved;
}

function moveDown() {
    grid = transposeGrid(grid);
    grid = grid.map(row => row.reverse());
    const moved = moveTiles(grid);
    grid = grid.map(row => row.reverse());
    grid = transposeGrid(grid);
    return moved;
}

function transposeGrid(grid) {
    return grid[0].map((_, i) => grid.map(row => row[i]));
}

function moveTiles(grid) {
    let moved = false;
    for (let i = 0; i < gridSize; i++) {
        const row = grid[i].filter(cell => cell !== 0);
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
                row[j] *= 2;
                score += row[j];
                document.getElementById('score').textContent = score;
                row.splice(j + 1, 1);
                moved = true;
            }
        }
        const newRow = row.concat(Array(gridSize - row.length).fill(0));
        if (JSON.stringify(grid[i]) !== JSON.stringify(newRow)) {
            moved = true;
        }
        grid[i] = newRow;
    }
    return moved;
}

// Check for game over
function checkGameOver() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) return;
            if (i < gridSize - 1 && grid[i][j] === grid[i + 1][j]) return;
            if (j < gridSize - 1 && grid[i][j] === grid[i][j + 1]) return;
        }
    }
    gameOver();
}

function gameOver() {
    document.getElementById('gameOver').style.display = 'flex';
    document.getElementById('finalScore').textContent = score;
    updateHighScores();
}

// Navigation functions
function showPage(pageId) {
    const pages = ['home', 'game', 'settings', 'leaderboard'];
    pages.forEach(page => {
        document.getElementById(page).style.display = 
            page === pageId ? 'block' : 'none';
    });
    if (pageId === 'game') {
        initGame();
    }
    if (pageId === 'leaderboard') {
        updateLeaderboardDisplay();
    }
}

// Settings functions
function updateGridSize() {
    gridSize = parseInt(document.getElementById('gridSize').value);
}

function saveSettings() {
    showPage('home');
}

// Leaderboard functions
function updateHighScores() {
    highScores.push({
        score: score,
        gridSize: gridSize,
        date: new Date().toLocaleDateString()
    });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    localStorage.setItem('2048-highscores', JSON.stringify(highScores));
}

function updateLeaderboardDisplay() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = '';
    highScores.forEach((score, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.score}</td>
            <td>${score.gridSize}x${score.gridSize}</td>
            <td>${score.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Reset game
function resetGame() {
    document.getElementById('gameOver').style.display = 'none';
    initGame();
}

// Load high scores from localStorage
const savedScores = localStorage.getItem('2048-highscores');
if (savedScores) {
    highScores = JSON.parse(savedScores);
}

// Start with home page
showPage('home');
