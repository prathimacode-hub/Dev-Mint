
        const startPopup = document.getElementById('startPopup');
        const winPopup = document.getElementById('winPopup');
        const gameContainer = document.getElementById('gameContainer');
        const startButton = document.getElementById('startButton');
        const playAgainButton = document.getElementById('playAgainButton');
        const dice1 = document.getElementById('dice1');
        const dice2 = document.getElementById('dice2');
        const rollButton = document.getElementById('rollButton');
        const resultDisplay = document.getElementById('result');

        // Start Game
        startButton.addEventListener('click', () => {
            startPopup.style.display = 'none';
            gameContainer.style.display = 'block';
        });

        // Play Again
        playAgainButton.addEventListener('click', () => {
            winPopup.style.display = 'none';
            gameContainer.style.display = 'block';
            
            // Reset dice
            dice1.textContent = '?';
            dice2.textContent = '?';
            resultDisplay.textContent = '';
            resultDisplay.classList.remove('text-green-400', 'text-red-400');
        });

        function rollDice() {
            const roll1 = Math.floor(Math.random() * 6) + 1;
            const roll2 = Math.floor(Math.random() * 6) + 1;
            
            dice1.textContent = roll1;
            dice2.textContent = roll2;
            
            const total = roll1 + roll2;
            
            if (total === 7) {
                gameContainer.style.display = 'none';
                winPopup.style.display = 'flex';
            } else if (total < 7) {
                resultDisplay.textContent = '😢 Try Again! Too Low';
                resultDisplay.classList.add('text-red-400');
            } else {
                resultDisplay.textContent = '😢 Try Again! Too High';
                resultDisplay.classList.add('text-red-400');
            }
            
            // Add dice rolling animation effect
            dice1.style.transform = 'rotateX(360deg) rotateY(360deg)';
            dice2.style.transform = 'rotateX(360deg) rotateY(360deg)';
        }

        rollButton.addEventListener('click', () => {
            // Reset previous result styles
            resultDisplay.classList.remove('text-green-400', 'text-red-400');
            resultDisplay.textContent = '';
            
            // Reset dice transforms
            dice1.style.transform = 'none';
            dice2.style.transform = 'none';
            
            // Short delay to make animation more engaging
            setTimeout(rollDice, 100);
        });
    