let overlay=document.getElementById("overlay");
let boot=document.getElementById("boot");

let logs=document.getElementById("logs");
let ai=document.getElementById("ai");
let alerts=document.getElementById("alerts");

let cameraBox=document.getElementById("cameraBox");
let mapBox=document.getElementById("mapBox");
let chatBox=document.getElementById("chatBox");
let chatMessages=document.getElementById("chatMessages");

let beep=document.getElementById("beep");
let alertSound=document.getElementById("alert");

let startBtn=document.getElementById("startBtn");

/* ---------- MATRIX ---------- */
let c=document.getElementById("matrix");
let ctx=c.getContext("2d");

c.width=window.innerWidth;
c.height=window.innerHeight;

let chars="01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%";
let drops=Array(200).fill(1);

function matrix(){
  ctx.fillStyle="rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,c.width,c.height);

  ctx.fillStyle="#00ff00";
  ctx.font="14px monospace";

  for(let i=0;i<drops.length;i++){
    let text=chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text,i*10,drops[i]*10);

    if(drops[i]*10>c.height) drops[i]=0;
    drops[i]++;
  }
}
setInterval(matrix,40);

/* ---------- TYPE ---------- */
function type(t){
  let d=document.createElement("div");
  logs.appendChild(d);

  let i=0;
  let x=setInterval(()=>{
    d.innerHTML+=t[i];
    i++;
    if(i>=t.length) clearInterval(x);
    logs.scrollTop=logs.scrollHeight;
  },20);
}

/* ---------- SOUND ---------- */
function beepSound(){
  beep.currentTime=0;
  beep.play().catch(()=>{});
}

function alertS(){
  alertSound.currentTime=0;
  alertSound.play().catch(()=>{});
}

/* ---------- START IMMERSION ---------- */
function start(){
  overlay.style.display="block";
  document.body.style.overflow="hidden";
}

/* ---------- FLOW ---------- */
let flow=[
  "Booting AI...",
  "Scanning device...",
  "Access granted...",
  "Bypassing security...",
  "Injecting module...",
  "Reading system..."
];

/* ---------- MAIN ---------- */
function run(){

  let i=0;

  let loop=setInterval(()=>{
    if(i<flow.length){
      type("> "+flow[i]);
      ai.innerText="AI: "+flow[i];
      beepSound();
      i++;
    }
  },1000);

  /* camera */
  setTimeout(()=>{
    cameraBox.classList.remove("hidden");
    document.getElementById("cameraFeed").innerText="Face scan complete";
  },4000);

  /* map */
  setTimeout(()=>{
    mapBox.classList.remove("hidden");
    document.getElementById("mapText").innerText="Location locked (sim)";
  },7000);

  /* chat */
  setTimeout(()=>{
    chatBox.classList.remove("hidden");

    let msg=["Hello","System accessed","Monitoring active","No escape"];

    let j=0;
    let t=setInterval(()=>{
      let d=document.createElement("div");
      d.innerText="AI: "+msg[j];
      chatMessages.appendChild(d);
      j++;
      if(j>=msg.length) clearInterval(t);
    },1200);

  },9000);

  /* alert */
  setTimeout(()=>{
    alerts.innerText="⚠ SYSTEM UNDER CONTROL";
    alertS();
  },11000);

  /* end */
  setTimeout(()=>{
    clearInterval(loop);
    document.body.innerHTML=
    "<h1 style='color:red;text-align:center;margin-top:40%'>SYSTEM BREACHED</h1>";
  },15000);
}

/* ---------- START BUTTON ---------- */
startBtn.onclick=()=>{
  boot.style.display="none";
  start();
  run();
};
