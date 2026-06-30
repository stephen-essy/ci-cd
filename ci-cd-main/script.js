document.getElementById('simulate-btn').addEventListener('click', runSimulation);

const consoleEl = document.getElementById('log-console');
const btn = document.getElementById('simulate-btn');

const stageGit = document.getElementById('stage-git');
const stageCI = document.getElementById('stage-ci');
const stageCD = document.getElementById('stage-cd');

function log(message, type = 'system') {
    const p = document.createElement('p');
    p.className = `${type}-msg`;
    p.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    consoleEl.appendChild(p);
    consoleEl.scrollTop = consoleEl.scrollHeight;
}

function resetStages() {
    [stageGit, stageCI, stageCD].forEach(stage => {
        stage.className = 'stage';
    });
    stageGit.querySelector('.status-text').textContent = "Awaiting changes...";
    stageCI.querySelector('.status-text').textContent = "Build & Lint";
    stageCD.querySelector('.status-text').textContent = "Live on Vercel";
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSimulation() {
    btn.disabled = true;
    resetStages();

    // Step 1: Git Push
    log('Running: git add . && git commit -m "update dashboard"', 'info');
    stageGit.classList.add('active');
    stageGit.querySelector('.status-text').textContent = "Pushing code...";
    await sleep(1500);
    
    stageGit.classList.remove('active');
    stageGit.classList.add('success');
    stageGit.querySelector('.status-text').textContent = "Code Pushed to GitHub!";
    log('Success: GitHub repository updated webhook triggered.', 'success');

    // Step 2: Vercel CI (Build & Check)
    log('Vercel: Fetching commit. Starting build optimization...', 'info');
    stageCI.classList.add('active');
    stageCI.querySelector('.status-text').textContent = "Compiling & Linting...";
    await sleep(2000);

    stageCI.classList.remove('active');
    stageCI.classList.add('success');
    stageCI.querySelector('.status-text').textContent = "Build Passed (0 errors)";
    log('Success: Environment checks passed. Production bundle ready.', 'success');

    // Step 3: Vercel CD (Deployment)
    log('Vercel: Deploying build to edge nodes...', 'info');
    stageCD.classList.add('active');
    stageCD.querySelector('.status-text').textContent = "Routing traffic...";
    await sleep(1500);

    stageCD.classList.remove('active');
    stageCD.classList.add('success');
    stageCD.querySelector('.status-text').textContent = "Deployment Live!";
    log('Success: Pipeline complete! Application updated globally with zero downtime.', 'success');

    btn.disabled = false;
}