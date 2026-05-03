const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const terminal = document.getElementById("terminal");
const main = document.getElementById("main");
const progressBar = document.getElementById("progress");
const log = document.getElementById("log");
const end = document.getElementById("end");

let progress = 0;

// START
startBtn.onclick = () => {
  fadeOut(startScreen);
  setTimeout(startTerminal, 800);
};

// FADE OUT
function fadeOut(el) {
  el.style.opacity = 0;
  setTimeout(() => el.classList.add("hidden"), 800);
}

// FADE IN
function fadeIn(el) {
  el.classList.remove("hidden");
  el.style.opacity = 0;
  setTimeout(() => el.style.opacity = 1, 50);
}

// TYPEWRITER EFFECT
function typeLines(lines, callback) {
  let i = 0;
  let j = 0;

  function type() {
    if (i < lines.length) {
      if (j < lines[i].length) {
        terminal.innerText += lines[i][j];
        j++;
        setTimeout(type, 30);
      } else {
        terminal.innerText += "\n";
        i++;
        j = 0;
        setTimeout(type, 300);
      }
    } else {
      callback();
    }
  }

  type();
}

// TERMINAL START
function startTerminal() {
  fadeIn(terminal);

  const lines = [
    "Initializing AI modules...",
    "Scanning network traffic...",
    "Analyzing behavior patterns...",
    "Detecting anomaly...",
    "⚠ Suspicious activity detected"
  ];

  typeLines(lines, () => {
    setTimeout(() => {
      fadeOut(terminal);
      setTimeout(startScan, 800);
    }, 800);
  });
}

// SCAN
function startScan() {
  fadeIn(main);

  const messages = [
    "Checking integrity...",
    "Isolating threat...",
    "Analyzing packets...",
    "Neutralizing..."
  ];

  let interval = setInterval(() => {
    progress += Math.random() * 4;
    progressBar.style.width = progress + "%";

    log.innerText = messages[Math.floor(Math.random() * messages.length)];

    if (progress >= 100) {
      clearInterval(interval);
      finish();
    }
  }, 400);
}

// FINISH
function finish() {
  fadeOut(main);
  setTimeout(() => fadeIn(end), 800);
}
