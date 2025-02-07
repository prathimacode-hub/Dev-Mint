
        const wordInput = document.getElementById('wordInput');
        const resultContainer = document.getElementById('resultContainer');
        const wordDisplay = document.getElementById('wordDisplay');
        const phoneticText = document.getElementById('phoneticText');
        const originText = document.getElementById('originText');
        const meaningsContainer = document.getElementById('meanings');
        const speakBtn = document.getElementById('speakBtn');
        const audioBtn = document.getElementById('audioBtn');

        let currentAudioUrl = null;

        async function searchWord() {
            const word = wordInput.value.trim().toLowerCase();
            if (!word) return;

            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                const data = await response.json();
                const wordData = data[0];

                // Clear previous results
                meaningsContainer.innerHTML = '';
                
                // Word display
                wordDisplay.textContent = wordData.word;

                // Phonetic
                phoneticText.textContent = wordData.phonetic || 'No phonetic information';

                // Origin
                originText.textContent = wordData.origin || 'No origin information';

                // Meanings
                wordData.meanings.forEach(meaning => {
                    const meaningDiv = document.createElement('div');
                    meaningDiv.classList.add('mb-3', 'p-2', 'bg-white', 'rounded');
                    
                    const definitions = meaning.definitions.map(def => `
                        <div class="mb-2">
                            <p class="font-semibold">${meaning.partOfSpeech}</p>
                            <p>${def.definition}</p>
                            ${def.example ? `<p class="italic text-gray-600">Example: ${def.example}</p>` : ''}
                        </div>
                    `).join('');

                    meaningDiv.innerHTML = definitions;
                    meaningsContainer.appendChild(meaningDiv);
                });

                // Audio URL
                const audioPhonetic = wordData.phonetics.find(p => p.audio);
                currentAudioUrl = audioPhonetic ? 
                    (audioPhonetic.audio.startsWith('//') ? 'https:' + audioPhonetic.audio : audioPhonetic.audio) 
                    : null;

                // Toggle audio button
                audioBtn.style.display = currentAudioUrl ? 'inline-block' : 'none';

                resultContainer.classList.remove('hidden');
            } catch (error) {
                alert('Word not found or API error.');
                resultContainer.classList.add('hidden');
                console.error(error);
            }
        }

        // Speak functionality
        speakBtn.addEventListener('click', () => {
            const word = wordInput.value.trim();
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(word);
                utterance.lang = 'en-US';
                window.speechSynthesis.speak(utterance);
            } else {
                alert('Speech synthesis not supported');
            }
        });

        // Audio pronunciation
        audioBtn.addEventListener('click', () => {
            if (currentAudioUrl) {
                const audio = new Audio(currentAudioUrl);
                audio.play();
            }
        });

        // Enter key support
        wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchWord();
        });
    