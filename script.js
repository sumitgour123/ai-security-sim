// ===== MATRIX (OPTIMIZED) =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";
const size = 14;
const cols = canvas.width / size;
const drops = Array(Math.floor(cols)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#00ff9d";
  ctx.font = size + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text, i*size, drops[i]*size);

    if (drops[i]*size > canvas.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }

  requestAnimationFrame(draw);
}
draw();

// ===== SYSTEM =====
const terminal = document.getElementById("terminal");
const beep = document.getElementById("beep");

function log(msg) {
  const div = document.createElement("div");
  div.textContent = "> " + msg;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;

  beep.currentTime = 0;
  beep.play();
}

// ===== BOOT SEQUENCE =====
let bootLines = [
  "Loading kernel modules...",
  "Initializing AI core...",
  "Bypassing security layer...",
  "Starting cyber engine...",
  "System ready."
];

let i = 0;
function startOS() {
  document.getElementById("boot").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  let interval = setInterval(() => {
    if (i < bootLines.length) {
      log(bootLines[i]);
      i++;
    } else clearInterval(interval);
  }, 700);
}

// ===== COMMAND ENGINE =====
function handleCmd(e) {
  if (e.key === "Enter") {
    let cmd = e.target.value.toLowerCase();
    e.target.value = "";

    log("$ " + cmd);

    if (cmd === "help") log("commands: scan, hack, status, clear");
    else if (cmd === "scan") fakeAction("Scanning network...");
    else if (cmd === "hack") fakeAction("Injecting payload...");
    else if (cmd === "status") log("System stable ✔");
    else if (cmd === "clear") terminal.innerHTML = "";
    else log("Unknown command");
  }
}

function fakeAction(text) {
  let steps = ["Processing...", "Analyzing...", "Bypassing...", "Completed ✔"];
  let j = 0;

  let t = setInterval(() => {
    if (j < steps.length) {
      log(text + " " + steps[j]);
      j++;
    } else clearInterval(t);
  }, 500);
}

// ===== FULLSCREEN =====
function toggleFS() {
  if (!document.fullscreenElement)
    document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}
