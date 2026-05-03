// SCREEN CONTROL
const screens = {
  intro: document.getElementById("intro"),
  terminal: document.getElementById("terminal"),
  scan: document.getElementById("scan"),
  alert: document.getElementById("alert"),
  end: document.getElementById("end")
};

function show(name) {
  Object.values(screens).forEach(s => {
    s.classList.remove("active");
    s.classList.add("hidden");
  });

  screens[name].classList.remove("hidden");
  setTimeout(() => screens[name].classList.add("active"), 50);
}

// START
function start() {
  show("terminal");
  startTerminal();
}

// TERMINAL
function addLine(text) {
  const terminal = document.getElementById("terminal");
  const line = document.createElement("div");
  line.textContent = "> " + text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function startTerminal() {
  const lines = [
    "Connecting to server...",
    "Bypassing firewall...",
    "Injecting payload...",
    "Accessing data...",
    "⚠ SYSTEM COMPROMISED"
  ];

  let i = 0;

  const interval = setInterval(() => {
    addLine(lines[i]);
    i++;

    if (i >= lines.length) {
      clearInterval(interval);
      setTimeout(startScan, 1000);
    }
  }, 700);
}

// SCAN
function startScan() {
  show("scan");

  let progress = 0;
  let bar = document.getElementById("progress");
  let log = document.getElementById("log");

  const msgs = ["Decrypting...", "Uploading...", "Analyzing..."];

  const interval = setInterval(() => {
    progress += Math.random() * 6;
    bar.style.width = progress + "%";

    log.innerText = msgs[Math.floor(Math.random() * msgs.length)];

    if (progress >= 100) {
      clearInterval(interval);
      triggerAlert();
    }
  }, 400);
}

// ALERT
function triggerAlert() {
  show("alert");

  setTimeout(() => {
    show("end");
  }, 2500);
}

// MATRIX EFFECT
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 33);
