const gameContainer = document.getElementById('game-container');
const block = document.getElementById('block');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const gameOverDisplay = document.getElementById('game-over');

let blockY = 300;
let velocity = 0;
let gravity = 0.15;    // Much lower gravity
let jump = -4;         // Much gentler jump
let score = 0;
let gameLoop;
let obstacles = [];
let gameActive = false;

function startGame() {
    blockY = 300;
    velocity = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];
    gameOverDisplay.style.display = 'none';
    gameActive = true;

    gameLoop = setInterval(updateGame, 20);
    setInterval(createObstacle, 3000);  // Much longer delay between obstacles
}

function updateGame() {
    if (!gameActive) return;

    velocity += gravity;
    velocity = Math.min(velocity, 5);  // Limit falling speed
    blockY += velocity;
    block.style.top = blockY + 'px';

    const blockRect = block.getBoundingClientRect();
    
    // More forgiving boundary checking
    if (blockY < -30 || blockY > gameContainer.clientHeight - 30) {
        gameOver();
    }

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        // More forgiving collision detection
        if (
            blockRect.right - 10 > obstacleRect.left &&
            blockRect.left + 10 < obstacleRect.right &&
            (blockRect.top + 10 < obstacleRect.top + obstacleRect.height &&
            blockRect.bottom - 10 > obstacleRect.top)
        ) {
            gameOver();
        }
    });
}

function createObstacle() {
    if (!gameActive) return;

    const gapHeight = 300;  // Much larger gap
    const gapPosition = Math.random() * (gameContainer.clientHeight - gapHeight - 100) + 50;

    const topObstacle = document.createElement('div');
    topObstacle.className = 'obstacle';
    topObstacle.style.height = gapPosition + 'px';
    topObstacle.style.top = '0';
    gameContainer.appendChild(topObstacle);

    const bottomObstacle = document.createElement('div');
    bottomObstacle.className = 'obstacle';
    bottomObstacle.style.height = (gameContainer.clientHeight - gapPosition - gapHeight) + 'px';
    bottomObstacle.style.bottom = '0';
    gameContainer.appendChild(bottomObstacle);

    obstacles.push(topObstacle, bottomObstacle);

    let position = gameContainer.clientWidth;
    const moveObstacles = setInterval(() => {
        if (!gameActive) {
            clearInterval(moveObstacles);
            return;
        }

        position -= 1;  // Much slower obstacle movement
        topObstacle.style.right = gameContainer.clientWidth - position + 'px';
        bottomObstacle.style.right = gameContainer.clientWidth - position + 'px';

        if (position < -80) {
            topObstacle.remove();
            bottomObstacle.remove();
            obstacles = obstacles.filter(obs => obs !== topObstacle && obs !== bottomObstacle);
            clearInterval(moveObstacles);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }, 20);
}

function gameOver() {
    gameActive = false;
    clearInterval(gameLoop);
    gameOverDisplay.style.display = 'block';
}

gameContainer.addEventListener('click', () => {
    if (gameActive) {
        velocity = jump;
    }
});

// Add continuous floating while mouse/finger is held down
let floatInterval;
gameContainer.addEventListener('mousedown', () => {
    if (gameActive) {
        floatInterval = setInterval(() => {
            velocity = Math.max(velocity, -2);  // Gentle floating
        }, 50);
    }
});

gameContainer.addEventListener('mouseup', () => {
    clearInterval(floatInterval);
});

gameContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameActive) {
        floatInterval = setInterval(() => {
            velocity = Math.max(velocity, -2);
        }, 50);
    }
});

gameContainer.addEventListener('touchend', () => {
    clearInterval(floatInterval);
});

startButton.addEventListener('click', startGame);