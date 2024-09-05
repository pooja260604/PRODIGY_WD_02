let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let laps = [];
let isRunning = false;
let timeoutId; // To store the timeout ID

const stopwatchDisplay = document.getElementById('stopwatch-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapTimesList = document.getElementById('lap-times');
const previousTimesList = document.getElementById('previous-times');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);

function startStopwatch() {
    startTime = new Date().getTime() - currentTime; // Account for paused time
    isRunning = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    updateStopwatch();
}

function pauseStopwatch() {
    currentTime = new Date().getTime() - startTime;
    isRunning = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    addLapTime();
}

function resetStopwatch() {
    clearTimeout(timeoutId); // Stop the running stopwatch
    currentTime = 0; // Reset current time
    isRunning = false;
    
    // Immediately reset the display to 00:00:00
    stopwatchDisplay.textContent = '00:00:00';
    
    // Reset buttons and laps
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    
    // Clear the lap list and reset the laps array
    lapTimesList.innerHTML = ''; // Clear the displayed list of laps
    laps = []; // Clear all stored lap times
}

function updateStopwatch() {
    if (isRunning) {
        const currentTimeMs = new Date().getTime() - startTime;
        const hours = Math.floor(currentTimeMs / 3600000);
        const minutes = Math.floor((currentTimeMs % 3600000) / 60000);
        const seconds = Math.floor((currentTimeMs % 60000) / 1000);
        const milliseconds = currentTimeMs % 1000;
        stopwatchDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
        
        // Store timeout ID and update every 10ms
        timeoutId = setTimeout(updateStopwatch, 10);
    }
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}

function addLapTime() {
    const lapTime = stopwatchDisplay.textContent;
    laps.push(lapTime); // Store each lap
    lapTimesList.innerHTML = ''; // Clear list and repopulate with updated laps
    laps.forEach((lap, index) => {
        const lapTimeListItem = document.createElement('li');
        lapTimeListItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapTimesList.appendChild(lapTimeListItem);
    });
}
