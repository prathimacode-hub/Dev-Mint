// Utility Functions
function createMatrix(rows, cols, defaultValue = 0) {
    return Array(rows).fill().map(() => Array(cols).fill(defaultValue));
}

function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) && 
           a.length === b.length && 
           a.every((val, index) => val === b[index]);
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Banker's Algorithm Implementation
function runBankersAlgorithm(available, allocation, max) {
    const numProcesses = allocation.length;
    const numResources = available.length;
    
    // Calculate need matrix
    const need = allocation.map((proc, i) => 
        proc.map((allocated, j) => max[i][j] - allocated)
    );
    
    // Initialize work and finish arrays
    const work = [...available];
    const finish = Array(numProcesses).fill(false);
    const safeSequence = [];
    const steps = [];
    
    let count = 0;
    let foundProcess;
    
    do {
        foundProcess = false;
        
        // Find an unfinished process with needs <= work
        for (let i = 0; i < numProcesses; i++) {
            if (!finish[i]) {
                let canAllocate = true;
                
                for (let j = 0; j < numResources; j++) {
                    if (need[i][j] > work[j]) {
                        canAllocate = false;
                        break;
                    }
                }
                
                if (canAllocate) {
                    // Process can be allocated
                    steps.push({
                        step: count + 1,
                        process: i,
                        work: [...work],
                        need: need[i].slice(),
                        allocation: allocation[i].slice(),
                        message: `Process P${i} can be executed with available resources [${work}]`
                    });
                    
                    // Execute process and release resources
                    for (let j = 0; j < numResources; j++) {
                        work[j] += allocation[i][j];
                    }
                    
                    finish[i] = true;
                    safeSequence.push(i);
                    foundProcess = true;
                    
                    steps.push({
                        step: count + 1,
                        process: i,
                        work: [...work],
                        released: allocation[i].slice(),
                        message: `Process P${i} executed and released resources. New available: [${work}]`
                    });
                    
                    break;
                }
            }
        }
        
        count++;
    } while (foundProcess && count < numProcesses);
    
    // Check if all processes are finished
    const isSafe = finish.every(f => f);
    
    if (!isSafe) {
        const unfinished = finish.map((f, i) => !f ? i : null).filter(i => i !== null);
        steps.push({
            step: count,
            message: `Cannot proceed further. Processes [${unfinished.map(i => 'P' + i)}] cannot be executed with available resources.`,
            isDeadlock: true
        });
    }
    
    return {
        isSafe,
        safeSequence: isSafe ? safeSequence : [],
        steps
    };
}

