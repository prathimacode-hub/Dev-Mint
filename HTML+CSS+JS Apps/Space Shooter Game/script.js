
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        const healthElement = document.getElementById('health');
        const gameOverScreen = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');

        // Set canvas size
        canvas.width = 800;
        canvas.height = 600;

        // Game state
        let gameState = {
            score: 0,
            health: 100,
            isGameOver: false,
            isPaused: false,
            level: 1,
            powerups: [],
            particles: []
        };

        // Player properties
        const player = {
            x: canvas.width / 2,
            y: canvas.height - 50,
            width: 50,
            height: 50,
            speed: 5,
            bullets: [],
            powerupActive: false,
            powerupTimer: 0
        };

        // Enemy properties
        const enemies = [];
        const enemyTypes = [
            { color: '#ff0000', points: 10, health: 1, speed: 2 },
            { color: '#ff6600', points: 20, health: 2, speed: 3 },
            { color: '#ff3300', points: 30, health: 3, speed: 4 }
        ];

        // Controls
        const keys = {
            left: false,
            right: false,
            space: false
        };

        // Event listeners
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        function handleKeyDown(e) {
            if (e.key === 'ArrowLeft') keys.left = true;
            if (e.key === 'ArrowRight') keys.right = true;
            if (e.key === ' ') keys.space = true;
            if (e.key === 'p') togglePause();
        }

        function handleKeyUp(e) {
            if (e.key === 'ArrowLeft') keys.left = false;
            if (e.key === 'ArrowRight') keys.right = false;
            if (e.key === ' ') keys.space = false;
        }

        function togglePause() {
            gameState.isPaused = !gameState.isPaused;
        }

        // Game loop
        function gameLoop() {
            if (!gameState.isGameOver && !gameState.isPaused) {
                update();
                draw();
                spawnEnemies();
                spawnPowerups();
                updateParticles();
            }
            requestAnimationFrame(gameLoop);
        }

        // Update game state
        function update() {
            // Update player position
            if (keys.left && player.x > 0) player.x -= player.speed;
            if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;

            // Shoot bullets
            if (keys.space) {
                if (player.bullets.length < 5) {
                    createBullet();
                }
            }

            // Update bullets
            player.bullets.forEach((bullet, index) => {
                bullet.y -= bullet.speed;
                if (bullet.y < 0) {
                    player.bullets.splice(index, 1);
                }
            });

            // Update enemies
            enemies.forEach((enemy, enemyIndex) => {
                enemy.y += enemy.speed;

                // Check collision with player
                if (checkCollision(enemy, player)) {
                    gameState.health -= 10;
                    createParticles(enemy.x, enemy.y, enemy.color);
                    enemies.splice(enemyIndex, 1);
                    updateHealth();
                }

                // Check collision with bullets
                player.bullets.forEach((bullet, bulletIndex) => {
                    if (checkCollision(bullet, enemy)) {
                        enemy.health--;
                        if (enemy.health <= 0) {
                            gameState.score += enemy.points;
                            createParticles(enemy.x, enemy.y, enemy.color);
                            enemies.splice(enemyIndex, 1);
                            updateScore();
                        }
                        player.bullets.splice(bulletIndex, 1);
                    }
                });

                // Remove enemies that pass the bottom
                if (enemy.y > canvas.height) {
                    enemies.splice(enemyIndex, 1);
                    gameState.health -= 5;
                    updateHealth();
                }
            });

            // Update powerups
            gameState.powerups.forEach((powerup, index) => {
                powerup.y += 2;
                if (checkCollision(powerup, player)) {
                    activatePowerup();
                    gameState.powerups.splice(index, 1);
                }
                if (powerup.y > canvas.height) {
                    gameState.powerups.splice(index, 1);
                }
            });

            // Check game over
            if (gameState.health <= 0) {
                gameOver();
            }

            // Update powerup timer
            if (player.powerupActive) {
                player.powerupTimer--;
                if (player.powerupTimer <= 0) {
                    player.powerupActive = false;
                    player.speed = 5;
                }
            }
        }

        // Draw game elements
        function draw() {
            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 51, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw player
            ctx.fillStyle = player.powerupActive ? '#ffcc00' : '#33ccff';
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // Draw bullets
            ctx.fillStyle = '#ffffff';
            player.bullets.forEach(bullet => {
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            });

            // Draw enemies
            enemies.forEach(enemy => {
                ctx.fillStyle = enemy.color;
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            });

            // Draw powerups
            ctx.fillStyle = '#ffcc00';
            gameState.powerups.forEach(powerup => {
                ctx.beginPath();
                ctx.arc(powerup.x + 15, powerup.y + 15, 15, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw particles
            gameState.particles.forEach(particle => {
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.life / 100;
                ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
            });
            ctx.globalAlpha = 1;
        }

        // Create bullet
        function createBullet() {
            const bullet = {
                x: player.x + player.width / 2 - 2.5,
                y: player.y,
                width: 5,
                height: 15,
                speed: 7
            };
            player.bullets.push(bullet);
        }

        // Spawn enemies
        function spawnEnemies() {
            if (Math.random() < 0.02) {
                const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
                const enemy = {
                    x: Math.random() * (canvas.width - 30),
                    y: -30,
                    width: 30,
                    height: 30,
                    speed: enemyType.speed,
                    color: enemyType.color,
                    points: enemyType.points,
                    health: enemyType.health
                };
                enemies.push(enemy);
            }
        }

        // Spawn powerups
        function spawnPowerups() {
            if (Math.random() < 0.001) {
                const powerup = {
                    x: Math.random() * (canvas.width - 30),
                    y: -30,
                    width: 30,
                    height: 30
                };
                gameState.powerups.push(powerup);
            }
        }

        // Collision detection
        function checkCollision(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        }

        // Create particles
        function createParticles(x, y, color) {
            for (let i = 0; i < 10; i++) {
                const particle = {
                    x: x + Math.random() * 30,
                    y: y + Math.random() * 30,
                    size: Math.random() * 5 + 2,
                    speedX: (Math.random() - 0.5) * 4,
                    speedY: (Math.random() - 0.5) * 4,
                    color: color,
                    life: 100
                };
                gameState.particles.push(particle);
            }
        }

        // Update particles
        function updateParticles() {
            gameState.particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= 2;
                if (particle.life <= 0) {
                    gameState.particles.splice(index, 1);
                }
            });
        }

        // Activate powerup
        function activatePowerup() {
            player.powerupActive = true;
            player.powerupTimer = 300;
            player.speed = 8;
        }

        // Update score display
        function updateScore() {
            scoreElement.textContent = `Score: ${gameState.score}`;
        }

        // Update health display
        function updateHealth() {
            healthElement.textContent = `Health: ${gameState.health}%`;
        }

        // Game over
        function gameOver() {
            gameState.isGameOver = true;
            finalScoreElement.textContent = gameState.score;
            gameOverScreen.style.display = 'block';
        }

        // Restart game
        function restartGame() {
            gameState = {
                score: 0,
                health: 100,
                isGameOver: false,
                isPaused: false,
                level: 1,
                powerups: [],
                particles: []
            };
            player.x = canvas.width / 2;
            player.bullets = [];
            player.powerupActive = false;
            player.powerupTimer = 0;
            enemies.length = 0;
            updateScore();
            updateHealth();
            gameOverScreen.style.display = 'none';
        }

        // Start game
        gameLoop();
    