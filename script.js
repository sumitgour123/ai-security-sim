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

// FAKE USER DATA (REAL FEEL)
const fakeIP = "192.168." + Math.floor(Math.random()*255) + "." + Math.floor(Math.random()*255);
const fakeBattery = Math.floor(Math.random()*100) + "%";

// TERMINAL LINE ADD
function addLine(text) {
  const terminal = document.getElementById("terminal");
  const line = document.createElement("div");
  line.textContent = "> " + text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

// TERMINAL FLOW
function startTerminal() {
  const lines = [
    "Initializing secure connection...",
    "Connecting to remote server...",
    "Bypassing firewall...",
    "Access granted...",
    "Fetching device info...",
    "IP Address: " + fakeIP,
    "Device: Android",
    "Battery: " + fakeBattery,
    "Location: India",
    "Injecting payload...",
    "⚠ Suspicious activity detected..."
  ];

  let i = 0;

  function nextLine() {
    if (i < lines.length) {
      addLine(lines[i]);

      i++;
      setTimeout(nextLine, 900 + Math.random()*500);
    } else {
      setTimeout(startScan, 1200);
    }
  }

  nextLine();
}

// SCAN
function startScan() {
  show("scan");

  let progress = 0;
  let bar = document.getElementById("progress");
  let log = document.getElementById("log");

  const msgs = [
    "Decrypting user files...",
    "Uploading data...",
    "Scanning storage...",
    "Accessing system logs..."
  ];

  const interval = setInterval(() => {
    progress += Math.random() * 5;
    bar.style.width = progress + "%";

    log.innerText = msgs[Math.floor(Math.random()*msgs.length)];

    if (progress >= 100) {
      clearInterval(interval);
      triggerAlert();
    }
  }, 700);
}

// ALERT (MAIN MOMENT)
function triggerAlert() {
  show("alert");

  document.querySelector(".danger").innerText =
    "⚠ Unauthorized Access Detected ⚠";

  // subtle sound
  const beep = new Audio("https://www.soundjay.com/button/beep-07.wav");
  beep.volume = 0.2;
  beep.play();

  setTimeout(() => {
    show("end");
  }, 3500);
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
