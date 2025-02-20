
// Tab switching functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Calculator history
let calculationHistory = [];

function calculateAGP() {
    const a = parseFloat(document.getElementById('first-term').value);
    const d = parseFloat(document.getElementById('common-difference').value);
    const r = parseFloat(document.getElementById('common-ratio').value);
    const n = parseInt(document.getElementById('num-terms').value);

    if (isNaN(a) || isNaN(d) || isNaN(r) || isNaN(n)) {
        alert('Please enter valid numbers for all fields');
        return;
    }

    let sequence = [];
    let sum = 0;
    let term = a;

    for (let i = 0; i < n; i++) {
        sequence.push(term);
        sum += term;
        term = (term + d) * r;
    }

    const result = {
        sequence,
        sum,
        parameters: { a, d, r, n },
        timestamp: new Date()
    };

    calculationHistory.unshift(result);
    updateResults(result);
    updateHistory();
    updateVisualization(result);
}

function updateResults(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Sequence: ${result.sequence.map(n => n.toFixed(2)).join(', ')}</p>
        <p>Sum: ${result.sum.toFixed(2)}</p>
    `;
    resultDiv.classList.add('active');
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = calculationHistory.map((calc, index) => `
        <div class="history-item">
            <div>
                <strong>Calculation ${index + 1}</strong>
                <p>Sum: ${calc.sum.toFixed(2)}</p>
                <small>${calc.timestamp.toLocaleString()}</small>
            </div>
            <button class="btn" onclick="restoreCalculation(${index})">
                <i class="fas fa-redo"></i>
            </button>
        </div>
    `).join('');
}

function restoreCalculation(index) {
    const calc = calculationHistory[index];
    document.getElementById('first-term').value = calc.parameters.a;
    document.getElementById('common-difference').value = calc.parameters.d;
    document.getElementById('common-ratio').value = calc.parameters.r;
    document.getElementById('num-terms').value = calc.parameters.n;
    
    // Switch to calculator tab
    document.querySelector('[data-tab="calculator"]').click();
}

function updateVisualization(result) {
    const container = document.getElementById('chart-container');
    const chartType = document.getElementById('chart-type').value;
    
    // Clear previous visualization
    container.innerHTML = '';
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 300');
    
    const sequence = result.sequence;
    const maxValue = Math.max(...sequence);
    const minValue = Math.min(...sequence);
    const range = maxValue - minValue;
    
    // Calculate scales
    const xScale = 700 / (sequence.length - 1);
    const yScale = 250 / range;
    
    if (chartType === 'line') {
        // Create path for line chart
        let pathData = `M 50 ${280 - (sequence[0] - minValue) * yScale}`;
        sequence.forEach((value, index) => {
            if (index > 0) {
                pathData += ` L ${50 + index * xScale} ${280 - (value - minValue) * yScale}`;
            }
        });
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', '#2563eb');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        svg.appendChild(path);
    } else if (chartType === 'bar') {
        // Create bars
        const barWidth = xScale * 0.8;
        sequence.forEach((value, index) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', 50 + index * xScale - barWidth/2);
            rect.setAttribute('y', 280 - (value - minValue) * yScale);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', (value - minValue) * yScale);
            rect.setAttribute('fill', '#2563eb');
            svg.appendChild(rect);
        });
    } else if (chartType === 'scatter') {
        // Create scatter points
        sequence.forEach((value, index) => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', 50 + index * xScale);
            circle.setAttribute('cy', 280 - (value - minValue) * yScale);
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', '#2563eb');
            svg.appendChild(circle);
        });
    }
    
    // Add axes
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', '50');
    xAxis.setAttribute('y1', '280');
    xAxis.setAttribute('x2', '750');
    xAxis.setAttribute('y2', '280');
    xAxis.setAttribute('stroke', '#000');
    xAxis.setAttribute('stroke-width', '1');
    
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', '50');
    yAxis.setAttribute('y1', '30');
    yAxis.setAttribute('x2', '50');
    yAxis.setAttribute('y2', '280');
    yAxis.setAttribute('stroke', '#000');
    // [Previous code remains the same until the visualization function...]

yAxis.setAttribute('stroke-width', '1');

// Add axis labels and gridlines
for (let i = 0; i <= sequence.length - 1; i++) {
// X-axis labels
const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
xLabel.setAttribute('x', 50 + i * xScale);
xLabel.setAttribute('y', 295);
xLabel.setAttribute('text-anchor', 'middle');
xLabel.setAttribute('font-size', '12');
xLabel.textContent = i + 1;
svg.appendChild(xLabel);

// Vertical gridlines
const gridline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
gridline.setAttribute('x1', 50 + i * xScale);
gridline.setAttribute('y1', 30);
gridline.setAttribute('x2', 50 + i * xScale);
gridline.setAttribute('y2', 280);
gridline.setAttribute('stroke', '#e2e8f0');
gridline.setAttribute('stroke-width', '1');
svg.appendChild(gridline);
}

// Y-axis labels and gridlines
const ySteps = 5;
for (let i = 0; i <= ySteps; i++) {
const value = minValue + (range / ySteps) * i;
const yPos = 280 - (value - minValue) * yScale;

// Y-axis labels
const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
yLabel.setAttribute('x', 40);
yLabel.setAttribute('y', yPos);
yLabel.setAttribute('text-anchor', 'end');
yLabel.setAttribute('alignment-baseline', 'middle');
yLabel.setAttribute('font-size', '12');
yLabel.textContent = value.toFixed(1);
svg.appendChild(yLabel);

// Horizontal gridlines
const gridline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
gridline.setAttribute('x1', 50);
gridline.setAttribute('y1', yPos);
gridline.setAttribute('x2', 750);
gridline.setAttribute('y2', yPos);
gridline.setAttribute('stroke', '#e2e8f0');
gridline.setAttribute('stroke-width', '1');
svg.appendChild(gridline);
}

svg.appendChild(xAxis);
svg.appendChild(yAxis);
container.appendChild(svg);
}

// Add event listener for chart type changes
document.getElementById('chart-type').addEventListener('change', () => {
if (calculationHistory.length > 0) {
updateVisualization(calculationHistory[0]);
}
});

// Add data export functionality
function exportData() {
const data = {
history: calculationHistory,
exportDate: new Date(),
version: '1.0'
};

const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = 'agp-calculations.json';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
}

// Add formula preview functionality
function showFormulaPreview() {
const a = parseFloat(document.getElementById('first-term').value) || 0;
const d = parseFloat(document.getElementById('common-difference').value) || 0;
const r = parseFloat(document.getElementById('common-ratio').value) || 0;

const preview = document.createElement('div');
preview.className = 'formula-preview';
preview.innerHTML = `
<h4>Formula Preview:</h4>
<p>T₁ = ${a}</p>
<p>T₂ = (${a} + ${d}) × ${r} = ${((a + d) * r).toFixed(2)}</p>
<p>T₃ = (${((a + d) * r)} + ${d}) × ${r} = ${(((a + d) * r + d) * r).toFixed(2)}</p>
`;

document.getElementById('calculator').appendChild(preview);
}

// Add input validation
function validateInputs() {
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
input.addEventListener('input', function() {
if (this.value === '') {
    this.classList.remove('valid', 'invalid');
    return;
}

const value = parseFloat(this.value);
if (isNaN(value)) {
    this.classList.add('invalid');
    this.classList.remove('valid');
} else {
    this.classList.add('valid');
    this.classList.remove('invalid');
}
});
});
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
if (e.ctrlKey && e.key === 'Enter') {
calculateAGP();
}
});

// Add responsive design enhancements
function setupResponsiveness() {
const resizeObserver = new ResizeObserver(entries => {
for (let entry of entries) {
if (entry.target.id === 'chart-container') {
    if (calculationHistory.length > 0) {
        updateVisualization(calculationHistory[0]);
    }
}
}
});

resizeObserver.observe(document.getElementById('chart-container'));
}

// Add theme switching functionality
function toggleTheme() {
document.body.classList.toggle('dark-theme');
localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Initialize the calculator
function init() {
validateInputs();
setupResponsiveness();

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
document.body.classList.add('dark-theme');
}

// Add theme toggle button
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle btn';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.onclick = toggleTheme;
document.querySelector('.header').appendChild(themeToggle);
}

// Call initialization function
init();
