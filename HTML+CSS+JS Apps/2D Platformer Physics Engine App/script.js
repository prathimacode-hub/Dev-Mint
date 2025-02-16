
        class Player {
            constructor(x, y) {
                this.reset(x, y);
            }

            reset(x, y) {
                this.x = x;
                this.y = y;
                this.width = 30;
                this.height = 30;
                this.velocityX = 0;
                this.velocityY = 0;
                this.speed = 5;
                this.jumpForce = 12;
                this.gravity = 0.5;
                this.onGround = false;
                this.dashCooldown = 0;
                this.dashSpeed = 15;
            }

            update() {
                this.velocityY += this.gravity;
                this.x += this.velocityX;
                this.y += this.velocityY;

                if (this.y + this.height > canvas.height) {
                    this.y = canvas.height - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                    loseLife();
                }

                if (this.x < 0) this.x = 0;
                if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;

                if (this.dashCooldown > 0) this.dashCooldown--;
            }

            draw(ctx) {
                ctx.fillStyle = '#4CAF50';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

            jump() {
                if (this.onGround) {
                    this.velocityY = -this.jumpForce;
                    this.onGround = false;
                    createParticles(this.x + this.width/2, this.y + this.height);
                }
            }

            dash(direction) {
                if (this.dashCooldown === 0) {
                    this.velocityX = this.dashSpeed * direction;
                    this.dashCooldown = 30;
                    createParticles(this.x + this.width/2, this.y + this.height/2);
                }
            }
        }

        class Platform {
            constructor(x, y, width, height, type = 'normal') {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.type = type;
                this.velocityX = type === 'moving' ? 2 : 0;
                this.originalX = x;
            }

            update() {
                if (this.type === 'moving') {
                    this.x += this.velocityX;
                    if (Math.abs(this.x - this.originalX) > 100) {
                        this.velocityX *= -1;
                    }
                }
            }

            draw(ctx) {
                ctx.fillStyle = this.getColor();
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

            getColor() {
                switch(this.type) {
                    case 'moving': return '#e74c3c';
                    case 'goal': return '#f1c40f';
                    case 'hazard': return '#8e44ad';
                    default: return '#3498db';
                }
            }
        }

        // Game setup
        const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;

        let player = new Player(100, 300);
        let platforms = [];
        let score = 0;
        let currentLevel = 1;
        let lives = 3;
        let particles = [];
        let gameRunning = false;

        const levels = {
            1: [
                new Platform(100, 400, 200, 20),
                new Platform(400, 300, 200, 20, 'moving'),
                new Platform(600, 200, 150, 20),
                new Platform(700, 150, 50, 20, 'goal')
            ],
            2: [
                new Platform(100, 500, 100, 20),
                new Platform(300, 400, 100, 20, 'moving'),
                new Platform(500, 300, 100, 20),
                new Platform(300, 200, 100, 20, 'hazard'),
                new Platform(700, 150, 50, 20, 'goal')
            ],
            3: [
                new Platform(100, 500, 80, 20),
                new Platform(300, 450, 80, 20, 'moving'),
                new Platform(500, 400, 80, 20, 'hazard'),
                new Platform(300, 300, 80, 20, 'moving'),
                new Platform(500, 200, 80, 20, 'hazard'),
                new Platform(700, 100, 50, 20, 'goal')
            ]
        };

        function loadLevel(level) {
            platforms = [...levels[level]];
            player.reset(100, 300);
            document.getElementById('level').textContent = level;
        }

        function updateLives() {
            document.getElementById('lives').textContent = '❤️'.repeat(lives);
        }

        function loseLife() {
            lives--;
            updateLives();
            player.reset(100, 300);
            
            if (lives <= 0) {
                showGameOver();
            }
        }

        function showGameOver() {
            gameRunning = false;
            document.getElementById('final-score').textContent = score;
            document.getElementById('game-over').classList.add('active');
        }

        function showLevelComplete() {
            document.getElementById('level-score').textContent = score;
            document.getElementById('level-complete').classList.add('active');
            gameRunning = false;
        }

        function showGameComplete() {
            document.getElementById('total-score').textContent = score;
            document.getElementById('game-complete').classList.add('active');
            gameRunning = false;
        }

        // Input handling
        const keys = {};
        document.addEventListener('keydown', e => keys[e.key] = true);
        document.addEventListener('keyup', e => keys[e.key] = false);

        // Tab handling
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const screenId = `${tab.dataset.tab}-screen`;
                document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
                document.getElementById(screenId).classList.add('active');
            });
        });

        function hideScreen(screenId) {
            document.getElementById(screenId).classList.remove('active');
            document.querySelector('[data-tab="game"]').click();
        }

        // Particle system
        function createParticles(x, y) {
            if (!document.getElementById('particles-toggle').checked) return;
            
            for (let i = 0; i < 10; i++) {
                particles.push({
                    x,
                    y,
                    velocityX: (Math.random() - 0.5) * 5,
                    velocityY: (Math.random() - 0.5) * 5,
                    life: 30
                });
            }
        }

        function updateParticles() {
            particles.forEach((p, index) => {
                p.x += p.velocityX;
                p.y += p.velocityY;
                p.life--;
                if (p.life <= 0) particles.splice(index, 1);
            });
        }

        function drawParticles() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Game loop
        function gameLoop() {
            if (!gameRunning) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (keys['ArrowLeft']) {
                player.velocityX = -player.speed;
                if (keys['Shift']) player.dash(-1);
            } else if (keys['ArrowRight']) {
                player.velocityX = player.speed;
                if (keys['Shift']) player.dash(1);
            } else {
                player.velocityX *= 0.8;
            }
            if (keys[' ']) player.jump();

            player.update();
            platforms.forEach(platform => {
                platform.update();
                
                // Platform collision
                if (player.x < platform.x + platform.width &&
                    player.x + player.width > platform.x &&
                    player.y + player.height > platform.y &&
                    player.y < platform.y + platform.height) {
                    
                    if (platform.type === 'hazard') {
                        loseLife();
                        return;
                    }

                    if (platform.type === 'goal') {
                        if (currentLevel === 3) {
                            showGameComplete();
                        } else {
                            showLevelComplete();
                        }
                        return;
                    }
                    
                    if (player.velocityY > 0 && player.y + player.height - player.velocityY <= platform.y) {
                        player.y = platform.y - player.height;
                        player.velocityY = 0;
                        player.onGround = true;
                        score++;
                        document.getElementById('score').textContent = score;
                    }
                }
            });

            updateParticles();
            platforms.forEach(platform => platform.draw(ctx));
            player.draw(ctx);
            drawParticles();

            requestAnimationFrame(gameLoop);
        }

        // Event Listeners for buttons
        document.getElementById('start-btn').addEventListener('click', () => {
            document.getElementById('start-screen').classList.remove('active');
            loadLevel(1);
            gameRunning = true;
            score = 0;
            lives = 3;
            updateLives();
            document.getElementById('score').textContent = score;
            gameLoop();
        });

        document.getElementById('next-level-btn').addEventListener('click', () => {
            document.getElementById('level-complete').classList.remove('active');
            currentLevel++;
            loadLevel(currentLevel);
            gameRunning = true;
            gameLoop();
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            document.getElementById('game-over').classList.remove('active');
            loadLevel(currentLevel);
            lives = 3;
            updateLives();
            score = 0;
            document.getElementById('score').textContent = score;
            gameRunning = true;
            gameLoop();
        });

        document.getElementById('quit-btn').addEventListener('click', () => {
            document.getElementById('game-over').classList.remove('active');
            document.getElementById('start-screen').classList.add('active');
            currentLevel = 1;
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            document.getElementById('game-complete').classList.remove('active');
            document.getElementById('start-screen').classList.add('active');
            currentLevel = 1;
        });

    