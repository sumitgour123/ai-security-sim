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
let overlay = document.getElementById("overlay");

// FLOW
let flow = [
  "Scanning device...",
  "Detecting OS...",
  "Android detected",
  "Accessing system files...",
  "Bypassing security...",
  "Injecting AI module...",
  "Reading private data...",
  "⚠ Suspicious files found",
  "⚠ Tracking identity...",
  "🚨 DEVICE UNDER SURVEILLANCE"
];

// TYPE
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
  let beep = document.getElementById("beep");
  beep.currentTime = 0;
  beep.play();
}

// IMMERSION
function enableImmersion(){
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";

  if(navigator.vibrate){
    navigator.vibrate([200,100,200]);
  }
}

// SHAKE
function shake(){
  document.body.style.transform = "translate(5px)";
  setTimeout(()=>document.body.style.transform="translate(-5px)",50);
  setTimeout(()=>document.body.style.transform="translate(0)",100);
}

// GLITCH LOOP
setInterval(()=>{
  document.body.classList.add("glitch");
  setTimeout(()=>document.body.classList.remove("glitch"),150);
},2000);

// BREACH
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

  // PERSONAL DATA FEEL
  setTimeout(()=>{
    type("> Device: " + navigator.userAgent);
    type("> Language: " + navigator.language);
    type("> Platform: " + navigator.platform);
  },4000);

  // CAMERA ALERT
  setTimeout(()=>{
    alert("📷 Camera access granted\n🎤 Microphone active (simulation)");
  },9000);

  // HIGH ALERT
  setTimeout(()=>{
    alerts.innerHTML = "🚨 HIGH RISK ACTIVITY DETECTED 🚨";
    playBeep();
    shake();
  },12000);

  // FINAL
  setTimeout(()=>{
    clearInterval(main);
    type("💀 SYSTEM BREACHED");
    breachScreen();
  },20000);
}

// START BUTTON
startBtn.addEventListener("click", () => {

  enableImmersion();

  // SOUND UNLOCK
  let beep = document.getElementById("beep");
  beep.play().then(()=>{
    beep.pause();
    beep.currentTime = 0;
  });

  startSimulation();
});

// NO ESCAPE ILLUSION
window.onbeforeunload = function(){
  return "System process running...";
};
