        class MemoryGame {
            constructor() {
                this.cards = [];
                this.flippedCards = [];
                this.matchedPairs = 0;
                this.moves = 0;
                this.score = 0;
                this.gameStarted = false;
                this.timeElapsed = 0;
                this.timer = null;
                this.difficulty = 'easy';
                this.isLocked = false;

                this.boardElement = document.getElementById('gameBoard');
                this.movesElement = document.getElementById('moves');
                this.timeElement = document.getElementById('time');
                this.scoreElement = document.getElementById('score');
                this.modal = document.getElementById('winModal');
                this.difficultySelect = document.getElementById('difficultySelect');

                this.initializeEventListeners();
                this.initializeGame();
            }

            initializeEventListeners() {
                document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
                document.getElementById('playAgainBtn').addEventListener('click', () => {
                    this.modal.classList.remove('show');
                    this.resetGame();
                });
                document.getElementById('difficultySelect').addEventListener('change', (e) => {
                    this.difficulty = e.target.value;
                    this.resetGame();
                });
            }

            initializeGame() {
                const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', 
                               '🐷', '🐸', '🐵', '🦄', '🦉', '🦇', '🐺', '🐗', '🐴', '🦋', '🐌', '🐞',
                               '🐙', '🦑', '🦐', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳'];
                
                let pairs;
                switch(this.difficulty) {
                    case 'easy': pairs = 8; break;
                    case 'medium': pairs = 18; break;
                    case 'hard': pairs = 32; break;
                    default: pairs = 8;
                }

                const selectedEmojis = emojis.slice(0, pairs);
                this.cards = [...selectedEmojis, ...selectedEmojis]
                    .sort(() => Math.random() - 0.5)
                    .map((emoji, index) => ({
                        id: index,
                        emoji: emoji,
                        isFlipped: false,
                        isMatched: false
                    }));

                this.renderBoard();
            }

            renderBoard() {
                this.boardElement.innerHTML = '';
                const columns = this.difficulty === 'easy' ? 4 : 
                              this.difficulty === 'medium' ? 6 : 8;
                this.boardElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

                this.cards.forEach(card => {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'card';
                    cardElement.innerHTML = `
                        <div class="card-front">${card.emoji}</div>
                        <div class="card-back"></div>
                    `;
                    cardElement.addEventListener('click', () => this.flipCard(card, cardElement));
                    this.boardElement.appendChild(cardElement);
                });
            }

            flipCard(card, element) {
                if (this.isLocked || card.isFlipped || card.isMatched) return;
                if (!this.gameStarted) this.startGame();

                element.classList.add('flip');
                card.isFlipped = true;
                this.flippedCards.push({ card, element });

                if (this.flippedCards.length === 2) {
                    this.moves++;
                    this.movesElement.textContent = this.moves;
                    this.checkMatch();
                }
            }

            checkMatch() {
                this.isLocked = true;
                const [first, second] = this.flippedCards;

                if (first.card.emoji === second.card.emoji) {
                    first.card.isMatched = second.card.isMatched = true;
                    first.element.classList.add('matched');
                    second.element.classList.add('matched');
                    this.matchedPairs++;
                    this.updateScore(true);

                    if (this.matchedPairs === this.cards.length / 2) {
                        this.gameWon();
                    }
                } else {
                    this.updateScore(false);
                    setTimeout(() => {
                        first.element.classList.remove('flip');
                        second.element.classList.remove('flip');
                        first.card.isFlipped = second.card.isFlipped = false;
                    }, 1000);
                }

                setTimeout(() => {
                    this.flippedCards = [];
                    this.isLocked = false;
                }, 1000);
            }

            startGame() {
                this.gameStarted = true;
                this.timer = setInterval(() => {
                    this.timeElapsed++;
                    this.updateTimer();
                }, 1000);
            }

            updateTimer() {
                const minutes = Math.floor(this.timeElapsed / 60);
                const seconds = this.timeElapsed % 60;
                this.timeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }

            updateScore(isMatch) {
                if (isMatch) {
                    this.score += 100;
                } else {
                    this.score = Math.max(0, this.score - 20);
                }
                this.scoreElement.textContent = this.score;
            }

            gameWon() {
                clearInterval(this.timer);
                document.getElementById('finalTime').textContent = this.timeElement.textContent;
                document.getElementById('finalMoves').textContent = this.moves;
                document.getElementById('finalScore').textContent = this.score;
                this.modal.classList.add('show');
            }

            resetGame() {
                clearInterval(this.timer);
                this.cards = [];
                this.flippedCards = [];
                this.matchedPairs = 0;
                this.moves = 0;
                this.score = 0;
                this.gameStarted = false;
                this.timeElapsed = 0;
                this.isLocked = false;
                
                this.movesElement.textContent = '0';
                this.timeElement.textContent = '0:00';
                this.scoreElement.textContent = '0';
                
                this.initializeGame();
            }
        }

        // Start the game
        const game = new MemoryGame();
   