// UI Logic
document.addEventListener('DOMContentLoaded', function() {
    // State variables
    let resources = 3;
    let processes = 5;
    let available = [];
    let allocation = [];
    let max = [];
    let animating = false;
    
    // Elements
    const resourceCountInput = document.getElementById('resource-count');
    const processCountInput = document.getElementById('process-count');
    const initializeBtn = document.getElementById('initialize-btn');
    const resourceAllocationDiv = document.getElementById('resource-allocation');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultDiv = document.getElementById('result');
    const resultMessageDiv = document.getElementById('result-message');
    const stepExecutionDiv = document.getElementById('step-execution');
    const stepsContainer = document.getElementById('steps-container');
    
    // Initialize matrices
    function initializeMatrices() {
        resources = parseInt(resourceCountInput.value);
        processes = parseInt(processCountInput.value);
        
        available = Array(resources).fill(0);
        allocation = createMatrix(processes, resources);
        max = createMatrix(processes, resources);
        
        renderAvailableResourcesInputs();
        renderMatrixInputs();
        
        resourceAllocationDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        stepExecutionDiv.style.display = 'none';
    }
    
    // Render available resources inputs
    function renderAvailableResourcesInputs() {
        const container = document.getElementById('available-resources-container');
        container.innerHTML = '';
        
        const row = document.createElement('div');
        row.className = 'matrix-row';
        
        for (let j = 0; j < resources; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            
            const label = document.createElement('div');
            label.textContent = `R${j}`;
            label.className = 'matrix-cell-label';
            
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.value = available[j];
            input.className = 'available-resource-input';
            input.setAttribute('data-index', j);
            input.addEventListener('change', (e) => {
                available[j] = parseInt(e.target.value) || 0;
            });
            
            cell.appendChild(label);
            cell.appendChild(input);
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
    
    // Render matrix inputs
    function renderMatrixInputs() {
        renderMatrixInputsFor('allocated', allocation, 'allocated-matrix-container');
        renderMatrixInputsFor('max', max, 'max-matrix-container');
    }
    
    function renderMatrixInputsFor(type, matrix, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        // Create header row
        const headerRow = document.createElement('div');
        headerRow.className = 'matrix-row';
        
        const emptyHeader = document.createElement('div');
        emptyHeader.className = 'matrix-cell';
        headerRow.appendChild(emptyHeader);
        
        for (let j = 0; j < resources; j++) {
            const header = document.createElement('div');
            header.className = 'matrix-cell header';
            header.textContent = `R${j}`;
            headerRow.appendChild(header);
        }
        
        container.appendChild(headerRow);
        
        // Create rows for each process
        for (let i = 0; i < processes; i++) {
            const row = document.createElement('div');
            row.className = 'matrix-row';
            
            const rowHeader = document.createElement('div');
            rowHeader.className = 'matrix-cell row-header';
            rowHeader.textContent = `P${i}`;
            row.appendChild(rowHeader);
            
            for (let j = 0; j < resources; j++) {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.value = matrix[i][j];
                input.className = `${type}-input`;
                input.setAttribute('data-row', i);
                input.setAttribute('data-col', j);
                input.addEventListener('change', (e) => {
                    const row = parseInt(e.target.getAttribute('data-row'));
                    const col = parseInt(e.target.getAttribute('data-col'));
                    matrix[row][col] = parseInt(e.target.value) || 0;
                });
                
                cell.appendChild(input);
                row.appendChild(cell);
            }
            
            container.appendChild(row);
        }
    }
    
    // Calculate and display results
    function calculateAndDisplayResults() {
        // Read values from inputs
        document.querySelectorAll('.available-resource-input').forEach(input => {
            const index = parseInt(input.getAttribute('data-index'));
            available[index] = parseInt(input.value) || 0;
        });
        
        document.querySelectorAll('.allocated-input').forEach(input => {
            const row = parseInt(input.getAttribute('data-row'));
            const col = parseInt(input.getAttribute('data-col'));
            allocation[row][col] = parseInt(input.value) || 0;
        });
        
        document.querySelectorAll('.max-input').forEach(input => {
            const row = parseInt(input.getAttribute('data-row'));
            const col = parseInt(input.getAttribute('data-col'));
            max[row][col] = parseInt(input.value) || 0;
        });
        
        // Run Banker's Algorithm
        const result = runBankersAlgorithm(available, allocation, max);
        
        // Display result
        resultDiv.style.display = 'block';
        resultDiv.className = result.isSafe ? 'result safe' : 'result unsafe';
        
        if (result.isSafe) {
            resultMessageDiv.innerHTML = `
                <i class="fas fa-check-circle"></i> 
                <strong>Safe State Detected!</strong><br>
                Safe Sequence: ${result.safeSequence.map(p => 'P' + p).join(' → ')}
            `;
        } else {
            resultMessageDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i> 
                <strong>Unsafe State Detected!</strong><br>
                This allocation could lead to deadlock. No safe sequence exists.
            `;
        }
        
        // Display step-by-step execution
        stepExecutionDiv.style.display = 'block';
        stepsContainer.innerHTML = '';
        
        result.steps.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'step';
            stepDiv.style.opacity = '0';
            stepDiv.style.transform = 'translateX(-20px)';
            
            let stepContent = `<strong>Step ${step.step}:</strong> ${step.message}`;
            
            // Add extra info if available
            if (step.process !== undefined && !step.isDeadlock) {
                if (step.need) {
                    stepContent += `<br>Process P${step.process} needs: [${step.need}]`;
                }
                if (step.released) {
                    stepContent += `<br>Process P${step.process} released: [${step.released}]`;
                }
            }
            
            stepDiv.innerHTML = stepContent;
            stepsContainer.appendChild(stepDiv);
            
            // Animate steps appearing
            setTimeout(() => {
                anime({
                    targets: stepDiv,
                    opacity: 1,
                    translateX: 0,
                    easing: 'easeOutQuad',
                    duration: 300
                });
            }, 200 * index);
        });
    }
    
    // Event Listeners
    initializeBtn.addEventListener('click', initializeMatrices);
    calculateBtn.addEventListener('click', calculateAndDisplayResults);
    resetBtn.addEventListener('click', () => {
        allocation = createMatrix(processes, resources);
        max = createMatrix(processes, resources);
        renderMatrixInputs();
        resultDiv.style.display = 'none';
        stepExecutionDiv.style.display = 'none';
    });
    
    // Tab navigation
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const navItems = document.querySelectorAll('nav li');
    
    function switchTab(tab) {
        const targetId = tab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        navItems.forEach(n => n.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(targetId).classList.add('active');
        document.querySelector(`nav li[data-tab="${targetId}"]`).classList.add('active');
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-tab');
            switchTab(document.querySelector(`.tab[data-tab="${targetId}"]`));
        });
    });
    
    // Modal handling
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    function openModal(id) {
        document.getElementById(id).style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeAllModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });
    
    // Button event listeners for modals
    document.getElementById('show-examples-btn').addEventListener('click', () => openModal('examples-modal'));
    document.getElementById('show-theory-btn').addEventListener('click', () => openModal('theory-modal'));
    document.getElementById('feedback-btn').addEventListener('click', () => openModal('feedback-modal'));
    
    // Load example button
    document.getElementById('load-example-1-btn').addEventListener('click', () => {
        resourceCountInput.value = 3;
        processCountInput.value = 5;
        initializeMatrices();
        
        // Example available resources
        available = [3, 3, 2];
        document.querySelectorAll('.available-resource-input').forEach((input, index) => {
            input.value = available[index];
        });
        
        // Example allocations
        const exampleAllocation = [
            [0, 1, 0],
            [2, 0, 0],
            [3, 0, 2],
            [2, 1, 1],
            [0, 0, 2]
        ];
        
        // Example max needs
        const exampleMax = [
            [7, 5, 3],
            [3, 2, 2],
            [9, 0, 2],
            [2, 2, 2],
            [4, 3, 3]
        ];
        
        // Update UI
        document.querySelectorAll('.allocated-input').forEach(input => {
            const row = parseInt(input.getAttribute('data-row'));
            const col = parseInt(input.getAttribute('data-col'));
            input.value = exampleAllocation[row][col];
            allocation[row][col] = exampleAllocation[row][col];
        });
        
        document.querySelectorAll('.max-input').forEach(input => {
            const row = parseInt(input.getAttribute('data-row'));
            const col = parseInt(input.getAttribute('data-col'));
            input.value = exampleMax[row][col];
            max[row][col] = exampleMax[row][col];
        });
        
        closeAllModals();
        calculateAndDisplayResults();
    });
    
    // Feedback form submission
    document.getElementById('submit-feedback-btn').addEventListener('click', () => {
        const name = document.getElementById('feedback-name').value;
        const email = document.getElementById('feedback-email').value;
        const type = document.getElementById('feedback-type').value;
        const message = document.getElementById('feedback-message').value;
        
        if (message.trim() === '') {
            alert('Please enter a feedback message.');
            return;
        }
        
        // In a real application, you'd send this data to a server
        alert('Thank you for your feedback! In a real application, this would be sent to a server.');
        closeAllModals();
    });
    
    // GitHub button
    document.getElementById('view-github-btn').addEventListener('click', () => {
        window.open('https://github.com/sakshamjain98/bankers-algorithm-calculator', '_blank');
    });
    
    // Visualization
    const visualizationPreset = document.getElementById('visualization-preset');
    const startVisualizationBtn = document.getElementById('start-visualization-btn');
    const visualizationArea = document.getElementById('visualization-area');
    const visualizationProgress = document.getElementById('visualization-progress');
    
    startVisualizationBtn.addEventListener('click', () => {
        if (animating) return;
        animating = true;
        
        const preset = visualizationPreset.value;
        visualizationArea.innerHTML = '';
        visualizationProgress.innerHTML = '<p>Initializing...</p>';
        
        // Define preset scenarios
        let scenarioData;
        
        switch (preset) {
            case 'safe':
                scenarioData = {
                    resources: 3,
                    processes: 5,
                    available: [3, 3, 2],
                    allocation: [
                        [0, 1, 0],
                        [2, 0, 0],
                        [3, 0, 2],
                        [2, 1, 1],
                        [0, 0, 2]
                    ],
                    max: [
                        [7, 5, 3],
                        [3, 2, 2],
                        [9, 0, 2],
                        [2, 2, 2],
                        [4, 3, 3]
                    ]
                };
                break;
            case 'unsafe':
                scenarioData = {
                    resources: 2,
                    processes: 3,
                    available: [1, 0],
                    allocation: [
                        [1, 2],
                        [2, 0],
                        [3, 1]
                    ],
                    max: [
                        [3, 3],
                        [3, 2],
                        [4, 1]
                    ]
                };
                break;
            case 'deadlock':
                scenarioData = {
                    resources: 3,
                    processes: 4,
                    available: [0, 0, 0],
                    allocation: [
                        [2, 1, 0],
                        [1, 0, 2],
                        [1, 1, 1],
                        [0, 2, 1]
                    ],
                    max: [
                        [3, 3, 2],
                        [2, 1, 3],
                        [3, 2, 2],
                        [1, 3, 2]
                    ]
                };
                break;
        }
        
        // Run the algorithm
        const result = runBankersAlgorithm(
            scenarioData.available,
            scenarioData.allocation,
            scenarioData.max
        );
        
        // Create processes and resources for visualization
        for (let i = 0; i < scenarioData.processes; i++) {
            const process = document.createElement('div');
            process.className = 'process';
            process.textContent = `P${i}`;
            process.style.left = `${50 + 300 * Math.cos(2 * Math.PI * i / scenarioData.processes)}px`;
            process.style.top = `${150 + 100 * Math.sin(2 * Math.PI * i / scenarioData.processes)}px`;
            process.id = `process-${i}`;
            visualizationArea.appendChild(process);
        }
        
        for (let j = 0; j < scenarioData.resources; j++) {
            const resource = document.createElement('div');
            resource.className = 'resource';
            resource.textContent = `R${j}`;
            resource.style.left = `${200 + 100 * Math.cos(2 * Math.PI * j / scenarioData.resources)}px`;
            resource.style.top = `${150 + 50 * Math.sin(2 * Math.PI * j / scenarioData.resources)}px`;
            resource.id = `resource-${j}`;
            visualizationArea.appendChild(resource);
        }
        
        // Animate the execution
        let stepIndex = 0;
        
        function animateStep() {
            if (stepIndex >= result.steps.length) {
                visualizationProgress.innerHTML += `<p><strong>${result.isSafe ? 'Safe state confirmed!' : 'Unsafe state detected!'}</strong></p>`;
                animating = false;
                return;
            }
            
            const step = result.steps[stepIndex];
            visualizationProgress.innerHTML += `<p>${step.message}</p>`;
            
            if (step.process !== undefined && !step.isDeadlock) {
                const process = document.getElementById(`process-${step.process}`);
                
                // Highlight the process
                anime({
                    targets: process,
                    scale: [1, 1.2, 1],
                    backgroundColor: step.released ? ['#6C63FF', '#00C853', '#6C63FF'] : ['#6C63FF', '#F50057', '#6C63FF'],
                    duration: 1000,
                    easing: 'easeInOutQuad'
                });
            }
            
            setTimeout(() => {
                stepIndex++;
                animateStep();
            }, 2000);
        }
        
        // Start the animation after a brief delay
        setTimeout(animateStep, 1000);
    });
    
    // Particle background
    function createParticles() {
        const particles = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = 1 + Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particles.appendChild(particle);
            
            // Animate particles
            anime({
                targets: particle,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 15000 + Math.random() * 10000,
                delay: Math.random() * 5000,
                easing: 'linear',
                loop: true
            });
        }
    }
    
    createParticles();
    
    // Initialize with default values
    initializeMatrices();
});
