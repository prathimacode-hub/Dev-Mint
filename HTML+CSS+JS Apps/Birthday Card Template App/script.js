
        // Tab functionality
        function openTab(tabName) {
            const tabs = document.getElementsByClassName('tab-btn');
            for(let tab of tabs) {
                tab.classList.remove('active');
            }
            event.currentTarget.classList.add('active');
        }

        // Image upload handling
        function handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addToCard(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        }

        // Filter application
        function applyFilter(filter) {
            const images = document.querySelectorAll('#frontCover img');
            images.forEach(img => {
                switch(filter) {
                    case 'none':
                        img.style.filter = 'none';
                        break;
                    case 'sepia':
                        img.style.filter = 'sepia(100%)';
                        break;
                    case 'grayscale':
                        img.style.filter = 'grayscale(100%)';
                        break;
                    case 'blur':
                        img.style.filter = 'blur(3px)';
                        break;
                }
            });
        }

        // Add sticker to card
        function addSticker(emoji) {
            const sticker = document.createElement('div');
            sticker.className = 'draggable-element';
            sticker.innerHTML = emoji;
            sticker.style.fontSize = '2em';
            sticker.style.position = 'absolute';
            sticker.style.left = '50%';
            sticker.style.top = '50%';
            sticker.style.transform = 'translate(-50%, -50%)';
            makeDraggable(sticker);
            document.getElementById('frontCover').appendChild(sticker);
        }
        // Make elements draggable
        function makeDraggable(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            element.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        // Add image to card
        function addToCard(imageUrl) {
            const cardImage = document.createElement('img');
            cardImage.src = imageUrl;
            cardImage.style.maxWidth = '100%';
            cardImage.style.borderRadius = '10px';
            cardImage.className = 'draggable-element';
            cardImage.style.position = 'absolute';
            cardImage.style.left = '50%';
            cardImage.style.top = '50%';
            cardImage.style.transform = 'translate(-50%, -50%)';
            cardImage.style.maxHeight = '200px';
            makeDraggable(cardImage);
            document.getElementById('frontCover').appendChild(cardImage);
        }

        // Background music functionality
        function changeBgMusic() {
            const select = document.getElementById('musicSelect');
            const visualizer = document.querySelector('.audio-visualizer');
            visualizer.innerHTML = '';
            
            if (select.value) {
                // Create visualizer bars
                for(let i = 0; i < 20; i++) {
                    const bar = document.createElement('div');
                    bar.className = 'visualizer-bar';
                    bar.style.left = (i * 5) + '%';
                    bar.style.animationDelay = (i * 0.1) + 's';
                    visualizer.appendChild(bar);
                }
            }
        }

        // Add sparkle effects
        function addSparkles() {
            for(let i = 0; i < 20; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 2 + 's';
                document.querySelector('.header').appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1500);
            }
        }

        // Add confetti effects
        function addConfetti() {
            for(let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.animationDelay = Math.random() * 3 + 's';
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }
        }

        // Toggle advanced animations
        function toggleAdvancedAnimation() {
            const elements = document.getElementsByClassName('draggable-element');
            for(let element of elements) {
                element.classList.toggle('advanced-animation');
            }
        }

        // Filter buttons functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                applyFilter(this.textContent.toLowerCase());
            });
        });

        // Save card functionality
        // Replace the existing saveCard function with this new version
function saveCard() {
    const saveButton = event.currentTarget;
    saveButton.innerHTML = 'Saving...';
    saveButton.disabled = true;
    
    const cardPreview = document.getElementById('cardPreview');
    
    // Configure html2canvas
    html2canvas(cardPreview, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: 'white',
        scale: 2, // Higher quality
        logging: false,
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(function(blob) {
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.download = 'birthday-card.png';
            
            // Create URL for blob
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            
            // Trigger download
            downloadLink.click();
            
            // Clean up
            URL.revokeObjectURL(url);
            
            // Show success message and effects
            saveButton.innerHTML = 'Saved! 🎉';
            addConfetti();
            addSparkles();
            
            // Reset button after delay
            setTimeout(() => {
                saveButton.innerHTML = 'Save Card';
                saveButton.disabled = false;
            }, 2000);
        }, 'image/png', 1.0);
    }).catch(error => {
        console.error('Error saving card:', error);
        saveButton.innerHTML = 'Error saving! Try again';
        saveButton.disabled = false;
    });
}

// Add error handling for images
function addToCard(imageUrl) {
    const cardImage = document.createElement('img');
    cardImage.crossOrigin = "anonymous"; // Enable CORS for images
    cardImage.src = imageUrl;
    cardImage.style.maxWidth = '100%';
    cardImage.style.borderRadius = '10px';
    cardImage.className = 'draggable-element';
    cardImage.style.position = 'absolute';
    cardImage.style.left = '50%';
    cardImage.style.top = '50%';
    cardImage.style.transform = 'translate(-50%, -50%)';
    cardImage.style.maxHeight = '200px';
    
    // Add error handling for images
    cardImage.onerror = function() {
        alert('Error loading image. Please try another image.');
    };
    
    makeDraggable(cardImage);
    document.getElementById('frontCover').appendChild(cardImage);
}
        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Create initial sparkles
            addSparkles();
            
            // Setup audio visualizer
            changeBgMusic();
            
            // Setup drag-and-drop zones
            const cardPreview = document.getElementById('cardPreview');
            
            cardPreview.addEventListener('dragover', (e) => {
                e.preventDefault();
                cardPreview.style.background = '#f0f0f0';
            });
            
            cardPreview.addEventListener('dragleave', () => {
                cardPreview.style.background = 'white';
            });
            
            cardPreview.addEventListener('drop', (e) => {
                e.preventDefault();
                cardPreview.style.background = 'white';
                if(e.dataTransfer.files.length) {
                    handleImageUpload({ target: { files: [e.dataTransfer.files[0]] } });
                }
            });
        });
    