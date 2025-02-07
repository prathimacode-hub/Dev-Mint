
let targetNumber = Math.floor(Math.random() * 20) + 1;
let attempts = 0;

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const resultDiv = document.getElementById('result');
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > 20) {
        showResult("Please enter a valid number between 1 and 20", "try-again");
        return;
    }

    if (guess === targetNumber) {
        const winMessage = `
            <span class="emoji">🎉</span> Congratulations! <span class="emoji">🎉</span><br>
            You guessed it in ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}<br>
            The number was: ${targetNumber}<br>
            Yippie You Win!! <span class="emoji">😄</span> <span class="emoji">🏆</span>
        `;
        showResult(winMessage, "win");
        document.querySelector('button').textContent = "PLAY AGAIN";
        document.querySelector('button').onclick = resetGame;
    } else {
        const hint = guess > targetNumber ? "Too high!" : "Too low!";
        showResult(`${hint} Try again.`, "try-again");
    }
}

function showResult(message, className) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = "result " + className;
    resultDiv.style.display = "block";
    
    // Force reflow to trigger animation
    resultDiv.offsetHeight;
    resultDiv.classList.add("show");
}

function resetGame() {
    targetNumber = Math.floor(Math.random() * 20) + 1;
    attempts = 0;
    const resultDiv = document.getElementById('result');
    document.getElementById('guessInput').value = "";
    resultDiv.classList.remove("show");
    
    setTimeout(() => {
        resultDiv.style.display = "none";
        document.querySelector('button').textContent = "GUESS";
        document.querySelector('button').onclick = checkGuess;
    }, 300);
}

// Add keyboard support
document.getElementById('guessInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});