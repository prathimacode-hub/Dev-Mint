const gameContainer = document.getElementById("game-container");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const resetBtn = document.getElementById("reset-btn");
let basketPosition = 170; 
let score = 0;
let gameOver = false;
let objectIntervals = [];


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basketPosition > 0) {
        basketPosition -= 20;
    } else if (event.key === "ArrowRight" && basketPosition < 340) {
        basketPosition += 20;
    }
    basket.style.left = basketPosition + "px";
});


function createFallingObject() {
    if (gameOver) return;

    const object = document.createElement("div");
    object.classList.add("falling-object");

 
    const isFruit = Math.random() > 0.3;
    object.innerText = isFruit ? "🍎" : "💣";
    object.classList.add(isFruit ? "fruit" : "bomb");

    object.style.left = Math.random() * 370 + "px"; 
    object.style.top = "0px";
    gameContainer.appendChild(object);

    
    let fallInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(fallInterval);
            return;
        }

        let topPosition = parseInt(object.style.top) + 5;
        object.style.top = topPosition + "px";

       
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
                resetBtn.style.display = "block"; 
            }

            scoreDisplay.innerText = "Score: " + score;
        }

        
        if (topPosition >= 500) {
            clearInterval(fallInterval);
            object.remove();
        }
    }, 50);

    objectIntervals.push(fallInterval);
}


function startGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    resetBtn.style.display = "none";

    objectIntervals.forEach(interval => clearInterval(interval)); 
    objectIntervals = [];


    document.querySelectorAll(".falling-object").forEach(obj => obj.remove());

  
    let gameLoop = setInterval(() => {
        if (gameOver) {
            clearInterval(gameLoop);
        } else {
            createFallingObject();
        }
    }, 1000);
}


function resetGame() {
    startGame();
}


startGame();
