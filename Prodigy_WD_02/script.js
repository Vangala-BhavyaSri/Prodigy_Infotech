let [hours, minutes, seconds] = [0, 0, 0];
let display = document.getElementById("display");
let laps = document.getElementById("laps");
let interval = null;
let running = false;

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  display.innerText = `${h}:${m}:${s}`;
}

function timer() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }
  updateDisplay();
}

function startStop() {
  if (!running) {
    interval = setInterval(timer, 1000);
    running = true;
  } else {
    clearInterval(interval);
    running = false;
  }
}

function reset() {
  clearInterval(interval);
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  laps.innerHTML = "";
  running = false;
}

function lap() {
  if (running) {
    const li = document.createElement("li");
    li.textContent = display.innerText;
    laps.appendChild(li);
  }
}

