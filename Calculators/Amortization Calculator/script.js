        let currentTab = 'calculator';
        let charts = {};

        function switchTab(tab) {
            document.querySelector(`.tab-content.active`).classList.remove('active');
            document.getElementById(tab).classList.add('active');
            
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelector(`.tab[onclick="switchTab('${tab}')"]`).classList.add('active');
            
            currentTab = tab;
            if (tab === 'analytics') {
                updateAnalytics();
            }
        }

        function toggleAdvanced() {
            const advancedOptions = document.querySelector('.advanced-options');
            advancedOptions.classList.toggle('show');
            const button = document.querySelector('.toggle-advanced');
            button.textContent = advancedOptions.classList.contains('show') ? 
                'Advanced Options ▼' : 'Advanced Options ▲';
        }

        function calculateLoan() {
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;
            const years = parseInt(document.getElementById('loanTerm').value);
            const paymentsPerYear = parseInt(document.getElementById('paymentFrequency').value);
            const extraPayment = parseFloat(document.getElementById('extraPayment').value) || 0;
            const propertyTax = parseFloat(document.getElementById('propertyTax').value) / 100;
            const insurance = parseFloat(document.getElementById('insurance').value);
            const pmiRate = parseFloat(document.getElementById('pmi').value) / 100;
            const downPaymentPercent = parseFloat(document.getElementById('downPayment').value) / 100;
            
            const numberOfPayments = years * paymentsPerYear;
            const periodicRate = annualRate / paymentsPerYear;
            const downPayment = loanAmount * downPaymentPercent;
            const principalAmount = loanAmount - downPayment;
            
            const basePayment = (principalAmount * periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) / 
                             (Math.pow(1 + periodicRate, numberOfPayments) - 1);
            
            const monthlyTax = (loanAmount * propertyTax) / 12;
            const monthlyInsurance = insurance / 12;
            const monthlyPMI = downPaymentPercent < 0.2 ? (principalAmount * pmiRate) / 12 : 0;
            
            const totalMonthlyPayment = basePayment + monthlyTax + monthlyInsurance + monthlyPMI + extraPayment;
            
            generateResults(totalMonthlyPayment, basePayment, principalAmount, periodicRate, numberOfPayments, 
                          monthlyTax, monthlyInsurance, monthlyPMI, extraPayment);
            generateSchedule(basePayment, principalAmount, periodicRate, numberOfPayments, extraPayment);
            updateAnalytics();
        }

        function generateResults(totalPayment, basePayment, loanAmount, periodicRate, numberOfPayments, 
                               tax, insurance, pmi, extraPayment) {
            const totalInterest = (basePayment * numberOfPayments) - loanAmount;
            const totalPayments = totalPayment * numberOfPayments;
            
            document.getElementById('monthlyPayment').textContent = `$${totalPayment.toFixed(2)}`;
            document.getElementById('totalInterest').textContent = `$${totalInterest.toFixed(2)}`;
            document.getElementById('totalPayment').textContent = `$${totalPayments.toFixed(2)}`;
            
            const breakdownData = {
                labels: ['Principal', 'Interest', 'Tax', 'Insurance', 'PMI', 'Extra Payment'],
                datasets: [{
                    data: [
                        basePayment - (loanAmount * periodicRate),
                        loanAmount * periodicRate,
                        tax,
                        insurance,
                        pmi,
                        extraPayment
                    ],
                    backgroundColor: [
                        '#2563eb',
                        '#3b82f6',
                        '#60a5fa',
                        '#93c5fd',
                        '#bfdbfe',
                        '#dbeafe'
                    ]
                }]
            };
            
            updateChart('paymentBreakdownChart', 'doughnut', breakdownData);
        }

        function generateSchedule(payment, loanAmount, periodicRate, numberOfPayments, extraPayment) {
            let balance = loanAmount;
            let totalInterest = 0;
            let schedule = '<table class="comparison-table"><tr><th>Payment #</th><th>Payment</th><th>Principal</th>' +
                         '<th>Interest</th><th>Extra Payment</th><th>Balance</th><th>Total Interest</th></tr>';
            
            for (let i = 1; i <= numberOfPayments && balance > 0; i++) {
                const interest = balance * periodicRate;
                let principal = payment - interest;
                
                totalInterest += interest;
                
                if (extraPayment > 0) {
                    principal += extraPayment;
                }
                
                balance = Math.max(0, balance - principal);
                
                schedule += `
                    <tr>
                        <td>${i}</td>
                        <td>$${payment.toFixed(2)}</td>
                        <td>$${principal.toFixed(2)}</td>
                        <td>$${interest.toFixed(2)}</td>
                        <td>$${extraPayment.toFixed(2)}</td>
                        <td>$${balance.toFixed(2)}</td>
                        <td>$${totalInterest.toFixed(2)}</td>
                    </tr>
                `;
                
                if (balance === 0) break;
            }
            
            schedule += '</table>';
            document.getElementById('scheduleTable').innerHTML = schedule;
        }

        function updateChart(chartId, type, data) {
            if (charts[chartId]) {
                charts[chartId].destroy();
            }
            
            const ctx = document.getElementById(chartId).getContext('2d');
            charts[chartId] = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        function updateAnalytics() {
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;
            const years = parseInt(document.getElementById('loanTerm').value);
            const paymentsPerYear = parseInt(document.getElementById('paymentFrequency').value);
            
            const numberOfPayments = years * paymentsPerYear;
            const periodicRate = annualRate / paymentsPerYear;
            
            let balance = loanAmount;
            const principalData = [];
            const interestData = [];
            const balanceData = [];
            const cumulativeInterest = [];
            let totalInterest = 0;
            
            for (let i = 1; i <= numberOfPayments; i++) {
                const interest = balance * periodicRate;
                const payment = (loanAmount * periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) / 
                              (Math.pow(1 + periodicRate, numberOfPayments) - 1);
                const principal = payment - interest;
                
                totalInterest += interest;
                balance -= principal;
                
                principalData.push(principal);
                interestData.push(interest);
                balanceData.push(balance);
                cumulativeInterest.push(totalInterest);
            }
            
            // Update all analytics charts
            updateTimelineChart(principalData, interestData);
            updateBalanceChart(balanceData);
            updateCumulativeInterestChart(cumulativeInterest);
        }

        function updateTimelineChart(principalData, interestData) {
            const data = {
                labels: Array.from({length: principalData.length}, (_, i) => i + 1),
                datasets: [{
                    label: 'Principal',
                    data: principalData,
                    borderColor: '#2563eb',
                    fill: false
                }, {
                    label: 'Interest',
                    data: interestData,
                    borderColor: '#3b82f6',
                    fill: false
                }]
            };
            
            updateChart('timelineChart', 'line', data);
        }

        function updateBalanceChart(balanceData) {
            const data = {
                labels: Array.from({length: balanceData.length}, (_, i) => i + 1),
                datasets: [{
                    label: 'Loan Balance',
                    data: balanceData,
                    borderColor: '#2563eb',
                    fill: true,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)'
                }]
            };
            
            updateChart('balanceChart', 'line', data);
        }

        function updateCumulativeInterestChart(cumulativeInterest) {
            const data = {
                labels: Array.from({length: cumulativeInterest.length}, (_, i) => i + 1),
                datasets: [{
                    label: 'Cumulative Interest',
                    data: cumulativeInterest,
                    borderColor: '#3b82f6',
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }]
            };
            
            updateChart('cumulativeInterestChart', 'line', data);
        }

        let scenarioCount = 0;
        function addLoanScenario() {
            scenarioCount++;
            const scenarioDiv = document.createElement('div');
            scenarioDiv.className = 'loan-scenario';
            scenarioDiv.innerHTML = `
                <h3>Scenario ${scenarioCount}</h3>
                <button class="remove-scenario" onclick="removeScenario(this)">×</button>
                <div class="input-group">
                    <label>Loan Amount ($)</label>
                    <input type="number" class="scenario-amount" value="100000">
                </div>
                <div class="input-group">
                    <label>Interest Rate (%)</label>
                    <input type="number" class="scenario-rate" value="5">
                </div>
                <div class="input-group">
                    <label>Term (Years)</label>
                    <input type="number" class="scenario-term" value="30">
                </div>
                <div class="input-group">
                    <label>Down Payment (%)</label>
                    <input type="number" class="scenario-down" value="20">
                </div>
            `;
            document.getElementById('scenarios').appendChild(scenarioDiv);
        }

        function removeScenario(button) {
            button.parentElement.remove();
        }

        function compareScenarios() {
            const scenarios = document.getElementsByClassNameconst 
            scenarios = document.getElementsByClassName('loan-scenario');
            const results = [];
            
            for (let scenario of scenarios) {
                const amount = parseFloat(scenario.querySelector('.scenario-amount').value);
                const rate = parseFloat(scenario.querySelector('.scenario-rate').value) / 100;
                const term = parseInt(scenario.querySelector('.scenario-term').value);
                const downPayment = parseFloat(scenario.querySelector('.scenario-down').value) / 100;
                
                const principalAmount = amount * (1 - downPayment);
                const monthlyRate = rate / 12;
                const numberOfPayments = term * 12;
                
                const payment = (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                              (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                
                const totalInterest = (payment * numberOfPayments) - principalAmount;
                
                results.push({
                    amount: amount,
                    downPayment: downPayment * amount,
                    principalAmount: principalAmount,
                    rate: rate * 100,
                    term: term,
                    monthlyPayment: payment,
                    totalInterest: totalInterest,
                    totalPayment: payment * numberOfPayments
                });
            }
            
            displayComparisonResults(results);
        }

        function displayComparisonResults(results) {
            let html = `
                <h3>Scenario Comparison</h3>
                <div class="chart-container">
                    <canvas id="comparisonChart"></canvas>
                </div>
                <table class="comparison-table">
                    <tr>
                        <th>Scenario</th>
                        <th>Loan Amount</th>
                        <th>Down Payment</th>
                        <th>Rate</th>
                        <th>Term</th>
                        <th>Monthly Payment</th>
                        <th>Total Interest</th>
                        <th>Total Payment</th>
                    </tr>
            `;
            
            results.forEach((result, index) => {
                html += `
                    <tr>
                        <td>Scenario ${index + 1}</td>
                        <td>$${result.amount.toFixed(2)}</td>
                        <td>$${result.downPayment.toFixed(2)}</td>
                        <td>${result.rate.toFixed(2)}%</td>
                        <td>${result.term} years</td>
                        <td>$${result.monthlyPayment.toFixed(2)}</td>
                        <td>$${result.totalInterest.toFixed(2)}</td>
                        <td>$${result.totalPayment.toFixed(2)}</td>
                    </tr>
                `;
            });
            
            html += '</table>';
            
            document.getElementById('comparisonResults').innerHTML = html;
            
            // Create comparison chart
            const comparisonData = {
                labels: results.map((_, index) => `Scenario ${index + 1}`),
                datasets: [{
                    label: 'Monthly Payment',
                    data: results.map(r => r.monthlyPayment),
                    backgroundColor: '#2563eb'
                }, {
                    label: 'Total Interest',
                    data: results.map(r => r.totalInterest),
                    backgroundColor: '#3b82f6'
                }]
            };
            
            updateChart('comparisonChart', 'bar', comparisonData);
        }

        function calculateEarlyPayoff() {
            const additionalPayment = parseFloat(document.getElementById('additionalPayment').value);
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;
            const years = parseInt(document.getElementById('loanTerm').value);
            
            const monthlyRate = annualRate / 12;
            const numberOfPayments = years * 12;
            
            const regularPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            
            let balanceWithExtra = loanAmount;
            let balanceRegular = loanAmount;
            let monthsWithExtra = 0;
            let totalInterestWithExtra = 0;
            let totalInterestRegular = 0;
            
            // Calculate regular payment scenario
            for (let i = 0; i < numberOfPayments; i++) {
                const interestRegular = balanceRegular * monthlyRate;
                totalInterestRegular += interestRegular;
                balanceRegular -= (regularPayment - interestRegular);
            }
            
            // Calculate with extra payment
            while (balanceWithExtra > 0) {
                const interestWithExtra = balanceWithExtra * monthlyRate;
                totalInterestWithExtra += interestWithExtra;
                balanceWithExtra -= (regularPayment + additionalPayment - interestWithExtra);
                monthsWithExtra++;
            }
            
            const yearsSaved = (numberOfPayments - monthsWithExtra) / 12;
            const interestSaved = totalInterestRegular - totalInterestWithExtra;
            
            const results = `
                <div class="analytics-grid">
                    <div class="metric-card">
                        <h3>Years Saved</h3>
                        <div class="metric-value">${yearsSaved.toFixed(1)}</div>
                    </div>
                    <div class="metric-card">
                        <h3>Interest Saved</h3>
                        <div class="metric-value">$${interestSaved.toFixed(2)}</div>
                    </div>
                </div>
            `;
            
            document.getElementById('earlyPayoffResults').innerHTML = results;
        }

        function analyzeRefinance() {
            const newRate = parseFloat(document.getElementById('newRate').value) / 100;
            const closingCosts = parseFloat(document.getElementById('closingCosts').value);
            const currentBalance = parseFloat(document.getElementById('loanAmount').value);
            const currentRate = parseFloat(document.getElementById('interestRate').value) / 100;
            const remainingYears = parseInt(document.getElementById('loanTerm').value);
            
            // Calculate current monthly payment
            const currentMonthlyRate = currentRate / 12;
            const currentPayments = remainingYears * 12;
            const currentPayment = (currentBalance * currentMonthlyRate * 
                                  Math.pow(1 + currentMonthlyRate, currentPayments)) / 
                                 (Math.pow(1 + currentMonthlyRate, currentPayments) - 1);
            
            // Calculate new monthly payment
            const newMonthlyRate = newRate / 12;
            const newPayment = ((currentBalance + closingCosts) * newMonthlyRate * 
                               Math.pow(1 + newMonthlyRate, currentPayments)) / 
                              (Math.pow(1 + newMonthlyRate, currentPayments) - 1);
            
            // Calculate break-even point
            const monthlySavings = currentPayment - newPayment;
            const breakEvenMonths = Math.ceil(closingCosts / monthlySavings);
            
            const results = `
                <div class="analytics-grid">
                    <div class="metric-card">
                        <h3>Monthly Savings</h3>
                        <div class="metric-value">$${monthlySavings.toFixed(2)}</div>
                    </div>
                    <div class="metric-card">
                        <h3>Break-even Time</h3>
                        <div class="metric-value">${breakEvenMonths} months</div>
                    </div>
                </div>
                <p class="mt-4">
                    ${breakEvenMonths < remainingYears * 12 ? 
                      'Refinancing may be beneficial in the long term.' : 
                      'Refinancing may not be cost-effective over your loan term.'}
                </p>
            `;
            
            document.getElementById('refinanceResults').innerHTML = results;
        }

        // Initialize sliders
        document.querySelectorAll('.slider').forEach(slider => {
            slider.addEventListener('input', function() {
                const value = this.value;
                this.nextElementSibling.textContent = this.classList.contains('interest-slider') ? 
                    `${value}%` : `$${parseInt(value).toLocaleString()}`;
            });
        });

        // Initialize calculator
        calculateLoan();
    