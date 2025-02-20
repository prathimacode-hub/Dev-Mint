
// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('tab-active'));
    document.getElementById(tabId).classList.remove('hidden');
    event.target.classList.add('tab-active');
}

// Anagram Calculator Functions
function cleanString(str, settings = getSettings()) {
    let cleaned = str;
    if (!settings.caseSensitive) cleaned = cleaned.toLowerCase();
    if (!settings.includeSpaces) cleaned = cleaned.replace(/\s/g, '');
    if (!settings.includePunctuation) cleaned = cleaned.replace(/[^\w\s]/g, '');
    return cleaned.split('').sort().join('');
}

function getSettings() {
    return {
        caseSensitive: document.getElementById('caseSensitive').checked,
        includeSpaces: document.getElementById('includeSpaces').checked,
        includePunctuation: document.getElementById('includePunctuation').checked
    };
}

function autoCheckAnagram() {
    if (document.getElementById('autoCheck').checked) {
        checkAnagram();
    }
}

function checkAnagram() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const settings = getSettings();

    if (!text1 || !text2) {
        showResult(false, 'Please enter both texts');
        return;
    }

    const cleaned1 = cleanString(text1, settings);
    const cleaned2 = cleanString(text2, settings);
    const isAnagram = cleaned1 === cleaned2;

    showResult(isAnagram, generateAnalysis(text1, text2));
    addToHistory(text1, text2, isAnagram);
}

function generateAnalysis(text1, text2) {
    const freq1 = getCharacterFrequency(text1);
    const freq2 = getCharacterFrequency(text2);
    
    return `
        <div class="grid grid-cols-2 gap-4">
            <div>
                <h4 class="font-bold mb-2">First Text Analysis:</h4>
                <p>Length: ${text1.length} characters</p>
                <p>Unique characters: ${Object.keys(freq1).length}</p>
            </div>
            <div>
                <h4 class="font-bold mb-2">Second Text Analysis:</h4>
                <p>Length: ${text2.length} characters</p>
                <p>Unique characters: ${Object.keys(freq2).length}</p>
            </div>
        </div>
    `;
}

function getCharacterFrequency(str) {
    return str.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
}

function showResult(isAnagram, details) {
    const result = document.getElementById('result');
    result.classList.remove('hidden');
    result.innerHTML = `
        <div class="p-6 rounded-lg ${isAnagram ? 'bg-green-500' : 'bg-red-500'} bg-opacity-20">
            <h3 class="text-2xl font-bold mb-4">${isAnagram ? '✨ These are Anagrams! ✨' : '❌ Not Anagrams'}</h3>
            ${details}
        </div>
    `;
}

function addToHistory(text1, text2, isAnagram) {
    const history = document.getElementById('history');
    const historyItem = document.createElement('div');
    historyItem.className = 'glass-effect p-4 rounded-lg flex justify-between items-center';
    historyItem.innerHTML = `
        <div class="flex-1">
            <p><span class="font-semibold">${text1}</span> ⟷ <span class="font-semibold">${text2}</span></p>
        </div>
        <span class="ml-4 ${isAnagram ? 'text-green-300' : 'text-red-300'}">${isAnagram ? '✓' : '✗'}</span>
    `;
    
    if (history.firstChild) {
        history.insertBefore(historyItem, history.firstChild);
    } else {
        history.appendChild(historyItem);
    }

    if (history.children.length > 5) {
        history.removeChild(history.lastChild);
    }
}

// Word Generator Functions
function generateAnagrams() {
    const word = document.getElementById('baseWord').value.toLowerCase();
    const lengthFilter = parseInt(document.getElementById('lengthFilter').value) || 0;
    const results = document.getElementById('generatedWords');
    results.innerHTML = '';

    if (!word) {
        results.innerHTML = '<p class="text-red-400">Please enter a word</p>';
        return;
    }

    const anagrams = new Set();
    generatePermutations(word.split(''), 0, word.length - 1, anagrams);

    const filteredAnagrams = Array.from(anagrams)
        .filter(word => word.length >= lengthFilter)
        .sort((a, b) => b.length - a.length);

    filteredAnagrams.forEach(anagram => {
        const div = document.createElement('div');
        div.className = 'glass-effect p-3 rounded-lg text-center';
        div.textContent = anagram;
        results.appendChild(div);
    });
}

function generatePermutations(chars, start, end, anagrams) {
    if (start === end) {
        anagrams.add(chars.join(''));
    } else {
        for (let i = start; i <= end; i++) {
            [chars[start], chars[i]] = [chars[i], chars[start]]; // Swap
            generatePermutations(chars, start + 1, end, anagrams);
            [chars[start], chars[i]] = [chars[i], chars[start]]; // Restore
        }
    }
}

