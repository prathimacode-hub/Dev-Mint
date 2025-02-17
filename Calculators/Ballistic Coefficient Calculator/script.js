
        // Tab switching functionality
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Ballistic coefficient calculation
        function calculateBC() {
            const mass = parseFloat(document.getElementById('mass').value);
            const diameter = parseFloat(document.getElementById('diameter').value);
            const dragCoef = parseFloat(document.getElementById('dragCoef').value);
            const velocity = parseFloat(document.getElementById('velocity').value);
            const altitude = parseFloat(document.getElementById('altitude').value);
            const temperature = parseFloat(document.getElementById('temperature').value);
            const humidity = parseFloat(document.getElementById('humidity').value);

            if (!mass || !diameter || !dragCoef || !velocity || !altitude || !temperature || !humidity) {
                alert('Please fill in all fields with valid numbers.');
                return;
            }

            const loading = document.querySelector('.loading');
            const result = document.querySelector('.result');
            
            loading.classList.add('show');
            result.classList.remove('show');

            // Simulate calculation time
            setTimeout(() => {
                // Advanced BC calculation formula
                const airDensity = calculateAirDensity(altitude, temperature, humidity);
                const bc = (mass / (diameter * diameter * 7000)) * (1 / dragCoef) * airDensity;
                
                document.getElementById('bcResult').innerHTML = `
                    <p>Ballistic Coefficient: ${bc.toFixed(3)}</p>
                    <p>Form Factor: ${(1/dragCoef).toFixed(3)}</p>
                    <p>Sectional Density: ${(mass/(diameter*diameter*7000)).toFixed(3)}</p>
                    <p>Air Density: ${airDensity.toFixed(3)} kg/m³</p>
                `;

                loading.classList.remove('show');
                result.classList.add('show');

                // Update visualization
                updateVisualization(bc, velocity, airDensity);
            }, 1000);
        }

        // Calculate air density based on altitude, temperature, and humidity
        function calculateAirDensity(altitude, temperature, humidity) {
            const temperatureK = (temperature - 32) * (5 / 9) + 273.15;
            const pressure = 101325 * Math.pow(1 - (0.0065 * altitude / 288.15), 5.25588);
            const vaporPressure = humidity / 100 * 6.1078 * Math.pow(10, (7.5 * temperatureK) / (237.3 + temperatureK));
            const airDensity = (pressure - vaporPressure) / (287.05 * temperatureK) + (vaporPressure / (461.495 * temperatureK));
            return airDensity;
        }

        // Visualization update
        function updateVisualization(bc, velocity, airDensity) {
            const ctx = document.getElementById('trajectoryChart').getContext('2d');
            const timeSteps = [];
            const distances = [];
            const heights = [];

            for (let t = 0; t <= 10; t += 0.1) {
                timeSteps.push(t);
                distances.push(velocity * Math.cos(Math.PI / 4) * t);
                heights.push(velocity * Math.sin(Math.PI / 4) * t - 0.5 * 9.81 * t * t);
            }

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: timeSteps,
                    datasets: [{
                        label: 'Projectile Trajectory',
                        data: heights,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Distance (m)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Height (m)'
                            }
                        }
                    }
                }
            });
        }

        // Add some initial animations
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.info-card').forEach((card, index) => {
                card.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s both`;
            });
        });
   