
        class MazeGame {
            constructor() {
                this.mazeEl = document.getElementById('maze');
                this.timeEl = document.getElementById('time');
                this.levelEl = document.getElementById('level');
                this.scoreEl = document.getElementById('score');
                this.maze = [];
                this.player = { x: 1, y: 1 };
                this.exit = { x: 0, y: 0 };
                this.powerups = [];
                this.size = 15;
                this.level = 1;
                this.score = 0;
                this.time = 60;
                this.gameInterval = null;
                this.isGameActive = false;
                
                this.initializeEventListeners();
                this.initializeTabs();
            }

            initializeEventListeners() {
                document.getElementById('startGame').addEventListener('click', () => this.startGame());
                document.getElementById('resetGame').addEventListener('click', () => this.resetGame());
                document.getElementById('restartGame').addEventListener('click', () => this.resetGame());
                document.getElementById('nextLevel').addEventListener('click', () => this.startNextLevel());
                document.addEventListener('keydown', (e) => this.handleKeyPress(e));
            }

            initializeTabs() {
                const tabButtons = document.querySelectorAll('.tab-btn');
                tabButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const tabId = button.dataset.tab;
                        this.switchTab(tabId);
                    });
                });
            }

            switchTab(tabId) {
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
                document.getElementById(tabId).classList.add('active');
            }

            generateMaze() {
                this.maze = Array(this.size).fill().map(() => Array(this.size).fill(1));
                this.recursiveBacktracker(1, 1);
                this.player = { x: 1, y: 1 };
                this.placePowerups();
                this.placeExit();
            }

            recursiveBacktracker(x, y) {
                this.maze[y][x] = 0;
                const directions = this.shuffleArray([[0, 2], [2, 0], [0, -2], [-2, 0]]);
                
                for (let [dx, dy] of directions) {
                    const newX = x + dx;
                    const newY = y + dy;
                    
                    if (newX > 0 && newX < this.size - 1 && newY > 0 && newY < this.size - 1 && this.maze[newY][newX] === 1) {
                        this.maze[y + dy/2][x + dx/2] = 0;
                        this.recursiveBacktracker(newX, newY);
                    }
                }
            }

            shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            placePowerups() {
                this.powerups = [];
                const numPowerups = Math.min(3 + this.level, 8);
                
                for (let i = 0; i < numPowerups; i++) {
                    let x, y;
                    do {
                        x = Math.floor(Math.random() * (this.size - 2)) + 1;
                        y = Math.floor(Math.random() * (this.size - 2)) + 1;
                    } while (this.maze[y][x] === 1 || (x === this.player.x && y === this.player.y));
                    
                    this.powerups.push({ x, y });
                }
            }

            placeExit() {
                let x, y;
                do {
                    x = this.size - 2;
                    y = Math.floor(Math.random() * (this.size - 2)) + 1;
                } while (this.maze[y][x] === 1);
                
                this.exit = { x, y };
            }

            renderMaze() {
                this.mazeEl.style.gridTemplateColumns = `repeat(${this.size}, 30px)`;
                this.mazeEl.innerHTML = '';
                
                for (let y = 0; y < this.size; y++) {
                    for (let x = 0; x < this.size; x++) {
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        
                        if (this.maze[y][x] === 1) {
                            cell.classList.add('wall');
                        } else if (x === this.player.x && y === this.player.y) {
                            cell.classList.add('player');
                        } else if (x === this.exit.x && y === this.exit.y) {
                            cell.classList.add('exit');
                        } else if (this.powerups.some(p => p.x === x && p.y === y)) {
                            cell.classList.add('powerup');
                        }
                        
                        this.mazeEl.appendChild(cell);
                    }
                }
            }

            handleKeyPress(e) {
                if (!this.isGameActive) return;
                
                const key = e.key.toLowerCase();
                let dx = 0, dy = 0;
                
                switch (key) {
                    case 'arrowup':
                    case 'w':
                        dy = -1;
                        break;
                    case 'arrowdown':
                    case 's':
                        dy = 1;
                        break;
                    case 'arrowleft':
                    case 'a':
                        dx = -1;
                        break;
                    case 'arrowright':
                    case 'd':
                        dx = 1;
                        break;
                }
                
                const newX = this.player.x + dx;
                const newY = this.player.y + dy;
                
                if (this.maze[newY][newX] === 0) {
                    this.player.x = newX;
                    this.player.y = newY;
                    
                    // Check for powerup collection
                    const powerupIndex = this.powerups.findIndex(p => p.x === newX && p.y === newY);
                    if (powerupIndex !== -1) {
                        this.powerups.splice(powerupIndex, 1);
                        this.score += 100;
                        this.time += 10;
                        this.updateScore();
                    }
                    
                    // Check for exit
                    if (newX === this.exit.x && newY === this.exit.y) {
                        this.completeLevel();
                    }
                    
                    this.renderMaze();
                }
            }

            startGame() {
                if (this.isGameActive) return;
                
                this.isGameActive = true;
                this.level = 1;
                this.score = 0;
                this.time = 60;
                this.size = 15;
                this.updateScore();
                this.generateMaze();
                this.renderMaze();
                
                this.gameInterval = setInterval(() => {
                    this.time--;
                    this.timeEl.textContent = this.time;
                    
                    if (this.time <= 0) {
                        this.gameOver();
                    }
                }, 1000);
            }

            resetGame() {
                this.isGameActive = false;
                clearInterval(this.gameInterval);
                this.hideGameOver();
                this.hideLevelComplete();
                this.startGame();
            }

            gameOver() {
                this.isGameActive = false;
                clearInterval(this.gameInterval);
                document.querySelector('.game-over').style.display = 'block';
                document.getElementById('finalScore').textContent = this.score;
                this.updateLeaderboard();
            }

            completeLevel() {
                this.isGameActive = false;
                clearInterval(this.gameInterval);
                
                const levelComplete = document.getElementById('levelComplete');
                const levelScore = document.getElementById('levelScore');
                
                levelScore.textContent = this.score;
                levelComplete.style.display = 'flex';
                
                this.updateLeaderboard();
            }

            startNextLevel() {
                this.hideLevelComplete();
                this.level++;
                this.size = Math.min(15 + this.level * 2, 25);
                this.time = Math.max(60 - this.level * 5, 30);
                this.score += 500;
                this.updateScore();
                
                this.generateMaze();
                this.renderMaze();
                
                this.isGameActive = true;
                this.gameInterval = setInterval(() => {
                    this.time--;
                    this.timeEl.textContent = this.time;
                    
                    if (this.time <= 0) {
                        this.gameOver();
                    }
                }, 1000);
            }

            updateScore() {
                this.scoreEl.textContent = this.score;
                this.levelEl.textContent = this.level;
            }

            hideGameOver() {
                document.querySelector('.game-over').style.display = 'none';
            }

            hideLevelComplete() {
                document.getElementById('levelComplete').style.display = 'none';
            }

            updateLeaderboard() {
                let leaderboard = JSON.parse(localStorage.getItem('mazeRunnerLeaderboard') || '[]');
                leaderboard.push({
                    score: this.score,
                    level: this.level,
                    date: new Date().toLocaleDateString()
                });
                
                leaderboard.sort((a, b) => b.score - a.score);
                leaderboard = leaderboard.slice(0, 10);
                
                localStorage.setItem('mazeRunnerLeaderboard', JSON.stringify(leaderboard));
                this.renderLeaderboard();
            }

            renderLeaderboard() {
                const leaderboard = JSON.parse(localStorage.getItem('mazeRunnerLeaderboard') || '[]');
                const leaderboardEl = document.getElementById('leaderboardContent');
                
                leaderboardEl.innerHTML = `
                    <table style="width: 100%; margin-top: 20px;">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Score</th>
                                <th>Level</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${leaderboard.map((entry, index) => `
                                <tr>
                                    <td>#${index + 1}</td>
                                    <td>${entry.score}</td>
                                    <td>${entry.level}</td>
                                    <td>${entry.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            }
        }

        // Initialize game
        const game = new MazeGame();
    