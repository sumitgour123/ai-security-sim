let overlay = document.getElementById("overlay");
let bootScreen = document.getElementById("bootScreen");

let logs = document.getElementById("logs");
let ai = document.getElementById("ai");
let alerts = document.getElementById("alerts");

let beep = document.getElementById("beep");
let alertSound = document.getElementById("alertSound");

let cameraBox = document.getElementById("cameraBox");
let mapBox = document.getElementById("mapBox");
let chatBox = document.getElementById("chatBox");
let chatMessages = document.getElementById("chatMessages");

let startBtn = document.getElementById("startBtn");

/* ---------- MATRIX ---------- */
let c = document.getElementById("matrix");
let ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

let letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let drops = Array(200).fill(1);

function drawMatrix(){
  ctx.fillStyle="rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,c.width,c.height);

  ctx.fillStyle="#0f0";
  ctx.font="14px monospace";

  for(let i=0;i<drops.length;i++){
    let text = letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text,i*10,drops[i]*10);

    if(drops[i]*10 > c.height && Math.random()>0.975)
      drops[i]=0;

    drops[i]++;
  }
}
setInterval(drawMatrix,40);

/* ---------- TYPE ---------- */
function type(text){
  let div=document.createElement("div");
  logs.appendChild(div);

  let i=0;
  let t=setInterval(()=>{
    div.innerHTML+=text[i];
    i++;
    if(i>=text.length) clearInterval(t);
    logs.scrollTop=logs.scrollHeight;
  },15);
}

/* ---------- SOUND SAFE ---------- */
function playBeep(){
  try{
    beep.currentTime=0;
    beep.play();
  }catch(e){}
}

function playAlert(){
  try{
    alertSound.currentTime=0;
    alertSound.play();
  }catch(e){}
}

/* ---------- IMMERSION ---------- */
function startImmersion(){
  overlay.style.display="block";
  document.body.style.overflow="hidden";
}

/* ---------- FLOW ---------- */
let flow=[
  "Booting AI core...",
  "Scanning system...",
  "Access granted...",
  "Security bypassed...",
  "Injecting module...",
  "Reading system memory..."
];

/* ---------- MAIN ---------- */
function startSimulation(){

  let i=0;

  let loop=setInterval(()=>{
    if(i<flow.length){
      type("> "+flow[i]);
      ai.innerText="AI: "+flow[i];
      playBeep();
      i++;
    }
  },1000);

  /* CAMERA */
  setTimeout(()=>{
    cameraBox.classList.remove("hidden");
    cameraFeed.innerText="Face scan complete";
  },4000);

  /* MAP */
  setTimeout(()=>{
    mapBox.classList.remove("hidden");
    mapText.innerText="Location locked (simulated)";
  },7000);

  /* CHAT */
  setTimeout(()=>{
    chatBox.classList.remove("hidden");

    let msgs=["Hello user","System access gained","Monitoring active","No escape detected"];

    let j=0;
    let t=setInterval(()=>{
      let d=document.createElement("div");
      d.innerText="AI: "+msgs[j];
      chatMessages.appendChild(d);
      j++;
      if(j>=msgs.length) clearInterval(t);
    },1500);

  },9000);

  /* ALERT */
  setTimeout(()=>{
    alerts.innerText="⚠ HIGH ACTIVITY DETECTED";
    playAlert();
  },11000);

  /* END */
  setTimeout(()=>{
    clearInterval(loop);
    document.body.innerHTML=
    "<h1 style='color:red;text-align:center;margin-top:40%'>SYSTEM BREACHED (SIMULATION)</h1>";
  },15000);
}

/* ---------- START BUTTON ---------- */
startBtn.addEventListener("click",()=>{
  bootScreen.style.display="none";
  startImmersion();
  startSimulation();
});
