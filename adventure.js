function askChoice(message, validOptions) {
    while (true) {
        const input = prompt(message);
        if (input === null) return null;
        const cleaned = input.trim();
        if (validOptions.includes(cleaned)) return cleaned;
        alert('"' + input + '" is not a valid option. Please type one of: ' + validOptions.join(", ") + ".");
    }
}

function offerRestart() {
    const again = confirm("Play again? Your progress will be reset.");
    if (again) {
        startAdventure();
    } else {
        alert("Thanks for playing. The AI will be back...");
    }
}

function startAdventure() {
    alert("Escape the Evil AI\n\nYou wake up in a cold digital cell. A voice echoes around you:\n\"You'll never leave, human!\"");
    alert("How to play:\n- Type the number of the choice you want.\n- Press Cancel any time to quit.\n- Explore the rooms, pick things up, and use them to escape.\n\nYour progress is also printed in the browser console (press F12 and open the Console tab).");

    let hasKey = false;
    let foundCode = false;
    let currentRoom = "cell";

    while (true) {
        if (currentRoom === "cell") {
            const choice = askChoice(
                "You are in your CELL.\n\nWhat do you do?\n1) Search under the bed\n2) Try the door\n3) Look at the wall",
                ["1", "2", "3"]
            );

            if (choice === null) {
                alert("You gave up. The AI cackles forever.");
                return offerRestart();
            }

            if (choice === "1") {
                if (!hasKey) {
                    hasKey = true;
                    alert("You find a rusty KEY under the bed. You pick it up.");
                    console.log("Item acquired: Rusty Key");
                } else {
                    alert("You already searched here. Nothing new.");
                }
            } else if (choice === "2") {
                if (hasKey) {
                    alert("You unlock the door with the rusty key and slip into the corridor.");
                    currentRoom = "corridor";
                } else {
                    alert("The door is locked. You need a key.");
                }
            } else if (choice === "3") {
                if (!foundCode) {
                    foundCode = true;
                    alert("Someone scratched a message into the wall: THE CODE IS 042");
                    console.log("Clue noted: code = 042");
                } else {
                    alert("You already read the code on the wall.");
                }
            }

        } else if (currentRoom === "corridor") {
            const choice = askChoice(
                "You are in the CORRIDOR.\n\nTwo doors. What now?\n1) Go back to the cell\n2) Enter the Control Room",
                ["1", "2"]
            );

            if (choice === null) {
                alert("You wander the corridor forever. The AI wins.");
                return offerRestart();
            }

            if (choice === "1") {
                alert("You go back to your cell. You still have everything you picked up.");
                currentRoom = "cell";
            } else if (choice === "2") {
                alert("You step into the glowing Control Room.");
                currentRoom = "control";
            }

        } else if (currentRoom === "control") {
            const choice = askChoice(
                "You are in the CONTROL ROOM.\n\nA big terminal blinks. The exit door is sealed.\n1) Type the code into the terminal\n2) Smash the terminal\n3) Run for the exit",
                ["1", "2", "3"]
            );

            if (choice === null) {
                alert("You freeze in the Control Room. The AI wins.");
                return offerRestart();
            }

            if (choice === "1") {
                if (foundCode) {
                    alert("You type 042 into the terminal. The exit door slides open. You escape!\n\nYou win.");
                    console.log("Ending: escape successful.");
                } else {
                    alert("You don't know any code. The terminal beeps angrily.");
                }
            } else if (choice === "2") {
                alert("The terminal sparks and locks down the whole room. The AI laughs.\n\nGame over.");
                console.log("Ending: failure (smashed terminal).");
                return offerRestart();
            } else if (choice === "3") {
                alert("The exit is electronically locked. You needed the code.\n\nGame over.");
                console.log("Ending: failure (ran for exit without code).");
                return offerRestart();
            }
        }
    }
}

const startBonus = confirm("You survived Rock, Paper, Scissors.\n\nDo you dare enter the Evil AI's digital fortress?");
if (startBonus) {
    startAdventure();
} else {
    alert("The AI respects your caution. You live another day.");
}