let betInput = document.getElementById("betInput");
let currentBet = document.getElementById("currentBet");

let rewardX;
let betValue;

function placeBet() {
  betValue = parseInt(betInput.value);
  console.log("betValue:", betValue);
  currentBet.innerHTML = betValue.toString();
  console.log("currentBet.innerHTML:", currentBet.innerHTML);
}

function play() {
  if (betValue < 1) {
    alert("Please enter correct value!");
  } else {
  removeMoney(parseInt(currentBet.innerHTML));
  }
}

function reward(multiplier) {
  let tempMoney;
  tempMoney = betValue * multiplier;
  topUp(tempMoney);
}

const sectors = [
    { color: "red", text: "#333333", label: "0x" },
    { color: "yellow", text: "#333333", label: "2x" },
    { color: "red", text: "#333333", label: "0x" },
    { color: "white", text: "#333333", label: "1x" },
    { color: "red", text: "#333333", label: "0x" },
    { color: "green", text: "#333333", label: "10x" },
    { color: "red", text: "#333333", label: "0x" },
    { color: "white", text: "#333333", label: "1x" },
    { color: "red", text: "#333333", label: "0x" },
    { color: "yellow", text: "#333333", label: "2x" },
  ];
  
  const events = {
    listeners: {},
    addListener: function (eventName, fn) {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(fn);
    },
    fire: function (eventName, ...args) {
      if (this.listeners[eventName]) {
        for (let fn of this.listeners[eventName]) {
          fn(...args);
        }
      }
    },
  };
  
  const rand = (m, M) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const spinEl = document.querySelector("#spin");
  const ctx = document.querySelector("#wheel").getContext("2d");
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;
  
  const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  let angVel = 0; // Angular velocity
  let ang = 0; // Angle in radians
  
  let spinButtonClicked = false;
  
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;
  
  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
  
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
  
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 20px 'Lato', sans-serif";
    ctx.fillText(sector.label, rad - 10, 10);
    //
  
    ctx.restore();
  }
  
  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  
    spinEl.textContent = !angVel ? "SPIN" : sector.label;
    spinEl.style.background = sector.color;
    spinEl.style.color = sector.text;
  }
  
  function frame() {
    // Fire an event after the wheel has stopped spinning
    if (!angVel && spinButtonClicked) {
      const finalSector = sectors[getIndex()];
      events.fire("spinEnd", finalSector);
      spinButtonClicked = false; // reset the flag
      return;
    }
  
    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }
  
  function engine() {
    frame();
    requestAnimationFrame(engine);
  }
  
  function init() {
    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.45);
      spinButtonClicked = true;
    });
  }
  
  init();
  
  events.addListener("spinEnd", (sector) => {
    console.log(`Output: ${sector.label}`);
    if (Number.isNaN(parseInt(sector.label))) {
      console.log(0);
      rewardX = 0;
    } else {
      console.log(parseInt(sector.label));
      rewardX = parseInt(sector.label);
      reward(rewardX);
    }
  });
  