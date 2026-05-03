// MATRIX EFFECT
let c = document.getElementById("matrix");
let ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

let letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let font = 14;
let columns = c.width / font;
let drops = [];

for(let i=0;i<columns;i++) drops[i]=1;

function draw(){
  ctx.fillStyle="rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,c.width,c.height);

  ctx.fillStyle="#0f0";
  ctx.font = font+"px monospace";

  for(let i=0;i<drops.length;i++){
    let text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text, i*font, drops[i]*font);

    if(drops[i]*font > c.height && Math.random()>0.975)
      drops[i]=0;

    drops[i]++;
  }
}
setInterval(draw,33);


// ELEMENTS
let logs = document.getElementById("logs");
let ai = document.getElementById("ai");
let alerts = document.getElementById("alerts");
let startBtn = document.getElementById("startBtn");

// STORY FLOW
let flow = [
  "Scanning device...",
  "Detecting OS...",
  "Android device detected",
  "Accessing system files...",
  "Bypassing security...",
  "Injecting AI module...",
  "Reading private data...",
  "⚠ Suspicious files found",
  "⚠ Tracking identity...",
  "🚨 DEVICE UNDER SURVEILLANCE"
];

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
function playBeep(){
  document.getElementById("beep").play();
}

// GLITCH LOOP
setInterval(()=>{
  document.body.classList.add("glitch");
  setTimeout(()=>document.body.classList.remove("glitch"),150);
},2000);

// BREACH SCREEN
function breachScreen(){
  document.body.innerHTML = `
    <div style="
      background:black;
      color:red;
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      font-family:monospace;
      text-align:center;
    ">
      <h1>⚠ SYSTEM BREACHED ⚠</h1>
      <p>All data under AI control</p>
      <p>(Simulation)</p>
    </div>
  `;
}

// START FUNCTION
function start(){

  document.documentElement.requestFullscreen();

  let step = 0;

  let main = setInterval(()=>{

    if(step < flow.length){
      type("> " + flow[step]);
      ai.innerHTML = "AI: " + flow[step];
      playBeep();
      step++;
    }

  },1200);

  // PERSONALIZATION
  setTimeout(()=>{
    type("> Device: " + navigator.userAgent);
    type("> Language: " + navigator.language);
    type("> Platform: " + navigator.platform);
  },4000);

  // CAMERA ALERT
  setTimeout(()=>{
    alert("📷 Camera access granted\n🎤 Microphone active (simulation)");
  },10000);

  // ALERT UPGRADE
  setTimeout(()=>{
    alerts.innerHTML = "🚨 HIGH RISK ACTIVITY DETECTED 🚨";
  },12000);

  // FINAL BREACH
  setTimeout(()=>{
    clearInterval(main);
    type("💀 SYSTEM BREACHED");
    breachScreen();
  },20000);
}

// BUTTON
startBtn.addEventListener("click", start);
