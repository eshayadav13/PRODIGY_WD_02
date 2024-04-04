let timer;
let isRunning = false;
let startTime;
let currentTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapResetBtn = document.getElementById('lapReset');
const lapsList = document.getElementById('laps');

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor(time % 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateTime() {
  currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    isRunning = true;
    startStopBtn.textContent = 'Stop';
  }
}

function lapReset() {
  if (isRunning) {
    const lapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapsList.appendChild(lapItem);
  } else {
    display.textContent = '00:00:00.000';
    lapsList.innerHTML = '';
    elapsedTime = 0;
  }
}

startStopBtn.addEventListener('click', startStop);
lapResetBtn.addEventListener('click', lapReset);
