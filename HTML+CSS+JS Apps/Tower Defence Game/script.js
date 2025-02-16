
// Game Constants and Variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gold = 100;
let lives = 20;
let wave = 1;
let towers = [];
let enemies = [];
let selectedTower = null;
let gameLoop;
let isPlacing = false;

// Tower Classes
class Tower {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.level = 1;
        this.target = null;
        this.lastShot = 0;

        switch(type) {
            case 'basic':
                this.damage = 10;
                this.range = 100;
                this.cost = 50;
                this.color = '#4a90e2';
                this.fireRate = 1000;
                break;
            case 'splash':
                this.damage = 15;
                this.range = 80;
                this.cost = 100;
                this.color = '#e74c3c';
                this.fireRate = 1500;
                break;
            case 'sniper':
                this.damage = 50;
                this.range = 200;
                this.cost = 150;
                this.color = '#2ecc71';
                this.fireRate = 2000;
                break;
            case 'frost':
                this.damage = 5;
                this.range = 90;
                this.cost = 125;
                this.color = '#95a5a6';
                this.fireRate = 800;
                break;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // Draw range indicator when selected
        if (selectedTower === this) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.stroke();
            ctx.closePath();
        }
    }

    update() {
        this.findTarget();
        this.shoot();
    }

    findTarget() {
        if (!this.target || !this.isInRange(this.target)) {
            this.target = enemies.find(enemy => this.isInRange(enemy));
        }
    }

    isInRange(enemy) {
        if (!enemy) return false;
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        return Math.sqrt(dx * dx + dy * dy) <= this.range;
    }

    shoot() {
        if (!this.target) return;
        const now = Date.now();
        if (now - this.lastShot >= this.fireRate) {
            this.target.health -= this.damage;
            this.lastShot = now;

            // Visual feedback for shooting
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.target.x, this.target.y);
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();

            if (this.type === 'frost') {
                this.target.speed *= 0.7;
            }
        }
    }
}

// Enemy Class
class Enemy {
    constructor(path) {
        this.path = path;
        this.pathIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 2;
        this.value = 10;
    }

    draw() {
        // Draw enemy
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
        ctx.closePath();

        // Draw health bar
        const healthBarWidth = 30;
        const healthPercentage = this.health / this.maxHealth;
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - 20, healthBarWidth, 5);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(this.x - healthBarWidth/2, this.y - 20, healthBarWidth * healthPercentage, 5);
    }

    update() {
        if (this.pathIndex >= this.path.length - 1) {
            lives--;
            return true;
        }

        const target = this.path[this.pathIndex + 1];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            this.pathIndex++;
        } else {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }

        return false;
    }
}

// Game Path
const gamePath = [
    {x: 0, y: 300},
    {x: 200, y: 300},
    {x: 200, y: 100},
    {x: 400, y: 100},
    {x: 400, y: 500},
    {x: 600, y: 500},
    {x: 600, y: 300},
    {x: 800, y: 300}
];

// Initialize Game
function initGame() {
    // Clear existing state
    towers = [];
    enemies = [];
    gold = 100;
    lives = 20;
    wave = 1;

    // Start game loop
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(gameUpdate, 1000/60);

    // Start spawning enemies
    spawnWave();
}

// Spawn Wave of Enemies
function spawnWave() {
    const enemyCount = wave * 5;
    let spawned = 0;

    const spawnInterval = setInterval(() => {
        if (spawned >= enemyCount) {
            clearInterval(spawnInterval);
            return;
        }

        enemies.push(new Enemy([...gamePath]));
        spawned++;
    }, 1000);
}

// Game Update Loop
function gameUpdate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw path
    drawPath();

    // Update and draw towers
    towers.forEach(tower => {
        tower.update();
        tower.draw();
    });

    // Update and draw enemies
    enemies = enemies.filter(enemy => {
        enemy.draw();
        if (enemy.health <= 0) {
            gold += enemy.value;
            return false;
        }
        return !enemy.update();
    });

    // Check if wave is complete
    if (enemies.length === 0) {
        wave++;
        spawnWave();
    }

    // Update UI
    updateUI();

   // Check game over condition
   if (lives <= 0) {
        clearInterval(gameLoop);
        alert('Game Over! You reached wave ' + wave);
        updateStats();
        initGame();
    }
}

