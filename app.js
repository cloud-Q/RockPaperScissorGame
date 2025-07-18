let userScore = 0, compScore = 0, drawScore = 0;

const choices      = document.querySelectorAll(".choice");
const userScoreEl  = document.getElementById("user-score");
const compScoreEl  = document.getElementById("comp-score");
const drawScoreEl  = document.getElementById("draw-score");

const playArea     = document.getElementById("play-area");
const userImg      = document.getElementById("user-img");
const compSpinner  = document.getElementById("comp-spinner");
const compImg      = document.getElementById("comp-img");

const resultCard   = document.getElementById("result-card");
const resultTextEl = document.getElementById("result-text");

let gamesPlayed = 0;
const gameCountEl = document.getElementById("game-count");


// get a random choice
const genCompChoice = () => ["rock","paper","scissors"][Math.floor(Math.random()*3)];

// apply result‑card color
function colorResultCard(text) {
  if (text.includes("Win"))      resultCard.style.background = "#d4edda";
  else if (text.includes("Lose")) resultCard.style.background = "#f8d7da";
  else                             resultCard.style.background = "#fff";
}

// update score counters & return message with emoji
function decideOutcome(user, comp) {
  if (user === comp) {
    drawScoreEl.innerText = ++drawScore;
    return "It's a Draw! 😐";
  }
  const win = (
    (user==="rock"     && comp==="scissors") ||
    (user==="paper"    && comp==="rock")     ||
    (user==="scissors" && comp==="paper")
  );
  if (win) {
    userScoreEl.innerText = ++userScore;
    return "You Win! 🎉";
  } else {
    compScoreEl.innerText = ++compScore;
    return "You Lose! 😢";
  }
}

// reset to initial state
function resetUI() {
  playArea.hidden = false; // keep play area visible at all times

  userImg.src = "images/default.png";
  compImg.src = "images/default.png";
  compImg.hidden = false;
  compSpinner.hidden = true;

  resultTextEl.innerText = "Pick your choice! 🤔";
  colorResultCard(resultTextEl.innerText);
}

// main click handler
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;

    // show duel box
    userImg.src            = `images/${userChoice}.png`;
    compImg.hidden         = true;
    compSpinner.hidden     = false;
    playArea.hidden        = false;
    resultTextEl.hidden    = false;

    // after 1s, reveal computer and decide
    setTimeout(() => {
      const compChoice = genCompChoice();
      compImg.src        = `images/${compChoice}.png`;
      compSpinner.hidden = true;
      compImg.hidden     = false;

      const outcome = decideOutcome(userChoice, compChoice);
      resultTextEl.innerText = outcome;
      colorResultCard(outcome);

      gamesPlayed++;
  gameCountEl.innerText = `Games Played: ${gamesPlayed}`;

      // auto‑reset after 2s
      setTimeout(resetUI, 2000);
    }, 1000);
  });
});

// initialize
resetUI();
