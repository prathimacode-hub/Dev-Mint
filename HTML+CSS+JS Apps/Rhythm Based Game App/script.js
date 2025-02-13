
        const gameState = {
            score: 0,
            combo: 0,
            highestCombo: 0,
            isPlaying: false,
            notes: [],
            hitWindows: {
                perfect: 50,
                good: 100
            },
            settings: {
                musicVolume: 80,
                sfxVolume: 100,
                scrollSpeed: 5,
                noteSize: 100
            },
            stats: {
                totalScore: 0,
                gamesPlayed: 0,
                perfectHits: 0,
                goodHits: 0,
                missedHits: 0,
                totalHits: 0
            }
        };

        // DOM Elements
        const noteHighway = document.querySelector('.note-highway');
        const scoreDisplay = document.querySelector('.score-display');
        const comboDisplay = document.querySelector('.combo-display');
        const hitFeedback = document.querySelector('.hit-feedback');
        const startBtn = document.querySelector('.start-btn');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetId) {
                        section.classList.add('active');
                    }
                });

                if (targetId !== 'game' && gameState.isPlaying) {
                    stopGame();
                    startBtn.textContent = 'Start Game';
                }
            });
        });

        // Settings Handlers
        document.getElementById('musicVolume').addEventListener('input', (e) => {
            gameState.settings.musicVolume = parseInt(e.target.value);
            document.getElementById('musicVolumeValue').textContent = `${e.target.value}%`;
        });

        document.getElementById('sfxVolume').addEventListener('input', (e) => {
            gameState.settings.sfxVolume = parseInt(e.target.value);
            document.getElementById('sfxVolumeValue').textContent = `${e.target.value}%`;
        });

        document.getElementById('scrollSpeed').addEventListener('input', (e) => {
            gameState.settings.scrollSpeed = parseInt(e.target.value);
            document.getElementById('scrollSpeedValue').textContent = e.target.value;
            updateNoteSpeed();
        });

        document.getElementById('noteSize').addEventListener('input', (e) => {
            gameState.settings.noteSize = parseInt(e.target.value);
            document.getElementById('noteSizeValue').textContent = `${e.target.value}%`;
            updateNoteSize();
        });

        function updateNoteSpeed() {
            const notes = document.querySelectorAll('.note');
            notes.forEach(note => {
                note.style.animationDuration = `${2 / (gameState.settings.scrollSpeed / 5)}s`;
            });
        }

        function updateNoteSize() {
            const notes = document.querySelectorAll('.note');
            notes.forEach(note => {
                note.style.width = `${60 * gameState.settings.noteSize / 100}px`;
            });
        }

        function toggleGame() {
            if (gameState.isPlaying) {
                stopGame();
                startBtn.textContent = 'Start Game';
            } else {
                startGame();
                startBtn.textContent = 'Stop Game';
            }
        }

        function startGame() {
            gameState.isPlaying = true;
            gameState.score = 0;
            gameState.combo = 0;
            gameState.notes = [];
            gameState.stats.gamesPlayed++;
            updateDisplay();
            spawnNotes();
            updateProfile();
        }

        function stopGame() {
            gameState.isPlaying = false;
            noteHighway.innerHTML = '';
            updateLeaderboard();
        }

        function spawnNotes() {
            if (!gameState.isPlaying) return;

            const lanes = [0, 1, 2, 3];
            const lane = lanes[Math.floor(Math.random() * lanes.length)];
            const note = document.createElement('div');
            note.className = 'note';
            note.style.left = `${(lane * 25) + 12.5}%`;
            note.style.width = `${60 * gameState.settings.noteSize / 100}px`;
            note.style.animationDuration = `${2 / (gameState.settings.scrollSpeed / 5)}s`;
            
            const timestamp = Date.now();
            gameState.notes.push({ element: note, timestamp, lane });
            noteHighway.appendChild(note);

            setTimeout(spawnNotes, 1000);

            note.addEventListener('animationend', () => {
                if (note.parentNode) {
                    note.remove();
                    handleMiss();
                }
            });
        }

        const keyMap = {
            'd': 0,
            'f': 1,
            'j': 2,
            'k': 3
        };

        document.addEventListener('keydown', (e) => {
            if (!gameState.isPlaying) return;
            
            const lane = keyMap[e.key.toLowerCase()];
            if (lane !== undefined) {
                handleInput(lane);
            }
        });

        function handleInput(lane) {
            const now = Date.now();
            const activeNotes = gameState.notes.filter(note => 
                note.element.parentNode && note.lane === lane
            );

            if (activeNotes.length === 0) return;

            const closestNote = activeNotes.reduce((prev, curr) => {
                const prevDiff = Math.abs(now - (prev.timestamp + 2000));
                const currDiff = Math.abs(now - (curr.timestamp + 2000));
                return prevDiff < currDiff ? prev : curr;
            });

            const timeDiff = Math.abs(now - (closestNote.timestamp + 2000));

            if (timeDiff < gameState.hitWindows.perfect) {
                handleHit('perfect', closestNote);
            } else if (timeDiff < gameState.hitWindows.good) {
                handleHit('good', closestNote);
            }
        }

        function handleHit(quality, note) {
            note.element.remove();
            gameState.notes = gameState.notes.filter(n => n !== note);
            gameState.combo++;
            gameState.highestCombo = Math.max(gameState.highestCombo, gameState.combo);

            if (quality === 'perfect') {
                const points = 1000 + (gameState.combo * 100);
                gameState.score += points;
                gameState.stats.perfectHits++;
                showFeedback('PERFECT!', 'perfect');
            } else {
                const points = 500 + (gameState.combo * 50);
                gameState.score += points;
                gameState.stats.goodHits++;
                showFeedback('GOOD!', 'good');
            }

            gameState.stats.totalHits++;
            gameState.stats.totalScore += gameState.score;
            updateDisplay();
        }

        function handleMiss() {
            gameState.combo = 0;
            gameState.stats.missedHits++;
            showFeedback('MISS', 'miss');
            updateDisplay();
        }

        function showFeedback(text, className) {
            hitFeedback.textContent = text;
            hitFeedback.className = `hit-feedback ${className} show`;
            setTimeout(() => {
                hitFeedback.classList.remove('show');
            }, 500);
        }

        function updateDisplay() {
            scoreDisplay.textContent = `Score: ${gameState.score}`;
            comboDisplay.textContent = `Combo: ${gameState.combo}`;
        }

        // Leaderboard Management
        let leaderboardData = [];

        function updateLeaderboard() {
            if (gameState.score > 0) {
                const accuracy = calculateAccuracy();
                leaderboardData.push({
                    player: 'Player',
                    score: gameState.score,
                    maxCombo: gameState.highestCombo,
                    accuracy: accuracy
                });

                leaderboardData.sort((a, b) => b.score - a.score);
                leaderboardData = leaderboardData.slice(0, 10);

                const leaderboardBody = document.getElementById('leaderboardBody');
                leaderboardBody.innerHTML = '';
                
                leaderboardData.forEach((entry, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${entry.player}</td>
                        <td>${entry.score}</td>
                        <td>${entry.maxCombo}</td>
                        <td>${entry.accuracy}%</td>
                    `;
                    leaderboardBody.appendChild(row);
                });
            }
        }

        function calculateAccuracy() {
            const totalNotes = gameState.stats.perfectHits + gameState.stats.goodHits + gameState.stats.missedHits;
            if (totalNotes === 0) return 0;
            
            const weightedSum = (gameState.stats.perfectHits * 100) + (gameState.stats.goodHits * 50);
            return Math.round((weightedSum / (totalNotes * 100)) * 100);
        }

        function updateProfile() {
            document.getElementById('totalScore').textContent = gameState.stats.totalScore;
            document.getElementById('gamesPlayed').textContent = gameState.stats.gamesPlayed;
            document.getElementById('avgAccuracy').textContent = calculateAccuracy() + '%';
            document.getElementById('highestCombo').textContent = gameState.highestCombo;
        }

        // Initialize
        window.addEventListener('load', () => {
            updateDisplay();
            updateLeaderboard();
            updateProfile();
        });
   