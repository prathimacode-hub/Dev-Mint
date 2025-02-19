        // Theme management
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const themeIcon = document.querySelector('.theme-toggle i');
            themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }

        // Initialize theme from localStorage
        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            const themeIcon = document.querySelector('.theme-toggle i');
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        });

        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Global variables
        let calculationHistory = JSON.parse(localStorage.getItem('bsaHistory')) || [];
        let simulationInterval;
        let simulationData = [];

        // Unit conversion functions
        function updateUnits() {
            const system = document.getElementById('unit-system').value;
            document.getElementById('height-unit').textContent = system === 'metric' ? '(cm)' : '(in)';
            document.getElementById('weight-unit').textContent = system === 'metric' ? '(kg)' : '(lbs)';
        }

        function convertToMetric(height, weight) {
            const system = document.getElementById('unit-system').value;
            if (system === 'imperial') {
                height = height * 2.54; // inches to cm
                weight = weight * 0.453592; // lbs to kg
            }
            return { height, weight };
        }

        // BSA Calculation Functions
        function calculateDuBois(height, weight) {
            return 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
        }

        function calculateMosteller(height, weight) {
            return Math.sqrt((height * weight) / 3600);
        }

        function calculateHaycock(height, weight) {
            return 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964);
        }

        // Advanced Metrics Calculation
        function calculateAdvancedMetrics(height, weight, age, gender, activityLevel) {
            const bsa = calculateDuBois(height, weight);
            const bmi = weight / Math.pow(height/100, 2);
            
            // Calculate Ideal Body Weight (Devine Formula)
            const heightInInches = height / 2.54;
            const idealWeight = gender === 'male' 
                ? 50 + 2.3 * (heightInInches - 60)
                : 45.5 + 2.3 * (heightInInches - 60);

            // Calculate Basal Metabolic Rate (Harris-Benedict Equation)
            let bmr;
            if (gender === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }

            // Activity factor for TDEE calculation
            const activityFactors = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725
            };
            const tdee = bmr * activityFactors[activityLevel];

            return {
                bsa,
                bmi,
                idealWeight,
                bmr,
                tdee
            };
        }

        // Main calculation function
        function calculateBSA() {
            // Get input values
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const activityLevel = document.getElementById('activity-level').value;

            // Validate inputs
            if (!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0) {
                alert('Please enter valid values for all fields');
                return;
            }

            // Convert to metric if necessary
            const metric = convertToMetric(height, weight);
            
            // Calculate metrics
            const metrics = calculateAdvancedMetrics(
                metric.height,
                metric.weight,
                age,
                gender,
                activityLevel
            );

            // Display results
            displayResults(metrics);

            // Save to history
            saveToHistory(metrics, {
                height,
                weight,
                age,
                gender,
                activityLevel
            });
        }

        // Display functions
        function displayResults(metrics) {
            const metricsContainer = document.getElementById('metrics-result');
            metricsContainer.innerHTML = `
                <div class="metric-card">
                    <h4>BSA</h4>
                    <p>${metrics.bsa.toFixed(2)} m²</p>
                </div>
                <div class="metric-card">
                    <h4>BMI</h4>
                    <p>${metrics.bmi.toFixed(1)} kg/m²</p>
                </div>
                <div class="metric-card">
                    <h4>Ideal Weight</h4>
                    <p>${metrics.idealWeight.toFixed(1)} kg</p>
                </div>
                <div class="metric-card">
                    <h4>BMR</h4>
                    <p>${metrics.bmr.toFixed(0)} kcal/day</p>
                </div>
                <div class="metric-card">
                    <h4>TDEE</h4>
                    <p>${metrics.tdee.toFixed(0)} kcal/day</p>
                </div>
            `;
        }

        // History management
        function saveToHistory(metrics, inputs) {
            const historyEntry = {
                date: new Date().toISOString(),
                metrics,
                inputs,
                id: Date.now()
            };

            calculationHistory.unshift(historyEntry);
            if (calculationHistory.length > 10) calculationHistory.pop();
            
            localStorage.setItem('bsaHistory', JSON.stringify(calculationHistory));
            updateHistoryDisplay();
        }

        function updateHistoryDisplay() {
            const container = document.getElementById('history-container');
            container.innerHTML = calculationHistory.map(entry => `
                <div class="history-card">
                    <h4>${new Date(entry.date).toLocaleString()}</h4>
                    <p>Height: ${entry.inputs.height} | Weight: ${entry.inputs.weight}</p>
                    <p>BSA: ${entry.metrics.bsa.toFixed(2)} m² | BMI: ${entry.metrics.bmi.toFixed(1)}</p>
                    <div class="history-actions">
                        <button onclick="loadHistoryEntry(${entry.id})">Load</button>
                        <button onclick="deleteHistoryEntry(${entry.id})">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        function loadHistoryEntry(id) {
            const entry = calculationHistory.find(e => e.id === id);
            if (!entry) return;

            document.getElementById('height').value = entry.inputs.height;
            document.getElementById('weight').value = entry.inputs.weight;
            document.getElementById('age').value = entry.inputs.age;
            document.getElementById('gender').value = entry.inputs.gender;
            document.getElementById('activity-level').value = entry.inputs.activityLevel;

            // Switch to calculator tab
            document.querySelector('[data-tab="calculator"]').click();
        }

        function deleteHistoryEntry(id) {
            calculationHistory = calculationHistory.filter(e => e.id !== id);
            localStorage.setItem('bsaHistory', JSON.stringify(calculationHistory));
            updateHistoryDisplay();
        }

        // Simulation functions
        function startSimulation() {
            if (simulationInterval) return;
            
            const baseHeight = parseFloat(document.getElementById('height').value) || 170;
            const baseWeight = parseFloat(document.getElementById('weight').value) || 70;
            
            simulationData = [];
            let timePoint = 0;

            simulationInterval = setInterval(() => {
                // Simulate small random changes in weight
                const weightVariation = baseWeight + (Math.random() - 0.5) * 10;
                const bsa = calculateDuBois(baseHeight, weightVariation);
                
                simulationData.push({ timePoint, bsa });
                timePoint++;

                updateSimulationGraph();
            }, 1000);
        }

        function stopSimulation() {
            if (simulationInterval) {
                clearInterval(simulationInterval);
                simulationInterval = null;
            }
        }

        function resetSimulation() {
            stopSimulation();
            simulationData = [];
            updateSimulationGraph();
        }

        function updateSimulationGraph() {
            const graph = document.getElementById('simulation-graph');
            const maxBSA = Math.max(...simulationData.map(d => d.bsa));
            const minBSA = Math.min(...simulationData.map(d => d.bsa));
            
            const points = simulationData.map(d => {
                const x = (d.timePoint / Math.max(...simulationData.map(d => d.timePoint))) * 100;
                const y = 100 - ((d.bsa - minBSA) / (maxBSA - minBSA)) * 100;
                return `${x},${y}`;
            }).join(' ');

            graph.innerHTML = `
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <polyline
                        points="${points}"
                        fill="none"
                        stroke="var(--accent-color)"
                        stroke-width="2"
                    />
                </svg>
            `;
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            updateHistoryDisplay();
            updateUnits();
        });
   