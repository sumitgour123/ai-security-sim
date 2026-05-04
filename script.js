let boot=document.getElementById("boot");
let overlay=document.getElementById("overlay");

let logs=document.getElementById("logs");
let ai=document.getElementById("ai");
let alerts=document.getElementById("alerts");

let cameraBox=document.getElementById("cameraBox");
let mapBox=document.getElementById("mapBox");
let chatBox=document.getElementById("chatBox");
let chatMessages=document.getElementById("chatMessages");

let radarBox=document.getElementById("radarBox");

let startBtn=document.getElementById("startBtn");

let beep=document.getElementById("beep");
let alertSound=document.getElementById("alert");

/* ===== MATRIX ===== */
let c=document.getElementById("matrix");
let ctx=c.getContext("2d");

c.width=window.innerWidth;
c.height=window.innerHeight;

let chars="01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%";
let drops=Array(150).fill(1);

function matrix(){
  ctx.fillStyle="rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,c.width,c.height);

  ctx.fillStyle="#00ff00";
  ctx.font="14px monospace";

  for(let i=0;i<drops.length;i++){
    let t=chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(t,i*10,drops[i]*10);
    if(drops[i]*10>c.height) drops[i]=0;
    drops[i]++;
  }
}
setInterval(matrix,40);

/* ===== RADAR ===== */
let rc=document.getElementById("radarCanvas");
let rctx=rc.getContext("2d");

rc.width=200;
rc.height=200;

let angle=0;

function radar(){
  rctx.fillStyle="rgba(0,0,0,0.2)";
  rctx.fillRect(0,0,200,200);

  rctx.strokeStyle="#00ff00";
  rctx.beginPath();
  rctx.arc(100,100,90,0,Math.PI*2);
  rctx.stroke();

  let x=100+Math.cos(angle)*90;
  let y=100+Math.sin(angle)*90;

  rctx.beginPath();
  rctx.moveTo(100,100);
  rctx.lineTo(x,y);
  rctx.stroke();

  angle+=0.05;

  requestAnimationFrame(radar);
}
radar();

/* ===== TYPE ===== */
function type(t){
  let d=document.createElement("div");
  logs.appendChild(d);

  let i=0;
  let x=setInterval(()=>{
    d.innerHTML+=t[i];
    i++;
    if(i>=t.length) clearInterval(x);
    logs.scrollTop=logs.scrollHeight;
  },15);
}

/* ===== SOUND ===== */
function unlock(){
  beep.play().then(()=>{
    beep.pause();
    beep.currentTime=0;
  }).catch(()=>{});
}

function beepPlay(){
  beep.currentTime=0;
  beep.play().catch(()=>{});
}

function alertPlay(){
  alertSound.currentTime=0;
  alertSound.play().catch(()=>{});
}

/* ===== FULLSCREEN ===== */
function fs(){
  let e=document.documentElement;
  if(e.requestFullscreen) e.requestFullscreen();
}

/* ===== START ===== */
function start(){
  boot.style.display="none";
  overlay.style.display="block";
}

/* ===== FLOW ===== */
let flow=[
  "Booting AI core...",
  "Scanning system...",
  "⚠ Unusual activity detected...",
  "...",
  "Access attempt detected..."
];

function run(){

  let i=0;

  function step(){
    if(i<flow.length){
      type("> "+flow[i]);
      ai.innerText="AI: "+flow[i];
      beepPlay();

      let d=800;
      if(flow[i].includes("...")) d=2000;
      if(flow[i].includes("⚠")) d=2500;

      i++;
      setTimeout(step,d);
    }
  }
  step();

  setTimeout(()=>cameraBox.classList.remove("hidden"),4000);
  setTimeout(()=>mapBox.classList.remove("hidden"),6000);
  setTimeout(()=>radarBox.classList.remove("hidden"),7000);

  setTimeout(()=>{
    chatBox.classList.remove("hidden");
    let m=document.createElement("div");
    m.innerText="AI: Are you the owner?";
    chatMessages.appendChild(m);
  },8000);

  setTimeout(()=>{
    alerts.innerText="🚨 BREACH DETECTED";
    alertPlay();
  },10000);

  setTimeout(()=>{
    document.body.innerHTML="<h1 style='color:red;text-align:center;margin-top:40%'>SYSTEM BREACHED</h1>";
    setTimeout(()=>{
      document.body.innerHTML="<h1 style='color:lime;text-align:center;margin-top:40%'>😄 Simulation Complete</h1>";
    },3000);
  },14000);
}

/* ===== BUTTON ===== */
startBtn.onclick=()=>{
  fs();
  unlock();
  start();
  run();
};

/* ===== AUTO FIX ===== */
setTimeout(()=>{
  if(boot.style.display!=="none"){
    boot.style.display="none";
    overlay.style.display="block";
  }
},2500);
