const words = ['javascript', 'hangman', 'coding', 'programming', 'developer'];
let chosenWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const wordDisplay = document.getElementById('word-display');
const wrongGuessesDisplay = document.getElementById('wrong-guesses');
const alphabetButtons = document.getElementById('alphabet-buttons');
const message = document.getElementById('message');
const hangmanCanvas = document.getElementById('hangman-canvas');
const context = hangmanCanvas.getContext('2d');

document.addEventListener('keydown', (event) => {
    const letter = event.key.toLowerCase();
    if (/[a-z]/.test(letter) && !guessedLetters.includes(letter) && letter.length === 1) {
        handleGuess(letter);
    }
});

function initGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    updateWordDisplay();
    updateWrongGuessesDisplay();
    createAlphabetButtons();
    message.textContent = '';
    context.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    drawHangman();
}

function createAlphabetButtons() {
    alphabetButtons.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => handleGuess(letter);
        alphabetButtons.appendChild(button);
    }
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);
    if (chosenWord.includes(letter)) {
        updateWordDisplay();
        checkWin();
    } else {
        wrongGuesses++;
        updateWrongGuessesDisplay();
        drawHangman();
        checkLoss();
    }
    disableButton(letter);
}

function disableButton(letter) {
    const buttons = alphabetButtons.getElementsByTagName('button');
    for (let button of buttons) {
        if (button.textContent === letter) {
            button.disabled = true;
            button.style.backgroundColor = '#ccc';
        }
    }
}

function updateWordDisplay() {
    const display = chosenWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
    wordDisplay.textContent = display;
}

function updateWrongGuessesDisplay() {
    wrongGuessesDisplay.textContent = wrongGuesses;
}

function checkWin() {
    if (chosenWord.split('').every(letter => guessedLetters.includes(letter))) {
        message.textContent = 'Congratulations! You won!';
        disableButtons();
    }
}

function checkLoss() {
    if (wrongGuesses >= maxWrongGuesses) {
        message.textContent = `You lost! The word was ${chosenWord}.`;
        disableButtons();
    }
}

function disableButtons() {
    const buttons = alphabetButtons.getElementsByTagName('button');
    for (let button of buttons) {
        button.disabled = true;
    }
}

function drawHangman() {
    context.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    context.lineWidth = 2;
    context.strokeStyle = '#61dafb';
    context.beginPath();
    
    // Draw the gallows
    context.moveTo(10, 190);
    context.lineTo(190, 190);
    context.moveTo(50, 190);
    context.lineTo(50, 10);
    context.lineTo(120, 10);
    context.lineTo(120, 30);
    context.stroke();
    
    // Draw parts based on wrong guesses
    if (wrongGuesses > 0) { // Head
        context.beginPath();
        context.arc(120, 50, 20, 0, Math.PI * 2, true);
        context.stroke();
    }
    if (wrongGuesses > 1) { // Body
        context.moveTo(120, 70);
        context.lineTo(120, 130);
        context.stroke();
    }
    if (wrongGuesses > 2) { // Left arm
        context.moveTo(120, 90);
        context.lineTo(90, 110);
        context.stroke();
    }
    if (wrongGuesses > 3) { // Right arm
        context.moveTo(120, 90);
        context.lineTo(150, 110);
        context.stroke();
    }
    if (wrongGuesses > 4) { // Left leg
        context.moveTo(120, 130);
        context.lineTo(90, 170);
        context.stroke();
    }
    if (wrongGuesses > 5) { // Right leg
        context.moveTo(120, 130);
        context.lineTo(150, 170);
        context.stroke();
    }
}

initGame();