// Text Analyzer Functions
function analyzeText() {
    const text = document.getElementById('analyzeText').value;
    const results = document.getElementById('analysisResult');
    results.innerHTML = '';

    if (!text) {
        results.innerHTML = '<p class="text-red-400">Please enter text to analyze</p>';
        return;
    }

    const analysis = {
        characters: text.length,
        words: text.trim().split(/\s+/).length,
        sentences: text.split(/[.!?]+/).filter(Boolean).length,
        uppercase: text.match(/[A-Z]/g)?.length || 0,
        lowercase: text.match(/[a-z]/g)?.length || 0,
        numbers: text.match(/\d/g)?.length || 0,
        spaces: text.match(/\s/g)?.length || 0,
        punctuation: text.match(/[^\w\s]/g)?.length || 0,
        uniqueWords: new Set(text.toLowerCase().match(/\b\w+\b/g)).size
    };

    Object.entries(analysis).forEach(([key, value]) => {
        const div = document.createElement('div');
        div.className = 'glass-effect p-4 rounded-lg';
        div.innerHTML = `
            <h4 class="font-bold mb-2">${key.charAt(0).toUpperCase() + key.slice(1)}</h4>
            <p class="text-2xl">${value}</p>
        `;
        results.appendChild(div);
    });

    // Add word frequency analysis
    const wordFreq = getWordFrequency(text);
    const wordFreqDiv = document.createElement('div');
    wordFreqDiv.className = 'glass-effect p-4 rounded-lg col-span-full';
    wordFreqDiv.innerHTML = `
        <h4 class="font-bold mb-2">Most Common Words</h4>
        <div class="grid grid-cols-2 gap-2">
            ${Object.entries(wordFreq)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 6)
                .map(([word, count]) => `<div>${word}: ${count}</div>`)
                .join('')}
        </div>
    `;
    results.appendChild(wordFreqDiv);
}

function getWordFrequency(text) {
    return text.toLowerCase()
        .match(/\b\w+\b/g)
        .reduce((acc, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {});
}

// Dictionary Functions
const commonWords = [
    "listen", "silent", "enlist",
    "heart", "earth", "hater",
    "night", "thing", "tight",
    "spare", "spear", "pears",
    "stop", "post", "spot",
    "wolf", "flow", "fowl"
];

function searchDictionary() {
    const searchTerm = document.getElementById('dictionarySearch').value.toLowerCase();
    const results = document.getElementById('dictionaryResults');
    results.innerHTML = '';

    if (!searchTerm) {
        results.innerHTML = '<p class="text-red-400">Please enter a search term</p>';
        return;
    }

    const matchingWords = commonWords.filter(word => {
        const searchClean = cleanString(searchTerm);
        const wordClean = cleanString(word);
        return searchClean === wordClean || word.includes(searchTerm);
    });

    if (matchingWords.length === 0) {
        results.innerHTML = '<p class="text-yellow-400">No matches found</p>';
        return;
    }

    matchingWords.forEach(word => {
        const div = document.createElement('div');
        div.className = 'glass-effect p-4 rounded-lg flex justify-between items-center';
        div.innerHTML = `
            <span class="text-lg">${word}</span>
            <button onclick="addToCalculator('${word}')" 
                    class="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-sm">
                Use
            </button>
        `;
        results.appendChild(div);
    });
}

function addToCalculator(word) {
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');

    if (!text1.value) {
        text1.value = word;
    } else if (!text2.value) {
        text2.value = word;
    }

    switchTab('calculator');
    if (document.getElementById('autoCheck').checked) {
        checkAnagram();
    }
}

// Settings Functions
function applyDarkMode() {
    const isDark = document.getElementById('darkMode').checked;
    document.body.style.background = isDark 
        ? 'linear-gradient(135deg, #1a1c2c 0%, #4a1942 100%)'
        : 'linear-gradient(135deg, #c7d2fe 0%, #e0e7ff 100%)';
    document.body.style.color = isDark ? 'white' : 'black';
}

// Event Listeners
document.getElementById('darkMode').addEventListener('change', applyDarkMode);

// Initialize settings
document.getElementById('autoCheck').checked = true;
document.getElementById('caseSensitive').checked = false;
document.getElementById('includeSpaces').checked = false;
document.getElementById('includePunctuation').checked = false;
document.getElementById('darkMode').checked = true;
applyDarkMode();
