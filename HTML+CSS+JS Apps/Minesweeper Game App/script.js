class MineMaster {
    constructor() {
        this.GRID_SIZE = 8;
        this.MINE_COUNT = 10;
        this.grid = [];
        this.revealed = [];
        this.gameOver = false;
        this.points = 0;
        this.win = false;

        this.gridElement = document.querySelector('.grid');
        this.scoreElement = document.querySelector('.score');
        this.messageElement = document.querySelector('.message');
        this.newGameButton = document.querySelector('.new-game-btn');

        this.newGameButton.addEventListener('click', () => this.initializeGame());
        this.initializeGame();
    }

    initializeGame() {
        this.grid = Array(this.GRID_SIZE).fill().map(() => Array(this.GRID_SIZE).fill(0));
        this.revealed = Array(this.GRID_SIZE).fill().map(() => Array(this.GRID_SIZE).fill(false));
        this.gameOver = false;
        this.points = 0;
        this.win = false;
        this.scoreElement.textContent = '0';
        this.messageElement.style.display = 'none';

        // Place mines
        let minesPlaced = 0;
        while (minesPlaced < this.MINE_COUNT) {
            const x = Math.floor(Math.random() * this.GRID_SIZE);
            const y = Math.floor(Math.random() * this.GRID_SIZE);
            if (this.grid[y][x] !== -1) {
                this.grid[y][x] = -1;
                minesPlaced++;
            }
        }

        // Calculate numbers
        for (let y = 0; y < this.GRID_SIZE; y++) {
            for (let x = 0; x < this.GRID_SIZE; x++) {
                if (this.grid[y][x] !== -1) {
                    let count = 0;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const ny = y + dy;
                            const nx = x + dx;
                            if (ny >= 0 && ny < this.GRID_SIZE && nx >= 0 && nx < this.GRID_SIZE) {
                                if (this.grid[ny][nx] === -1) count++;
                            }
                        }
                    }
                    this.grid[y][x] = count;
                }
            }
        }

        this.renderGrid();
    }

    renderGrid() {
        this.gridElement.innerHTML = '';
        for (let y = 0; y < this.GRID_SIZE; y++) {
            for (let x = 0; x < this.GRID_SIZE; x++) {
                const cell = document.createElement('button');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', () => this.revealCell(y, x));
                this.gridElement.appendChild(cell);
            }
        }
    }

    revealCell(y, x) {
        if (this.gameOver || this.revealed[y][x] || this.win) return;

        if (this.grid[y][x] === -1) {
            this.gameOver = true;
            this.showMessage('Game Over! 💥', false);
            this.revealAllMines();
            return;
        }

        this.floodFill(y, x);
        this.checkWin();
    }

    floodFill(y, x) {
        if (y < 0 || y >= this.GRID_SIZE || x < 0 || x >= this.GRID_SIZE) return;
        if (this.revealed[y][x]) return;

        this.revealed[y][x] = true;
        this.points += 10;
        this.scoreElement.textContent = this.points;

        const cell = this.gridElement.children[y * this.GRID_SIZE + x];
        cell.classList.add('revealed');
        
        if (this.grid[y][x] > 0) {
            cell.textContent = this.grid[y][x];
            cell.dataset.value = this.grid[y][x];
        }

        if (this.grid[y][x] === 0) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    this.floodFill(y + dy, x + dx);
                }
            }
        }
    }

    revealAllMines() {
        for (let y = 0; y < this.GRID_SIZE; y++) {
            for (let x = 0; x < this.GRID_SIZE; x++) {
                if (this.grid[y][x] === -1) {
                    const cell = this.gridElement.children[y * this.GRID_SIZE + x];
                    cell.classList.add('revealed', 'mine');
                    cell.textContent = '💣';
                }
            }
        }
    }

    checkWin() {
        const revealedCount = this.revealed.flat().filter(cell => cell).length;
        if (revealedCount === (this.GRID_SIZE * this.GRID_SIZE) - this.MINE_COUNT) {
            this.win = true;
            this.points += 100;
            this.scoreElement.textContent = this.points;
            this.showMessage(`Victory! 🎉 Final Score: ${this.points}`, true);
        }
    }

    showMessage(text, isWin) {
        this.messageElement.textContent = text;
        this.messageElement.className = `message ${isWin ? 'win' : 'lose'}`;
        this.messageElement.style.display = 'block';
    }
}

// Start the game
new MineMaster();