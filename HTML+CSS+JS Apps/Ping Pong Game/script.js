const gameContainer = document.getElementById('game-container');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');

let paddle1Y = 150;
let paddle2Y = 150;
let ballX = 390;
let ballY = 190;
let ballSpeedX = 2;
let ballSpeedY = 2;
const paddleSpeed = 5;
let player1Score = 0;
let player2Score = 0;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            if (paddle1Y > 0) paddle1Y -= paddleSpeed;
            break;
        case 's':
            if (paddle1Y < 300) paddle1Y += paddleSpeed;
            break;
        case 'ArrowUp':
            if (paddle2Y > 0) paddle2Y -= paddleSpeed;
            break;
        case 'ArrowDown':
            if (paddle2Y < 300) paddle2Y += paddleSpeed;
            break;
    }
    paddle1.style.top = `${paddle1Y}px`;
    paddle2.style.top = `${paddle2Y}px`;
});

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= 380) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= 10 && ballY >= paddle1Y && ballY <= paddle1Y + 100) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX >= 770 && ballY >= paddle2Y && ballY <= paddle2Y + 100) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX <= 0) {
        increasePlayer2Score();
        resetBall();
    } else if (ballX >= 780) {
        increasePlayer1Score();
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function increasePlayer1Score() {
    player1Score++;
    player1ScoreDisplay.textContent = player1Score;
}

function increasePlayer2Score() {
    player2Score++;
    player2ScoreDisplay.textContent = player2Score;
}

function resetBall() {
    ballX = 390;
    ballY = 190;
    ballSpeedX = Math.random() > 0.5 ? 2 : -2;
    ballSpeedY = Math.random() > 0.5 ? 2 : -2;
}

function gameLoop() {
    updateBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();