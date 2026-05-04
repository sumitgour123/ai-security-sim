/* ---------- FULLSCREEN ---------- */
function full(){
  try{
    document.documentElement.requestFullscreen();
  }catch(e){}
}

/* ---------- SAFE SOUND ---------- */
let ctx = null;

function beep(freq, time){
  try{
    if(!ctx){
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    let o = ctx.createOscillator();
    let g = ctx.createGain();

    o.connect(g);
    g.connect(ctx.destination);

    o.frequency.value = freq;
    o.type = "square";

    o.start();
    setTimeout(()=>o.stop(), time);

  }catch(e){}
}

/* ---------- SCREEN SWITCH ---------- */
function show(id){
  document.querySelectorAll(".screen").forEach(s=>{
    s.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

/* ---------- START ---------- */
function startSim(){
  full();
  show("s2");
  scan();
}

/* ---------- SCAN ---------- */
function scan(){
  let log = document.getElementById("log2");

  let steps = [
    "Connecting to system...",
    "Bypassing firewall...",
    "Scanning ports...",
    "Analyzing network...",
    "Injecting AI probe..."
  ];

  let i = 0;

  let t = setInterval(()=>{
    if(i < steps.length){
      log.innerText += ">> " + steps[i] + "\n";
      beep(500, 40);
      i++;
    }else{
      clearInterval(t);
      setTimeout(analysis, 900);
    }
  }, 750);
}

/* ---------- ANALYSIS ---------- */
function analysis(){
  show("s3");

  let log = document.getElementById("log3");

  let data = [
    "AI processing data...",
    "Checking global DB...",
    "Security level: MEDIUM",
    "Mapping vulnerabilities..."
  ];

  let i = 0;

  let t = setInterval(()=>{
    if(i < data.length){
      log.innerText += ">> " + data[i] + "\n";
      beep(600, 50);
      i++;
    }else{
      clearInterval(t);
      setTimeout(result, 1000);
    }
  }, 750);
}

/* ---------- RESULT ---------- */
function result(){
  show("s4");

  let log = document.getElementById("log4");

  document.body.classList.add("flash");
  beep(150, 250);

  log.innerText =
`MISSION COMPLETE

✔ No threat detected
✔ Firewall ACTIVE
✔ AI Protection ON

STATUS: SAFE`;

  setTimeout(()=>{
    document.body.classList.remove("flash");
  }, 2000);
}