// Draw Path
function drawPath() {
    ctx.beginPath();
    ctx.moveTo(gamePath[0].x, gamePath[0].y);
    for (let i = 1; i < gamePath.length; i++) {
        ctx.lineTo(gamePath[i].x, gamePath[i].y);
    }
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 30;
    ctx.stroke();
    ctx.lineWidth = 1;
}

// Update UI Elements
function updateUI() {
    document.getElementById('goldDisplay').textContent = gold;
    document.getElementById('livesDisplay').textContent = lives;
    document.getElementById('waveDisplay').textContent = wave;
}

// Update Stats
function updateStats() {
    const gamesPlayed = parseInt(localStorage.getItem('gamesPlayed') || '0') + 1;
    const highestWave = Math.max(parseInt(localStorage.getItem('highestWave') || '0'), wave);
    const totalEnemies = parseInt(localStorage.getItem('totalEnemies') || '0') + wave * 5;
    const towersBuilt = parseInt(localStorage.getItem('towersBuilt') || '0') + towers.length;

    localStorage.setItem('gamesPlayed', gamesPlayed);
    localStorage.setItem('highestWave', highestWave);
    localStorage.setItem('totalEnemies', totalEnemies);
    localStorage.setItem('towersBuilt', towersBuilt);

    // Update stats display
    document.getElementById('gamesPlayed').textContent = gamesPlayed;
    document.getElementById('highestWave').textContent = highestWave;
    document.getElementById('totalEnemies').textContent = totalEnemies;
    document.getElementById('towersBuilt').textContent = towersBuilt;
}

// Tower Placement
canvas.addEventListener('click', (e) => {
    if (!isPlacing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if enough gold
    const towerCost = new Tower(0, 0, selectedTower).cost;
    if (gold < towerCost) {
        alert('Not enough gold!');
        return;
    }

    // Check if tower placement is valid
    if (isValidPlacement(x, y)) {
        towers.push(new Tower(x, y, selectedTower));
        gold -= towerCost;
        isPlacing = false;
        selectedTower = null;
    } else {
        alert('Invalid placement! Cannot place tower on path.');
    }
});

// Check Valid Tower Placement
function isValidPlacement(x, y) {
    // Check distance from path
    for (let i = 0; i < gamePath.length - 1; i++) {
        const point1 = gamePath[i];
        const point2 = gamePath[i + 1];
        const distance = distanceToLine(x, y, point1.x, point1.y, point2.x, point2.y);
        if (distance < 40) return false; // 40 pixels from path
    }

    // Check distance from other towers
    for (const tower of towers) {
        const dx = tower.x - x;
        const dy = tower.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < 50) return false; // 50 pixels from other towers
    }

    return true;
}

// Calculate Distance to Line
function distanceToLine(x, y, x1, y1, x2, y2) {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

// Tower Selection Buttons
document.querySelectorAll('.tower-button').forEach(button => {
    button.addEventListener('click', () => {
        selectedTower = button.dataset.tower;
        isPlacing = true;
    });
});

// Tab Switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
    });
});

// Settings Event Listeners
document.getElementById('difficulty').addEventListener('change', (e) => {
    const difficulty = e.target.value;
    switch(difficulty) {
        case 'easy':
            Enemy.prototype.health = 80;
            Enemy.prototype.speed = 1.5;
            break;
        case 'medium':
            Enemy.prototype.health = 100;
            Enemy.prototype.speed = 2;
            break;
        case 'hard':
            Enemy.prototype.health = 150;
            Enemy.prototype.speed = 2.5;
            break;
    }
});

// Volume Controls
document.getElementById('sfxVolume').addEventListener('input', (e) => {
    // Implement sound effects volume control
    const volume = e.target.value / 100;
    // Set sound effects volume
});

document.getElementById('musicVolume').addEventListener('input', (e) => {
    // Implement music volume control
    const volume = e.target.value / 100;
    // Set music volume
});

// Initialize game when page loads
window.addEventListener('load', () => {
    initGame();
    // Load and display saved stats
    document.getElementById('gamesPlayed').textContent = localStorage.getItem('gamesPlayed') || '0';
    document.getElementById('highestWave').textContent = localStorage.getItem('highestWave') || '0';
    document.getElementById('totalEnemies').textContent = localStorage.getItem('totalEnemies') || '0';
    document.getElementById('towersBuilt').textContent = localStorage.getItem('towersBuilt') || '0';
});
