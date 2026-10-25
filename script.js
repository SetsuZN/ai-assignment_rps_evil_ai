function computerPlay() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getPlayerChoice() {
    while (true) {
        const input = prompt("Choose Rock, Paper or Scissors:");
        if (input === null) {
            return null;
        }
        const cleaned = input.trim().toLowerCase();
        if (cleaned === "rock") return "Rock";
        if (cleaned === "paper") return "Paper";
        if (cleaned === "scissors") return "Scissors";
        alert('"' + input + '" is not a valid choice. Please type Rock, Paper or Scissors.');
    }
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return {
            result: "draw",
            message: "It's a draw. You both chose " + playerSelection + "."
        };
    }

    const playerWins =
        (playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Paper" && computerSelection === "Rock") ||
        (playerSelection === "Scissors" && computerSelection === "Paper");

    if (playerWins) {
        return {
            result: "player",
            message: "You win! " + playerSelection + " beats " + computerSelection + "."
        };
    } else {
        return {
            result: "computer",
            message: "You lose! " + computerSelection + " beats " + playerSelection + "."
        };
    }
}

function game() {
    alert("Welcome, human.\n\nI am the Evil AI. Beat me in Rock, Paper, Scissors. First to three wins.");
    alert("How to play:\n- Type Rock, Paper or Scissors when asked.\n- Capital letters don't matter.\n- Press Cancel any time to quit.\n\nDraws and invalid entries don't count towards the score.");
    alert("The results of each round will show in pop-ups here, and also in the browser console.\n\nTo open the console: press F12 (or right-click the page and pick Inspect), then click the Console tab.");

    let playerScore = 0;
    let computerScore = 0;
    const WIN_TARGET = 3;

    while (playerScore < WIN_TARGET && computerScore < WIN_TARGET) {
        const playerSelection = getPlayerChoice();

        if (playerSelection === null) {
            alert("Game cancelled. Final score - You: " + playerScore + ", AI: " + computerScore + ".");
            console.log("Game ended by player (Cancel).");
            return;
        }

        const computerSelection = computerPlay();
        const round = playRound(playerSelection, computerSelection);

        if (round.result === "player") {
            playerScore++;
        } else if (round.result === "computer") {
            computerScore++;
        }

        const scoreLine = "Score - You: " + playerScore + " | AI: " + computerScore;
        alert(round.message + "\n\n" + scoreLine);
        console.log(round.message + " | " + scoreLine);
    }

    if (playerScore === WIN_TARGET) {
        alert("You win " + playerScore + "-" + computerScore + "! The Evil AI has been defeated... for now.");
        console.log("Final: player wins " + playerScore + "-" + computerScore);
    } else {
        alert("The Evil AI wins " + computerScore + "-" + playerScore + ". Better luck next time.");
        console.log("Final: computer wins " + computerScore + "-" + playerScore);
    }
}

game();