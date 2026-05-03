const screens = {
  intro: document.getElementById("intro"),
  loader: document.getElementById("loader"),
  terminal: document.getElementById("terminal"),
  scan: document.getElementById("scan"),
  alert: document.getElementById("alert"),
  end: document.getElementById("end")
};

function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function start() {
  show("loader");

  setTimeout(() => {
    show("terminal");
    typeTerminal();
  }, 2000);
}

function typeTerminal() {
  const lines = [
    "Initializing...",
    "Connecting AI...",
    "Scanning network...",
    "⚠ Suspicious activity..."
  ];

  let i = 0;
  let el = screens.terminal;

  let interval = setInterval(() => {
    el.innerHTML += lines[i] + "<br>";
    i++;

    if (i >= lines.length) {
      clearInterval(interval);
      setTimeout(startScan, 1000);
    }
  }, 700);
}

function startScan() {
  show("scan");

  let progress = 0;
  let bar = document.getElementById("progress");
  let log = document.getElementById("log");

  let interval = setInterval(() => {
    progress += Math.random() * 7;
    bar.style.width = progress + "%";

    log.innerText = [
      "Checking system...",
      "Decrypting...",
      "Uploading..."
    ][Math.floor(Math.random()*3)];

    if (progress >= 100) {
      clearInterval(interval);
      triggerAlert();
    }
  }, 400);
}

function triggerAlert() {
  show("alert");

  setTimeout(() => {
    show("end");
  }, 2500);
}
