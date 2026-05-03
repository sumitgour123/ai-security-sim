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

// RANDOM ACTIONS
let actions = [
  "Decrypting node...",
  "Bypassing firewall...",
  "Injecting payload...",
  "Accessing root...",
  "Tracking IP...",
  "Reading memory..."
];

// TYPING EFFECT
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

// VOICE
function speak(text){
  let speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.9;
  speech.pitch = 0.8;
  speechSynthesis.speak(speech);
}

// MAIN START
function start(){

  document.documentElement.requestFullscreen();

  let count = 0;

  let main = setInterval(()=>{

    let act = actions[Math.floor(Math.random()*actions.length)];
    type("> "+act);

    ai.innerHTML = "AI analyzing: "+act;

    if(Math.random()>0.7){
      alerts.innerHTML = "⚠ Suspicious activity detected";
    }

    // GLITCH
    if(Math.random()>0.8){
      document.body.classList.add("glitch");
      setTimeout(()=>document.body.classList.remove("glitch"),200);
    }

    // MID ALERT
    if(count==15){
      alerts.innerHTML = "🚨 DEVICE UNDER AI SURVEILLANCE";
      speak("Warning. Your device is being analyzed.");
    }

    // END
    if(count>22){
      clearInterval(main);
      type("❌ SYSTEM COMPROMISED (SIMULATION)");
      speak("Simulation complete");
    }

    count++;

  },1000);
}

// BUTTON EVENT
startBtn.addEventListener("click", start);
