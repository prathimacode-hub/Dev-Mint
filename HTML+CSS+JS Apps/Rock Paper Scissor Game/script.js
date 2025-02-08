
        class ParticleSystem {
            constructor() {
                this.canvas = document.querySelector('.particles');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.resize();
                window.addEventListener('resize', () => this.resize());
            }

            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            createParticles(x, y, color, count = 30) {
                for (let i = 0; i < count; i++) {
                    this.particles.push({
                        x,
                        y,
                        vx: (Math.random() - 0.5) * 10,
                        vy: (Math.random() - 0.5) * 10 - 5,
                        size: Math.random() * 6 + 2,
                        color,
                        life: 1,
                        gravity: 0.2
                    });
                }
            }

            update() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const p = this.particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += p.gravity;
                    p.life -= 0.02;
                    
                    this.ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    if (p.life <= 0) {
                        this.particles.splice(i, 1);
                    }
                }
                
                if (this.particles.length > 0) {
                    requestAnimationFrame(() => this.update());
                }
            }
        }

        class Game {
            constructor() {
                this.particles = new ParticleSystem();
                this.playerScore = 0;
                this.computerScore = 0;
                this.streak = 0;
                this.maxScore = 5;
                this.choices = ['rock', 'paper', 'scissors'];
                this.initializeGame();
            }

            initializeGame() {
                this.setupEventListeners();
                document.getElementById('start-modal').classList.add('active');
            }

            setupEventListeners() {
                document.querySelectorAll('.choice').forEach(choice => {
                    choice.addEventListener('click', (e) => this.handleChoice(e));
                });

                document.getElementById('start-button').addEventListener('click', () => {
                    document.getElementById('start-modal').classList.remove('active');
                });

                document.getElementById('play-again-button').addEventListener('click', () => {
                    document.getElementById('end-modal').classList.remove('active');
                    this.resetGame();
                });
            }

            handleChoice(e) {
                const playerChoice = e.currentTarget.dataset.choice;
                const computerChoice = this.getComputerChoice();
                
                this.animateBattle(playerChoice, computerChoice);
                const result = this.determineWinner(playerChoice, computerChoice);
                this.updateScore(result);
                this.showResult(result);
                
                if (this.playerScore >= this.maxScore || this.computerScore >= this.maxScore) {
                    this.endGame();
                }
            }

            getComputerChoice() {
                return this.choices[Math.floor(Math.random() * this.choices.length)];
            }

            determineWinner(player, computer) {
                if (player === computer) return 'tie';
                
                const wins = {
                    rock: 'scissors',
                    paper: 'rock',
                    scissors: 'paper'
                };
                
                return wins[player] === computer ? 'win' : 'lose';
            }

            updateScore(result) {
                if (result === 'win') {
                    this.playerScore++;
                    this.streak++;
                } else if (result === 'lose') {
                    this.computerScore++;
                    this.streak = 0;
                }
                
                document.getElementById('player-score').textContent = this.playerScore;
                document.getElementById('computer-score').textContent = this.computerScore;
                document.getElementById('streak').textContent = this.streak;
            }

            animateBattle(playerChoice, computerChoice) {
                const playerDiv = document.querySelector('.player-choice');
                const computerDiv = document.querySelector('.computer-choice');
                
                playerDiv.innerHTML = this.getChoiceSVG(playerChoice);
                computerDiv.innerHTML = this.getChoiceSVG(computerChoice);
                
                playerDiv.classList.add('battle-animation');
                computerDiv.classList.add('battle-animation');
                
                setTimeout(() => {
                    playerDiv.classList.remove('battle-animation');
                    computerDiv.classList.remove('battle-animation');
                }, 500);
            }

            getChoiceSVG(choice) {
                const svgs = {
                    rock: `<svg viewBox="0 0 100 100">
                        <path d="M50,10 C30,10 15,25 15,45 C15,65 30,80 50,80 C70,80 85,65 85,45 C85,25 70,10 50,10 Z M50,70 C35,70 25,60 25,45 C25,30 35,20 50,20 C65,20 75,30 75,45 C75,60 65,70 50,70 Z" fill="white"/>
                    </svg>`,
                    paper: `<svg viewBox="0 0 100 100">
                        <rect x="20" y="20" width="60" height="60" rx="10" fill="white"/>
                    </svg>`,
                    scissors: `<svg viewBox="0 0 100 100">
                        <path d="M30,30 L70,70 M30,70 L70,30" stroke="white" stroke-width="8" stroke-linecap="round"/>
                    </svg>`
                };
                return svgs[choice];
            }

            showResult(result) {
                const resultDiv = document.getElementById('result');
                let message = '';
                let color = '';
                
                switch(result) {
                    case 'win':
                        message = 'You Win!';
                        color = '99, 102, 241';
                        break;
                    case 'lose':
                        message = 'You Lose!';
                        color = '248, 113, 113';
                        break;
                    default:
                        message = "It's a Tie!";
                        color = '255, 255, 255';
                }
                
                resultDiv.textContent = message;
                resultDiv.classList.add('show');
                
                // Create particles effect
                const rect = resultDiv.getBoundingClientRect();
                this.particles.createParticles(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    color
                );
                this.particles.update();
                
                setTimeout(() => {
                    resultDiv.classList.remove('show');
                }, 1500);
            }

            endGame() {
                setTimeout(() => {
                    const endModal = document.getElementById('end-modal');
                    const finalScore = document.getElementById('final-score');
                    finalScore.textContent = `${this.playerScore} - ${this.computerScore}`;
                    
                    // Create celebration particles if player wins
                    if (this.playerScore > this.computerScore) {
                        for (let i = 0; i < 3; i++) {
                            setTimeout(() => {
                                this.particles.createParticles(
                                    Math.random() * window.innerWidth,
                                    Math.random() * window.innerHeight,
                                    '99, 102, 241'
                                );
                            }, i * 300);
                        }
                    }
                    
                    endModal.classList.add('active');
                }, 1000);
            }

            resetGame() {
                this.playerScore = 0;
                this.computerScore = 0;
                this.streak = 0;
                document.getElementById('player-score').textContent = '0';
                document.getElementById('computer-score').textContent = '0';
                document.getElementById('streak').textContent = '0';
                document.querySelector('.player-choice').innerHTML = '';
                document.querySelector('.computer-choice').innerHTML = '';
            }
        }

        // Initialize the game when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            const game = new Game();
        });
    