let step = 1;

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>{
    s.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function nextScreen(){
  showScreen("s2");
  runScan();
}

/* SCAN ANIMATION */
function runScan(){
  let log = document.getElementById("log2");

  let lines = [
    "Scanning IP...",
    "Checking ports...",
    "Analyzing system...",
    "Detecting threats...",
    "Bypassing fake alerts..."
  ];

  let i = 0;

  let interval = setInterval(()=>{
    if(i < lines.length){
      log.innerHTML += lines[i] + "<br>";
      i++;
    }else{
      clearInterval(interval);
      setTimeout(threatAnalysis, 1000);
    }
  }, 700);
}

/* ANALYSIS SCREEN */
function threatAnalysis(){
  showScreen("s3");

  let log = document.getElementById("log3");

  let data = [
    "AI processing data...",
    "Cross-checking database...",
    "Risk calculation...",
    "Finalizing report..."
  ];

  let i = 0;

  let interval = setInterval(()=>{
    if(i < data.length){
      log.innerHTML += data[i] + "<br>";
      i++;
    }else{
      clearInterval(interval);
      setTimeout(()=>{
        showScreen("s4");
      }, 1200);
    }
  }, 700);
}

/* SAFETY FIX */
window.onload = ()=>{
  document.body.style.overflow = "hidden";
};
