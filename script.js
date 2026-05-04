let boot=document.getElementById("boot");
let overlay=document.getElementById("overlay");

let logs=document.getElementById("logs");
let ai=document.getElementById("ai");
let alerts=document.getElementById("alerts");

let cameraBox=document.getElementById("cameraBox");
let mapBox=document.getElementById("mapBox");
let chatBox=document.getElementById("chatBox");
let chatMessages=document.getElementById("chatMessages");

let startBtn=document.getElementById("startBtn");

let beep=document.getElementById("beep");
let alertSound=document.getElementById("alert");

/* ================= MATRIX ================= */
let c=document.getElementById("matrix");
let ctx=c.getContext("2d");

c.width=window.innerWidth;
c.height=window.innerHeight;

let chars="01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%";
let drops=Array(150).fill(1);

function drawMatrix(){
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
setInterval(drawMatrix,40);

/* ================= TYPE ================= */
function type(text){
  let d=document.createElement("div");
  logs.appendChild(d);

  let i=0;
  let t=setInterval(()=>{
    d.innerHTML+=text[i];
    i++;
    if(i>=text.length) clearInterval(t);
    logs.scrollTop=logs.scrollHeight;
  },15);
}

/* ================= SOUND SAFE ================= */
function beepPlay(){
  try{
    beep.currentTime=0;
    beep.play();
  }catch(e){}
}

function alertPlay(){
  try{
    alertSound.currentTime=0;
    alertSound.play();
  }catch(e){}
}

/* ================= SAFE START ================= */
function startSystem(){
  boot.style.display="none";
  overlay.style.display="block";
  document.body.style.overflow="hidden";
}

/* ================= FLOW ================= */
let flow=[
  "Booting AI...",
  "Scanning system...",
  "Access granted...",
  "Bypassing security...",
  "Injecting module...",
  "Reading memory..."
];

/* ================= MAIN ================= */
function run(){

  let i=0;

  let loop=setInterval(()=>{
    if(i<flow.length){
      type("> "+flow[i]);
      ai.innerText="AI: "+flow[i];
      beepPlay();
      i++;
    }
  },900);

  setTimeout(()=>{
    cameraBox.classList.remove("hidden");
    document.getElementById("cameraFeed").innerText="Face scan complete";
  },4000);

  setTimeout(()=>{
    mapBox.classList.remove("hidden");
    document.getElementById("mapText").innerText="Location locked";
  },7000);

  setTimeout(()=>{
    chatBox.classList.remove("hidden");

    let msgs=["Hello","System active","Monitoring ON","No escape"];

    let j=0;
    let t=setInterval(()=>{
      let d=document.createElement("div");
      d.innerText="AI: "+msgs[j];
      chatMessages.appendChild(d);
      j++;
      if(j>=msgs.length) clearInterval(t);
    },1200);

  },9000);

  setTimeout(()=>{
    alerts.innerText="⚠ SYSTEM UNDER CONTROL";
    alertPlay();
  },11000);

  setTimeout(()=>{
    clearInterval(loop);
    document.body.innerHTML=
    "<h1 style='color:red;text-align:center;margin-top:40%'>SYSTEM BREACHED</h1>";
  },15000);
}

/* ================= FIXED START ================= */
startBtn.onclick=()=>{
  startSystem();
  run();
};

/* ================= AUTO FIX (prevents freeze) ================= */
setTimeout(()=>{
  if(boot.style.display!=="none"){
    boot.style.display="none";
    overlay.style.display="block";
  }
},2500);
