
// Tab Switching Logic
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// AQI Calculation Logic
document.getElementById('aqi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loading = document.getElementById('loading-indicator');
    const results = document.getElementById('results');
    
    loading.style.display = 'block';
    results.style.display = 'none';

    // Simulate API call
    setTimeout(() => {
        const pm25 = parseFloat(document.getElementById('pm25').value);
        const pm10 = parseFloat(document.getElementById('pm10').value);
        const co = parseFloat(document.getElementById('co').value);
        const no2 = parseFloat(document.getElementById('no2').value);
        const so2 = parseFloat(document.getElementById('so2').value);
        const o3 = parseFloat(document.getElementById('o3').value);

        // Calculate AQI (simplified version)
        const aqi = calculateAQI(pm25, pm10, co, no2, so2, o3);
        
        // Update results
        const aqiDisplay = document.getElementById('aqi-value');
        const healthImplications = document.getElementById('health-implications');
        
        aqiDisplay.textContent = `AQI: ${aqi}`;
        aqiDisplay.style.backgroundColor = getAQIColor(aqi);
        aqiDisplay.style.color = aqi > 150 ? 'white' : 'black';
        
        healthImplications.innerHTML = getHealthImplications(aqi);

        loading.style.display = 'none';
        results.style.display = 'block';
    }, 1000);
});

// AQI Calculation Functions
function calculateAQI(pm25, pm10, co, no2, so2, o3) {
    // Simplified AQI calculation
    const pm25Index = calculatePM25Index(pm25);
    const pm10Index = calculatePM10Index(pm10);
    const coIndex = calculateCOIndex(co);
    const no2Index = calculateNO2Index(no2);
    const so2Index = calculateSO2Index(so2);
    const o3Index = calculateO3Index(o3);

    return Math.max(pm25Index, pm10Index, coIndex, no2Index, so2Index, o3Index);
}

