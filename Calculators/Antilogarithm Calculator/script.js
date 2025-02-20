
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize tab functionality
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');
            const tabIndicator = document.querySelector('.tab-indicator');
            
            function setActiveTab(tab) {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to selected tab and content
                tab.classList.add('active');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Position the indicator
                tabIndicator.style.width = `${tab.offsetWidth}px`;
                tabIndicator.style.left = `${tab.offsetLeft}px`;
            }
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    setActiveTab(tab);
                });
            });
            
            // Set initial tab indicator position
            if (tabs.length > 0) {
                tabIndicator.style.width = `${tabs[0].offsetWidth}px`;
                tabIndicator.style.left = `${tabs[0].offsetLeft}px`;
            }
            
            // Dark mode toggle
            const darkModeToggle = document.getElementById('darkModeToggle');
            const body = document.body;
            
            darkModeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                if (body.classList.contains('dark-mode')) {
                    darkModeToggle.textContent = '☀️';
                } else {
                    darkModeToggle.textContent = '🌙';
                }
            });
            
            // Basic Calculator Functionality
            const logValueInput = document.getElementById('logValue');
            const baseValueInput = document.getElementById('baseValue');
            const calculateBtn = document.getElementById('calculateBtn');
            const clearBtn = document.getElementById('clearBtn');
            const resultValue = document.getElementById('resultValue');
            const calculationSteps = document.getElementById('calculationSteps');
            const logValueError = document.getElementById('logValueError');
            const baseValueError = document.getElementById('baseValueError');
            
            calculateBtn.addEventListener('click', calculateAntilog);
            clearBtn.addEventListener('click', clearBasicCalculator);
            
            function calculateAntilog() {
                // Reset error messages
                logValueError.style.display = 'none';
                baseValueError.style.display = 'none';
                
                // Get input values
                const logValue = parseFloat(logValueInput.value);
                const baseValue = parseFloat(baseValueInput.value);
                
                // Validate inputs
                if (isNaN(logValue)) {
                    logValueError.style.display = 'block';
                    return;
                }
                
                if (isNaN(baseValue) || baseValue <= 0 || baseValue === 1) {
                    baseValueError.style.display = 'block';
                    return;
                }
                
                // Calculate antilog
                const antilogResult = Math.pow(baseValue, logValue);
                
                // Display result
                resultValue.textContent = formatNumber(antilogResult);
                
                // Display calculation steps
                calculationSteps.innerHTML = `
                    <p>1. Starting with the logarithmic value: <strong>x = ${logValue}</strong></p>
                    <p>2. Using base: <strong>b = ${baseValue}</strong></p>
                    <p>3. Applying the antilogarithm formula: <strong>y = b<sup>x</sup></strong></p>
                    <p>4. Substituting the values: <strong>y = ${baseValue}<sup>${logValue}</sup></strong></p>
                    <p>5. Calculating the result: <strong>y = ${formatNumber(antilogResult)}</strong></p>
                `;
                
                // Add to calculation history
                addToHistory(logValue, baseValue, antilogResult);
            }
            
            function clearBasicCalculator() {
                logValueInput.value = '';
                baseValueInput.value = '10';
                resultValue.textContent = '-';
                calculationSteps.textContent = 'Enter values and calculate to see steps';
                logValueError.style.display = 'none';
                baseValueError.style.display = 'none';
            }
            
            // Advanced Calculator Functionality
            const advLogValueInput = document.getElementById('advLogValue');
            const baseSelector = document.getElementById('baseSelector');
            const customBaseGroup = document.getElementById('customBaseGroup');
            const advBaseValueInput = document.getElementById('advBaseValue');
            const precisionValue = document.getElementById('precisionValue');
            const precisionDisplay = document.getElementById('precisionDisplay');
            const notationSelector = document.getElementById('notationSelector');
            const showStepsToggle = document.getElementById('showStepsToggle');
            const advCalculateBtn = document.getElementById('advCalculateBtn');
            const advClearBtn = document.getElementById('advClearBtn');
            const advResultValue = document.getElementById('advResultValue');
            const advCalculationSteps = document.getElementById('advCalculationSteps');
            const advStepsContainer = document.getElementById('advStepsContainer');
            
            // Update precision display
            precisionValue.addEventListener('input', () => {
                precisionDisplay.textContent = precisionValue.value;
            });
            
            // Toggle custom base input visibility
            baseSelector.addEventListener('change', () => {
                if (baseSelector.value === 'custom') {
                    customBaseGroup.style.display = 'block';
                } else {
                    customBaseGroup.style.display = 'none';
                }
            });
            
            // Toggle steps visibility
            showStepsToggle.addEventListener('change', () => {
                advStepsContainer.style.display = showStepsToggle.checked ? 'block' : 'none';
            });
            
            advCalculateBtn.addEventListener('click', calculateAdvancedAntilog);
            advClearBtn.addEventListener('click', clearAdvancedCalculator);
            
            function calculateAdvancedAntilog() {
                // Get inputs
                const logValue = parseFloat(advLogValueInput.value);
                let baseValue;
                
                switch (baseSelector.value) {
                    case 'common':
                        baseValue = 10;
                        break;
                    case 'natural':
                        baseValue = Math.E;
                        break;
                    case 'binary':
                        baseValue = 2;
                        break;
                    case 'custom':
                        baseValue = parseFloat(advBaseValueInput.value);
                        break;
                }
                
                // Validate inputs
                if (isNaN(logValue)) {
                    advResultValue.textContent = 'Error: Invalid logarithmic value';
                    return;
                }
                
                if (isNaN(baseValue) || baseValue <= 0 || baseValue === 1) {
                    advResultValue.textContent = 'Error: Base must be positive and not equal to 1';
                    return;
                }
                
                // Calculate antilog
                const antilogResult = Math.pow(baseValue, logValue);
                const precision = parseInt(precisionValue.value);
                
                // Format according to selected notation
                let formattedResult;
                switch (notationSelector.value) {
                    case 'scientific':
                        formattedResult = antilogResult.toExponential(precision);
                        break;
                    case 'engineering':
                        // Engineering notation - exponent is multiple of 3
                        const exp = Math.floor(Math.log10(Math.abs(antilogResult)));
                        const engineeringExp = Math.floor(exp / 3) * 3;
                        const mantissa = antilogResult / Math.pow(10, engineeringExp);
                        formattedResult = mantissa.toFixed(precision) + 'e' + engineeringExp;
                        break;
                    default:
                        formattedResult = antilogResult.toFixed(precision);
                }
                
                // Display result
                advResultValue.textContent = formattedResult;
                
                // Display calculation steps if enabled
                if (showStepsToggle.checked) {
                    let baseDescription;
                    switch (baseSelector.value) {
                        case 'common':
                            baseDescription = 'Common logarithm (base 10)';
                            break;
                        case 'natural':
                            baseDescription = 'Natural logarithm (base e ≈ 2.718281828459045)';
                            break;
                        case 'binary':
                            baseDescription = 'Binary logarithm (base 2)';
                            break;
                        case 'custom':
                            baseDescription = `Custom base (${baseValue})`;
                            break;
                    }
                    
                    advCalculationSteps.innerHTML = `
                        <p>1. <strong>Input Analysis:</strong> Logarithmic value ${logValue} with ${baseDescription}</p>
                        <p>2. <strong>Mathematical Operation:</strong> Calculating b<sup>x</sup> = ${baseValue}<sup>${logValue}</sup></p>
                        <p>3. <strong>Computation Process:</strong> Using power function with base ${baseValue.toFixed(precision)} raised to ${logValue}</p>
                        <p>4. <strong>Raw Result:</strong> ${antilogResult}</p>
                        <p>5. <strong>Formatted Output (${notationSelector.options[notationSelector.selectedIndex].text}):</strong> ${formattedResult}</p>
                        <p>6. <strong>Precision Applied:</strong> ${precision} decimal places</p>
                    `;
                }
                
                // Add to calculation history
                addToHistory(logValue, baseValue, antilogResult, 'advanced');
            }
            
            function clearAdvancedCalculator() {
                advLogValueInput.value = '';
                baseSelector.value = 'common';
                advBaseValueInput.value = '10';
                customBaseGroup.style.display = 'none';
                advResultValue.textContent = '-';
                advCalculationSteps.textContent = 'Enter values and calculate to see steps';
            }
            
            // Comparison Tools Functionality
            const compLogValueInput = document.getElementById('compLogValue');
            const base10Check = document.getElementById('base10Check');
            const baseECheck = document.getElementById('baseECheck');
            const base2Check = document.getElementById('base2Check');
            const customCompBase = document.getElementById('customCompBase');
            const compareBtn = document.getElementById('compareBtn');
            const compClearBtn = document.getElementById('compClearBtn');
            const comparisonTable = document.getElementById('comparisonTable');
            
            compareBtn.addEventListener('click', compareAntilogarithms);
            compClearBtn.addEventListener('click', clearComparison);
            
            function compareAntilogarithms() {
                const logValue = parseFloat(compLogValueInput.value);
                
                if (isNaN(logValue)) {
                    const tbody = comparisonTable.querySelector('tbody');
                    tbody.innerHTML = '<tr><td colspan="3" class="empty-message">Error: Please enter a valid logarithmic value</td></tr>';
                    return;
                }
                
                // Collect selected bases
                const bases = [];
                if (base10Check.checked) bases.push({ name: 'Base 10 (Common)', value: 10 });
                if (baseECheck.checked) bases.push({ name: 'Base e (Natural)', value: Math.E });
                if (base2Check.checked) bases.push({ name: 'Base 2 (Binary)', value: 2 });
                
                const customBase = parseFloat(customCompBase.value);
                if (!isNaN(customBase) && customBase > 0 && customBase !== 1) {
                    bases.push({ name: `Custom Base (${customBase})`, value: customBase });
                }
                
                if (bases.length === 0) {
                    const tbody = comparisonTable.querySelector('tbody');
                    tbody.innerHTML = '<tr><td colspan="3" class="empty-message">Error: Please select at least one base for comparison</td></tr>';
                    return;
                }
                
                // Calculate antilogarithms for all bases
                const results = bases.map(base => {
                    return {
                        baseName: base.name,
                        baseValue: base.value,
                        antilog: Math.pow(base.value, logValue)
                    };
                });
                
                // Find base 10 result for difference calculation
                const base10Result = results.find(result => result.baseValue === 10)?.antilog || 0;
                
                // Generate table rows
                const tbody = comparisonTable.querySelector('tbody');
                tbody.innerHTML = '';
                
                results.forEach(result => {
                    const difference = result.antilog - base10Result;
                    const percentDiff = base10Result !== 0 ? (difference / base10Result) * 100 : 0;
                    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${result.baseName}</td>
                        <td>${formatNumber(result.antilog)}</td>
                        <td>${result.baseValue === 10 ? 'Reference' : formatNumber(difference) + ` (${percentDiff.toFixed(2)}%)`}</td>
                    `;
                    tbody.appendChild(row);
                });
                
                // Add to calculation history as a special entry
                const basesDescription = bases.map(b => b.name).join(', ');
                addSpecialHistoryEntry(`Compared antilog of ${logValue} across bases: ${basesDescription}`);
            }
            
            function clearComparison() {
                compLogValueInput.value = '';
                base10Check.checked = true;
                baseECheck.checked = true;
                base2Check.checked = true;
                customCompBase.value = '';
                
                const tbody = comparisonTable.querySelector('tbody');
                tbody.innerHTML = '<tr><td colspan="3" class="empty-message">Enter a value and calculate to see comparison</td></tr>';
            }
            
            // Visualization Functionality
            const visBaseValueInput = document.getElementById('visBaseValue');
            const visRangeStartInput = document.getElementById('visRangeStart');
            const visRangeEndInput = document.getElementById('visRangeEnd');
            const visStepsInput = document.getElementById('visSteps');
            const visualizeBtn = document.getElementById('visualizeBtn');
            const visClearBtn = document.getElementById('visClearBtn');
            const graphCanvas = document.getElementById('graphCanvas');
            const pointInfo = document.getElementById('pointInfo');
            const pointDetails = document.getElementById('pointDetails');
            
            visualizeBtn.addEventListener('click', generateGraph);
            visClearBtn.addEventListener('click', resetVisualization);
            
            let currentGraph = null;
            
            function generateGraph() {
                const baseValue = parseFloat(visBaseValueInput.value);
                const rangeStart = parseFloat(visRangeStartInput.value);
                const rangeEnd = parseFloat(visRangeEndInput.value);
                const steps = parseInt(visStepsInput.value);
                
                // Validate inputs
                if (isNaN(baseValue) || baseValue <= 0 || baseValue === 1) {
                    alert('Please enter a valid base (positive and not equal to 1)');
                    return;
                }
                
                if (isNaN(rangeStart) || isNaN(rangeEnd) || rangeStart >= rangeEnd) {
                    alert('Please enter a valid range (start must be less than end)');
                    return;
                }
                
                if (isNaN(steps) || steps < 5 || steps > 100) {
                    alert('Please enter a valid number of points (5-100)');
                    return;
                }
                
                // Generate data points
                const stepSize = (rangeEnd - rangeStart) / (steps - 1);
                const dataPoints = [];
                
                for (let i = 0; i < steps; i++) {
                    const x = rangeStart + i * stepSize;
                    const y = Math.pow(baseValue, x);
                    dataPoints.push({ x, y });
                }
                
                // Draw the graph
                drawGraph(dataPoints, baseValue);
                
                // Add to special history entry
                addSpecialHistoryEntry(`Generated antilog graph for base ${baseValue} from ${rangeStart} to ${rangeEnd}`);
            }
            
            function drawGraph(dataPoints, baseValue) {
                const ctx = graphCanvas.getContext('2d');
                ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
                
                // Find min/max values for scaling
                const minX = Math.min(...dataPoints.map(p => p.x));
                const maxX = Math.max(...dataPoints.map(p => p.x));
                const minY = Math.min(...dataPoints.map(p => p.y));
                const maxY = Math.max(...dataPoints.map(p => p.y));
                
                // Graph dimensions
                const padding = 40;
                const graphWidth = graphCanvas.width - 2 * padding;
                const graphHeight = graphCanvas.height - 2 * padding;
                
                // Function to convert data coordinates to canvas coordinates
                function toCanvasX(x) {
                    return padding + ((x - minX) / (maxX - minX)) * graphWidth;
                }
                
                function toCanvasY(y) {
                    return graphCanvas.height - padding - ((y - minY) / (maxY - minY)) * graphHeight;
                }
                
                // Draw axes
                ctx.beginPath();
                ctx.strokeStyle = '#666';
                ctx.lineWidth = 1;
                
                // X-axis
                ctx.moveTo(padding, graphCanvas.height - padding);
                ctx.lineTo(graphCanvas.width - padding, graphCanvas.height - padding);
                
                // Y-axis
                ctx.moveTo(padding, padding);
                ctx.lineTo(padding, graphCanvas.height - padding);
                ctx.stroke();
                
                // X-axis labels
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = '#666';
                ctx.font = '12px Arial';
                
                const xLabelCount = 5;
                for (let i = 0; i <= xLabelCount; i++) {
                    const x = minX + (i / xLabelCount) * (maxX - minX);
                    const canvasX = toCanvasX(x);
                    ctx.fillText(x.toFixed(1), canvasX, graphCanvas.height - padding + 5);
                    
                    // Grid line
                    ctx.beginPath();
                    ctx.strokeStyle = '#ddd';
                    ctx.setLineDash([2, 2]);
                    ctx.moveTo(canvasX, padding);
                    ctx.lineTo(canvasX, graphCanvas.height - padding);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                
                // Y-axis labels
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                
                const yLabelCount = 5;
                for (let i = 0; i <= yLabelCount; i++) {
                    let y;
                    if (maxY - minY > 1000) {
                        // Use logarithmic scale for large ranges
                        const logMin = Math.log10(Math.max(minY, 0.1));
                        const logMax = Math.log10(maxY);
                        const logY = logMin + (i / yLabelCount) * (logMax - logMin);
                        y = Math.pow(10, logY);
                    } else {
                        // Use linear scale for smaller ranges
                        y = minY + (i / yLabelCount) * (maxY - minY);
                    }
                    
                    const canvasY = toCanvasY(y);
                    
                    let yLabel;
                    if (y < 0.01 || y > 1000) {
                        yLabel = y.toExponential(1);
                    } else {
                        yLabel = y.toPrecision(3);
                    }
                    
                    ctx.fillText(yLabel, padding - 5, canvasY);
                    
                    // Grid line
                    ctx.beginPath();
                    ctx.strokeStyle = '#ddd';
                    ctx.setLineDash([2, 2]);
                    ctx.moveTo(padding, canvasY);
                    ctx.lineTo(graphCanvas.width - padding, canvasY);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
                
                // Draw the curve
                ctx.beginPath();
                ctx.strokeStyle = '#6c5ce7';
                ctx.lineWidth = 2;
                
                let startPoint = dataPoints[0];
                ctx.moveTo(toCanvasX(startPoint.x), toCanvasY(startPoint.y));
                
                for (let i = 1; i < dataPoints.length; i++) {
                    const point = dataPoints[i];
                    ctx.lineTo(toCanvasX(point.x), toCanvasY(point.y));
                }
                
                ctx.stroke();
                
                // Draw points
                dataPoints.forEach(point => {
                    ctx.beginPath();
                    ctx.fillStyle = '#a29bfe';
                    ctx.arc(toCanvasX(point.x), toCanvasY(point.y), 4, 0, Math.PI * 2);
                    ctx.fill();
                });
                
                // Add axis labels
                ctx.fillStyle = '#333';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Log Value (x)', graphCanvas.width / 2, graphCanvas.height - 10);
                
                ctx.save();
                ctx.translate(15, graphCanvas.height / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.textAlign = 'center';
                ctx.fillText(`Antilog Value (${baseValue}^x)`, 0, 0);
                ctx.restore();
                
                // Store current graph data for interactivity
                currentGraph = {
                    dataPoints,
                    toCanvasX,
                    toCanvasY,
                    baseValue
                };
                
                // Add mouse hover functionality
                graphCanvas.addEventListener('mousemove', handleGraphHover);
                graphCanvas.addEventListener('mouseout', () => {
                    pointInfo.style.display = 'none';
                });
                
                // Show the point info container
                pointInfo.style.display = 'block';
            }
            
            function handleGraphHover(event) {
                if (!currentGraph) return;
                
                const rect = graphCanvas.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;
                
                // Find the closest point
                let closestPoint = null;
                let closestDistance = Infinity;
                
                currentGraph.dataPoints.forEach(point => {
                    const canvasX = currentGraph.toCanvasX(point.x);
                    const canvasY = currentGraph.toCanvasY(point.y);
                    
                    const distance = Math.sqrt(
                        Math.pow(mouseX - canvasX, 2) + 
                        Math.pow(mouseY - canvasY, 2)
                    );
                    
                    if (distance < closestDistance && distance < 20) {
                        closestDistance = distance;
                        closestPoint = point;
                    }
                });
                
                if (closestPoint) {
                    // Highlight the point
                    const ctx = graphCanvas.getContext('2d');
                    const canvasX = currentGraph.toCanvasX(closestPoint.x);
                    const canvasY = currentGraph.toCanvasY(closestPoint.y);
                    
                    // Redraw to clear previous highlights
                    generateGraph();
                    
                    // Draw highlight circle
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(255, 87, 51, 0.7)';
                    ctx.arc(canvasX, canvasY, 8, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Show point information
                    pointDetails.innerHTML = `
                        <p><strong>Log Value (x):</strong> ${closestPoint.x.toFixed(4)}</p>
                        <p><strong>Antilog Value (${currentGraph.baseValue}<sup>x</sup>):</strong> ${formatNumber(closestPoint.y)}</p>
                        <p><strong>Formula:</strong> ${currentGraph.baseValue}<sup>${closestPoint.x.toFixed(4)}</sup> = ${formatNumber(closestPoint.y)}</p>
                    `;
                    
                    pointInfo.style.display = 'block';
                }
            }
            
            function resetVisualization() {
                visBaseValueInput.value = '10';
                visRangeStartInput.value = '-2';
                visRangeEndInput.value = '2';
                visStepsInput.value = '20';
                
                const ctx = graphCanvas.getContext('2d');
                ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
                
                pointInfo.style.display = 'none';
                currentGraph = null;
            }
            
            // History Functionality
            const historyList = document.getElementById('historyList');
            const clearHistoryBtn = document.getElementById('clearHistoryBtn');
            const exportHistoryBtn = document.getElementById('exportHistoryBtn');
            
            clearHistoryBtn.addEventListener('click', clearHistory);
            exportHistoryBtn.addEventListener('click', exportHistory);
            
            // Load history from localStorage
            let calculationHistory = JSON.parse(localStorage.getItem('antilogHistory')) || [];
            
            function addToHistory(logValue, baseValue, result, type = 'basic') {
                const timestamp = new Date().toLocaleString();
                
                calculationHistory.unshift({
                    type,
                    logValue,
                    baseValue,
                    result,
                    timestamp
                });
                
                // Limit history size
                if (calculationHistory.length > 50) {
                    calculationHistory.pop();
                }
                
                // Save to localStorage
                localStorage.setItem('antilogHistory', JSON.stringify(calculationHistory));
                
                // Update history display if on history tab
                if (document.getElementById('history').classList.contains('active')) {
                    displayHistory();
                }
            }
            
            function addSpecialHistoryEntry(description) {
                const timestamp = new Date().toLocaleString();
                
                calculationHistory.unshift({
                    type: 'special',
                    description,
                    timestamp
                });
                
                // Limit history size
                if (calculationHistory.length > 50) {
                    calculationHistory.pop();
                }
                
                // Save to localStorage
                localStorage.setItem('antilogHistory', JSON.stringify(calculationHistory));
                
                // Update history display if on history tab
                if (document.getElementById('history').classList.contains('active')) {
                    displayHistory();
                }
            }
            
            function displayHistory() {
                if (calculationHistory.length === 0) {
                    historyList.innerHTML = '<li class="history-item empty-history">No calculations yet. Use the calculator to see history.</li>';
                    return;
                }
                
                historyList.innerHTML = '';
                
                calculationHistory.forEach((entry, index) => {
                    const historyItem = document.createElement('li');
                    historyItem.className = 'history-item';
                    
                    if (entry.type === 'special') {
                        historyItem.innerHTML = `
                            <div class="history-expression">${entry.description}</div>
                            <div class="history-time">${entry.timestamp}</div>
                        `;
                    } else {
                        historyItem.innerHTML = `
                            <div class="history-expression">Antilog<sub>${entry.baseValue.toFixed(2)}</sub>(${entry.logValue})</div>
                            <div class="history-result">${formatNumber(entry.result)}</div>
                            <div class="history-time">${entry.timestamp}</div>
                        `;
                        
                        // Add reuse button
                        const reuseBtn = document.createElement('button');
                        reuseBtn.className = 'btn btn-secondary';
                        reuseBtn.style.padding = '5px 10px';
                        reuseBtn.style.fontSize = '12px';
                        reuseBtn.style.marginTop = '5px';
                        reuseBtn.textContent = 'Reuse Values';
                        
                        reuseBtn.addEventListener('click', () => {
                            // Fill basic calculator with these values
                            logValueInput.value = entry.logValue;
                            baseValueInput.value = entry.baseValue;
                            
                            // Switch to basic calculator tab
                            const basicTab = document.querySelector('.tab[data-tab="basic"]');
                            setActiveTab(basicTab);
                        });
                        
                        historyItem.appendChild(reuseBtn);
                    }
                    
                    historyList.appendChild(historyItem);
                });
            }
            
            function clearHistory() {
                if (confirm('Are you sure you want to clear all calculation history?')) {
                    calculationHistory = [];
                    localStorage.removeItem('antilogHistory');
                    displayHistory();
                }
            }
            
            function exportHistory() {
                if (calculationHistory.length === 0) {
                    alert('No history to export.');
                    return;
                }
                
                let csvContent = 'Type,Log Value,Base,Result,Timestamp\n';
                
                calculationHistory.forEach(entry => {
                    if (entry.type === 'special') {
                        csvContent += `Special,"${entry.description}",,,"${entry.timestamp}"\n`;
                    } else {
                        csvContent += `${entry.type},${entry.logValue},${entry.baseValue},${entry.result},"${entry.timestamp}"\n`;
                    }
                });
                
                // Create download link
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'antilog_calculation_history.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
            
            // Helper Functions
            function formatNumber(num) {
                if (isNaN(num)) return 'Error';
                
                if (Math.abs(num) < 0.0001 || Math.abs(num) > 100000) {
                    return num.toExponential(4);
                }
                
                return num.toFixed(4).replace(/\.?0+$/, '');
            }
            
            // Initialize the app
            displayHistory(); // Load history initially
        });
    