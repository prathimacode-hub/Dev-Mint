const gameContainer = document.getElementById("game-container");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const resetBtn = document.getElementById("reset-btn");
let basketPosition = 170; 
let score = 0;
let gameOver = false;
let objectIntervals = [];

// Move Basket
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basketPosition > 0) {
        basketPosition -= 20;
    } else if (event.key === "ArrowRight" && basketPosition < 340) {
        basketPosition += 20;
    }
    basket.style.left = basketPosition + "px";
});

// Function to create falling objects
function createFallingObject() {
    if (gameOver) return;

    const object = document.createElement("div");
    object.classList.add("falling-object");

    // Randomly choose fruit 🍎 or bomb 💣
    const isFruit = Math.random() > 0.3;
    object.innerText = isFruit ? "🍎" : "💣";
    object.classList.add(isFruit ? "fruit" : "bomb");

    object.style.left = Math.random() * 370 + "px"; // Random position
    object.style.top = "0px";
    gameContainer.appendChild(object);

    // Move the object down
    let fallInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(fallInterval);
            return;
        }

        let topPosition = parseInt(object.style.top) + 5;
        object.style.top = topPosition + "px";

        // Check if object reached the basket
        let basketRect = basket.getBoundingClientRect();
        let objectRect = object.getBoundingClientRect();

        if (
            topPosition >= 460 && 
            objectRect.left < basketRect.right &&
            objectRect.right > basketRect.left
        ) {
            clearInterval(fallInterval);
            object.remove();
            
            if (object.innerText === "🍎") {
                score += 10;
            } else {
                alert("Game Over! Your Score: " + score);
                gameOver = true;
                resetBtn.style.display = "block"; // Show reset button
            }

            scoreDisplay.innerText = "Score: " + score;
        }

        // Remove object if it falls off the screen
        if (topPosition >= 500) {
            clearInterval(fallInterval);
            object.remove();
        }
    }, 50);

    objectIntervals.push(fallInterval);
}

// Function to start game loop
function startGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    resetBtn.style.display = "none";

    objectIntervals.forEach(interval => clearInterval(interval)); // Clear old intervals
    objectIntervals = [];

    // Remove all falling objects
    document.querySelectorAll(".falling-object").forEach(obj => obj.remove());

    // Start new objects falling
    let gameLoop = setInterval(() => {
        if (gameOver) {
            clearInterval(gameLoop);
        } else {
            createFallingObject();
        }
    }, 1000);
}

// Reset game when the reset button is clicked
function resetGame() {
    startGame();
}

// Start game on page load
startGame();