function calculatePM25Index(pm25) {
    if (pm25 <= 12) return ((50 - 0) / (12 - 0)) * (pm25 - 0) + 0;
    if (pm25 <= 35.4) return ((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51;
    if (pm25 <= 55.4) return ((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101;
    if (pm25 <= 150.4) return ((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151;
    if (pm25 <= 250.4) return ((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201;
    return ((500 - 301) / (500.4 - 250.5)) * (pm25 - 250.5) + 301;
}

// Similar calculation functions for other pollutants
function calculatePM10Index(pm10) {
    if (pm10 <= 54) return ((50 - 0) / (54 - 0)) * (pm10 - 0) + 0;
    if (pm10 <= 154) return ((100 - 51) / (154 - 55)) * (pm10 - 55) + 51;
    if (pm10 <= 254) return ((150 - 101) / (254 - 155)) * (pm10 - 155) + 101;
    if (pm10 <= 354) return ((200 - 151) / (354 - 255)) * (pm10 - 255) + 151;
    if (pm10 <= 424) return ((300 - 201) / (424 - 355)) * (pm10 - 355) + 201;
    return ((500 - 301) / (604 - 425)) * (pm10 - 425) + 301;
}

function calculateCOIndex(co) {
    if (co <= 4.4) return ((50 - 0) / (4.4 - 0)) * (co - 0) + 0;
    if (co <= 9.4) return ((100 - 51) / (9.4 - 4.5)) * (co - 4.5) + 51;
    if (co <= 12.4) return ((150 - 101) / (12.4 - 9.5)) * (co - 9.5) + 101;
    if (co <= 15.4) return ((200 - 151) / (15.4 - 12.5)) * (co - 12.5) + 151;
    if (co <= 30.4) return ((300 - 201) / (30.4 - 15.5)) * (co - 15.5) + 201;
    return ((500 - 301) / (50.4 - 30.5)) * (co - 30.5) + 301;
}

function calculateNO2Index(no2) {
    if (no2 <= 53) return ((50 - 0) / (53 - 0)) * (no2 - 0) + 0;
    if (no2 <= 100) return ((100 - 51) / (100 - 54)) * (no2 - 54) + 51;
    if (no2 <= 360) return ((150 - 101) / (360 - 101)) * (no2 - 101) + 101;
    if (no2 <= 649) return ((200 - 151) / (649 - 361)) * (no2 - 361) + 151;
    if (no2 <= 1249) return ((300 - 201) / (1249 - 650)) * (no2 - 650) + 201;
    return ((500 - 301) / (2049 - 1250)) * (no2 - 1250) + 301;
}

function calculateSO2Index(so2) {
    if (so2 <= 35) return ((50 - 0) / (35 - 0)) * (so2 - 0) + 0;
    if (so2 <= 75) return ((100 - 51) / (75 - 36)) * (so2 - 36) + 51;
    if (so2 <= 185) return ((150 - 101) / (185 - 76)) * (so2 - 76) + 101;
    if (so2 <= 304) return ((200 - 151) / (304 - 186)) * (so2 - 186) + 151;
    if (so2 <= 604) return ((300 - 201) / (604 - 305)) * (so2 - 305) + 201;
    return ((500 - 301) / (1004 - 605)) * (so2 - 605) + 301;
}

function calculateO3Index(o3) {
    if (o3 <= 54) return ((50 - 0) / (54 - 0)) * (o3 - 0) + 0;
    if (o3 <= 124) return ((100 - 51) / (124 - 55)) * (o3 - 55) + 51;
    if (o3 <= 164) return ((150 - 101) / (164 - 125)) * (o3 - 125) + 101;
    if (o3 <= 204) return ((200 - 151) / (204 - 165)) * (o3 - 165) + 151;
    if (o3 <= 404) return ((300 - 201) / (404 - 205)) * (o3 - 205) + 201;
    return ((500 - 301) / (604 - 405)) * (o3 - 405) + 301;
}

function getAQIColor(aqi) {
    if (aqi <= 50) return '#00e400'; // Good
    if (aqi <= 100) return '#ffff00'; // Moderate
    if (aqi <= 150) return '#ff7e00'; // Unhealthy for Sensitive Groups
    if (aqi <= 200) return '#ff0000'; // Unhealthy
    if (aqi <= 300) return '#99004c'; // Very Unhealthy
    return '#7e0023'; // Hazardous
}

function getHealthImplications(aqi) {
    let category, implications, cautionaryStatement;

    if (aqi <= 50) {
        category = 'Good';
        implications = 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
        cautionaryStatement = 'None';
    } else if (aqi <= 100) {
        category = 'Moderate';
        implications = 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people.';
        cautionaryStatement = 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.';
    } else if (aqi <= 150) {
        category = 'Unhealthy for Sensitive Groups';
        implications = 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
        cautionaryStatement = 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.';
    } else if (aqi <= 200) {
        category = 'Unhealthy';
        implications = 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
        cautionaryStatement = 'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else should limit prolonged outdoor exertion.';
    } else if (aqi <= 300) {
        category = 'Very Unhealthy';
        implications = 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
        cautionaryStatement = 'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else should limit outdoor exertion.';
    } else {
        category = 'Hazardous';
        implications = 'Health alert: everyone may experience more serious health effects.';
        cautionaryStatement = 'Everyone should avoid all outdoor exertion.';
    }

    return `
        <div class="health-info">
            <h3>Category: ${category}</h3>
            <p><strong>Health Implications:</strong> ${implications}</p>
            <p><strong>Cautionary Statement:</strong> ${cautionaryStatement}</p>
        </div>
    `;
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
let isDarkMode = false;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#ecf0f1';
    document.body.style.color = isDarkMode ? '#ffffff' : '#2c3e50';
    
    // Update card backgrounds
    document.querySelectorAll('.setting-card, .results, .tab-container').forEach(card => {
        card.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#ffffff';
    });

    // Update icon
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Save History
function saveToHistory(aqiData) {
    let history = JSON.parse(localStorage.getItem('aqiHistory') || '[]');
    history.push({
        ...aqiData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('aqiHistory', JSON.stringify(history));
}

// Initialize Settings
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    const settings = JSON.parse(localStorage.getItem('aqiSettings') || '{}');
    
    if (settings.emailNotifications) {
        document.getElementById('email-notifications').checked = true;
    }
    if (settings.pushNotifications) {
        document.getElementById('push-notifications').checked = true;
    }
    if (settings.unitSystem) {
        document.getElementById('unit-system').value = settings.unitSystem;
    }

    // Add settings change listeners
    document.querySelectorAll('#settings input, #settings select').forEach(input => {
        input.addEventListener('change', () => {
            const newSettings = {
                emailNotifications: document.getElementById('email-notifications').checked,
                pushNotifications: document.getElementById('push-notifications').checked,
                unitSystem: document.getElementById('unit-system').value
            };
            localStorage.setItem('aqiSettings', JSON.stringify(newSettings));
        });
    });
});

// Map functionality
let map;
let markers = [];

function initMap() {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Load saved locations
    loadSavedLocations();
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);
            addMarker(latitude, longitude, 'Current Location');
            fetchAQIData(latitude, longitude);
        });
    }
}

function searchLocation() {
    const query = document.getElementById('location-search').value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                map.setView([lat, lon], 13);
                addMarker(lat, lon, query);
                fetchAQIData(lat, lon);
            }
        });
}

function addMarker(lat, lon, title) {
    const marker = L.marker([lat, lon])
        .bindPopup(title)
        .addTo(map);
    markers.push({ marker, title, lat, lon });
    saveLocations();
    updateSavedLocationsList();
}

function saveLocations() {
    const locations = markers.map(({ title, lat, lon }) => ({ title, lat, lon }));
    localStorage.setItem('savedLocations', JSON.stringify(locations));
}

function loadSavedLocations() {
    const locations = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    locations.forEach(loc => {
        addMarker(loc.lat, loc.lon, loc.title);
    });
}

function updateSavedLocationsList() {
    const container = document.getElementById('saved-locations');
    container.innerHTML = '';
    markers.forEach((marker, index) => {
        const div = document.createElement('div');
        div.className = 'location-marker';
        div.innerHTML = `
            <span>${marker.title}</span>
            <button onclick="removeLocation(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(div);
    });
}

function removeLocation(index) {
    map.removeLayer(markers[index].marker);
    markers.splice(index, 1);
    saveLocations();
    updateSavedLocationsList();
}

// History Chart functionality
let historyChart;

function initHistoryChart() {
    const ctx = document.getElementById('history-chart').getContext('2d');
    historyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'AQI Values',
                data: [],
                borderColor: '#3498db',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'AQI Value'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            }
        }
    });
}

function updateHistoryChart() {
    const timeRange = document.getElementById('time-range').value;
    const history = JSON.parse(localStorage.getItem('aqiHistory') || '[]');
    
    const now = new Date();
    const filtered = history.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        const diffHours = (now - entryDate) / (1000 * 60 * 60);
        
        switch(timeRange) {
            case 'day': return diffHours <= 24;
            case 'week': return diffHours <= 168;
            case 'month': return diffHours <= 720;
        }
    });

    historyChart.data.labels = filtered.map(entry => 
        new Date(entry.timestamp).toLocaleString()
    );
    historyChart.data.datasets[0].data = filtered.map(entry => entry.aqi);
    historyChart.update();
    
    updateHistoryList(filtered);
}

function updateHistoryList(history) {
    const container = document.getElementById('history-list');
    container.innerHTML = '';
    
    history.reverse().forEach(entry => {
        const div = document.createElement('div');
        div.className = 'history-card';
        div.innerHTML = `
            <h3>AQI: ${entry.aqi}</h3>
            <p>Date: ${new Date(entry.timestamp).toLocaleString()}</p>
            <p>Category: ${getAQICategory(entry.aqi)}</p>
        `;
        container.appendChild(div);
    });
}

function exportHistory() {
    const history = JSON.parse(localStorage.getItem('aqiHistory') || '[]');
    const csv = [
        ['Date', 'AQI', 'Category'],
        ...history.map(entry => [
            new Date(entry.timestamp).toLocaleString(),
            entry.aqi,
            getAQICategory(entry.aqi)
        ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'aqi_history.csv');
    a.click();
}

function getAQICategory(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Mock AQI data fetch (replace with real API in production)
function fetchAQIData(lat, lon) {
    // Simulate API call
    setTimeout(() => {
        const mockAQI = Math.floor(Math.random() * 300);
        const popup = L.popup()
            .setLatLng([lat, lon])
            .setContent(`
                <h3>AQI: ${mockAQI}</h3>
                <p>Category: ${getAQICategory(mockAQI)}</p>
            `)
            .openOn(map);
    }, 1000);
}

// Initialize map and chart when tabs are shown
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.dataset.tab === 'map' && !map) {
            setTimeout(initMap, 100);
        }
        if (tab.dataset.tab === 'history' && !historyChart) {
            setTimeout(() => {
                initHistoryChart();
                updateHistoryChart();
            }, 100);
        }
    });
});

// Update the original form submission to save to history
const originalForm = document.getElementById('aqi-form');
originalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // ... (previous calculation code remains the same)

    // Add to history
    const aqiValue = calculateAQI(
        parseFloat(document.getElementById('pm25').value),
        parseFloat(document.getElementById('pm10').value),
        parseFloat(document.getElementById('co').value),
        parseFloat(document.getElementById('no2').value),
        parseFloat(document.getElementById('so2').value),
        parseFloat(document.getElementById('o3').value)
    );

    const historyEntry = {
        aqi: aqiValue,
        timestamp: new Date().toISOString()
    };

    let history = JSON.parse(localStorage.getItem('aqiHistory') || '[]');
    history.push(historyEntry);
    localStorage.setItem('aqiHistory', JSON.stringify(history));

    if (historyChart) {
        updateHistoryChart();
    }
});
