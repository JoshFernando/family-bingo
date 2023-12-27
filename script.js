class BingoGame {
    constructor() {
        this.allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
        this.calledNumbers = {
            B: [], I: [], N: [], G: [], O: []
        };
    }

    nextNumber() {
        let availableNumbers = this.allNumbers.filter(num => 
            !Object.values(this.calledNumbers).flat().includes(num)
        );
        if (availableNumbers.length === 0) {
            alert("All numbers have been called. Restarting the game.");
            this.restart();
            return;
        }
        let randomIndex = Math.floor(Math.random() * availableNumbers.length);
        let nextNum = availableNumbers[randomIndex];
        let letter = this.getLetter(nextNum);
        this.calledNumbers[letter].push(nextNum);
        this.calledNumbers[letter].sort((a, b) => a - b); // Sort the numbers in ascending order
        return { letter, number: nextNum };
    }

    restart() {
        this.calledNumbers = { B: [], I: [], N: [], G: [], O: [] };
    }

    getLetter(number) {
        if (number <= 15) return 'B';
        if (number <= 30) return 'I';
        if (number <= 45) return 'N';
        if (number <= 60) return 'G';
        if (number <= 75) return 'O';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new BingoGame();
    const lastCalledDisplay = document.getElementById('lastCalled');
    const calledNumbersDisplay = document.getElementById('calledNumbers');
    const nextNumberBtn = document.getElementById('nextNumber');
    const restartBtn = document.getElementById('restartGame');
    const modeToggleBtn = document.getElementById('modeToggle');

    nextNumberBtn.addEventListener('click', () => {
        let { letter, number } = game.nextNumber();
        if (number) {
            lastCalledDisplay.textContent = `Last Called: ${letter}${number}`;
            // Update display with each category on a new line
            calledNumbersDisplay.innerHTML = Object.entries(game.calledNumbers)
                .map(([letter, numbers]) => `<strong>${letter}:</strong> ${numbers.join(', ')}`)
                .join('<br>');
            // Play sound
            new Audio('number-call.mp3').play(); // Ensure 'number-call.mp3' is available
        }
    });

    restartBtn.addEventListener('click', () => {
        game.restart();
        lastCalledDisplay.textContent = 'Last Called: None';
        calledNumbersDisplay.textContent = 'Called Numbers: None';
    });

    modeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
