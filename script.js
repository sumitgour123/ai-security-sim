let logs = document.getElementById("logs");
let ai = document.getElementById("ai");
let alerts = document.getElementById("alerts");
let startBtn = document.getElementById("startBtn");
let overlay = document.getElementById("overlay");

let cameraBox = document.getElementById("cameraBox");
let mapBox = document.getElementById("mapBox");
let chatBox = document.getElementById("chatBox");
let chatMessages = document.getElementById("chatMessages");

let beep = document.getElementById("beep");
let alertSound = document.getElementById("alertSound");

// TYPE EFFECT
function type(text){
  let div = document.createElement("div");
  logs.appendChild(div);

  let i=0;
  let t=setInterval(()=>{
    div.innerHTML += text[i];
    i++;
    if(i>=text.length) clearInterval(t);
    logs.scrollTop = logs.scrollHeight;
  },20);
}

// SOUND
function unlockSound(){
  beep.play().then(()=>{
    beep.pause();
    beep.currentTime = 0;
  }).catch(()=>{});
}

function playBeep(){
  beep.currentTime = 0;
  beep.play().catch(()=>{});
}

function playAlert(){
  alertSound.currentTime = 0;
  alertSound.play().catch(()=>{});
}

// FULLSCREEN
function enterFullscreen(){
  let elem = document.documentElement;

  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

// IMMERSION
function enableImmersion(){
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  if(navigator.vibrate){
    navigator.vibrate([200,100,200]);
  }
}

// FLOW
let flow = [
  "Scanning device...",
  "Detecting OS...",
  "Access granted...",
  "Bypassing firewall...",
  "Injecting AI module...",
  "Reading private data..."
];

// MAIN
function startSimulation(){

  let step = 0;

  let main = setInterval(()=>{
    if(step < flow.length){
      type("> " + flow[step]);
      ai.innerHTML = "AI: " + flow[step];
      playBeep();
      step++;
    }
  },1200);

  // CAMERA
  setTimeout(()=>{
    cameraBox.classList.remove("hidden");

    let texts = [
      "Accessing camera...",
      "Scanning face...",
      "Analyzing...",
      "Face match found"
    ];

    let i=0;
    let t=setInterval(()=>{
      document.getElementById("cameraFeed").innerText = texts[i];
      i++;
      if(i>=texts.length) clearInterval(t);
    },1000);

  },5000);

  // MAP
  setTimeout(()=>{
    mapBox.classList.remove("hidden");

    let steps = [
      "Locating device...",
      "Getting coordinates...",
      "Latitude: 26.xxxx",
      "Longitude: 75.xxxx",
      "Location locked"
    ];

    let i=0;
    let t=setInterval(()=>{
      document.getElementById("mapText").innerText = steps[i];
      i++;
      if(i>=steps.length) clearInterval(t);
    },1200);

  },8000);

  // CHAT
  setTimeout(()=>{
    chatBox.classList.remove("hidden");

    let msgs = [
      "Hello user...",
      "Your device is vulnerable",
      "I have access to your data",
      "Do not try to exit",
      "System control acquired"
    ];

    let i=0;
    let t=setInterval(()=>{
      let div = document.createElement("div");
      div.innerText = "AI: " + msgs[i];
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      i++;
      if(i>=msgs.length) clearInterval(t);

    },2000);

  },11000);

  // ALERT
  setTimeout(()=>{
    alerts.innerHTML = "🚨 HIGH RISK ACTIVITY DETECTED 🚨";
    playAlert();
  },13000);

  // FINAL
  setTimeout(()=>{
    clearInterval(main);
    document.body.innerHTML = `
      <h1 style="color:red;text-align:center;margin-top:40%">
      ⚠ SYSTEM BREACHED ⚠<br>(Simulation)
      </h1>`;
  },18000);
}

// START
startBtn.addEventListener("click", () => {

  enterFullscreen();
  enableImmersion();
  unlockSound();

  startSimulation();
});
