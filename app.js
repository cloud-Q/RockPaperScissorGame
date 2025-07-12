let userScore = 0;
let compScore = 0;
let drawScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScoreVal = document.querySelector("#user-score");
const CompScoreVal = document.querySelector("#comp-score");
const DrawScoreVal = document.querySelector("#draw-score");

const genCompChoice = () =>{
    const options = ["rock", "paper", "scissors"];
    const randonIndx = Math.floor(Math.random() * 3);
    return options[randonIndx];
}

const drawGame = () => {
    console.log("game was a draw.");
    msg.innerText = "Game Draw. PLay Again";
    msg.style.backgroundColor = "#081b31";
    drawScore++;
    DrawScoreVal.innerText = drawScore;
}

const showWinner = (userWin) => {
    if(userWin) {
        console.log("you win!.");
        msg.innerText = "You Win";
        msg.style.backgroundColor = "green";
        userScore++;
        userScoreVal.innerText = userScore;

    }
    else{
        console.log("you loose!");
        msg.innerText = "You loose!";
        msg.style.backgroundColor = "red";
        compScore++;
        CompScoreVal.innerText = compScore;
    }
}

const playGame = (userChoice) => {
    console.log("userChoice = ", userChoice );

    const compChoice = genCompChoice();
    console.log("comp choice = ", compChoice);

    if(userChoice === compChoice){
        // draw game
        drawGame();
    }

    else {
        let userWin = true;
        if(userChoice === "rock"){
            //scissors, paper
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            //scissors, stone
            userWin = compChoice === "scissors" ? false : true;
        }
        else{
            //rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
    showWinner(userWin);
    }

};

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", ()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});