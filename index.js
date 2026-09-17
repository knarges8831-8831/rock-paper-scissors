const choices = {
    rock: { emoji: '✊', name: 'سنگ', beats: 'scissors' },
    paper: { emoji: '✋', name: 'کاغذ', beats: 'rock' },
    scissors: { emoji: '✌️', name: 'قیچی', beats: 'paper' }
};

const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const drawScoreEl = document.getElementById('drawScore');
const choicesDisplay = document.getElementById('choicesDisplay');
const messageEl = document.getElementById('message');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('resetBtn');

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let roundInProgress = false;

function getComputerChoice() {
    const keys = Object.keys(choices);
    return keys[Math.floor(Math.random() * keys.length)];
}

function playRound(playerChoice) {
    if (roundInProgress) return;
    roundInProgress = true;

    choiceButtons.forEach(btn => btn.disabled = true);

    const computerChoice = getComputerChoice();

    // انیمیشن کوتاه
    let count = 0;
    const interval = setInterval(() => {
        choicesDisplay.textContent = '❔ ❔';
        count++;
        if (count > 3) {
            clearInterval(interval);
            showResult(playerChoice, computerChoice);
        }
    }, 100);
}

function showResult(playerChoice, computerChoice) {
    const player = choices[playerChoice];
    const computer = choices[computerChoice];

    choicesDisplay.textContent = `${player.emoji}  ${computer.emoji}`;

    let message = '';
    let className = '';

    if (playerChoice === computerChoice) {
        drawScore++;
        message = 'مساوی! 🤝';
        className = 'draw';
    } else if (player.beats === computerChoice) {
        playerScore++;
        message = 'بردی! 🎉';
        className = 'win';
    } else {
        computerScore++;
        message = 'باختی! 😢';
        className = 'lose';
    }

    messageEl.textContent = message;
    messageEl.className = 'message ' + className;

    updateScores();

    setTimeout(() => {
        roundInProgress = false;
        choiceButtons.forEach(btn => btn.disabled = false);
    }, 800);
}

function updateScores() {
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    drawScoreEl.textContent = drawScore;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    roundInProgress = false;
    updateScores();
    choicesDisplay.textContent = '❔ ❔';
    messageEl.textContent = 'انتخاب کن!';
    messageEl.className = 'message';
    choiceButtons.forEach(btn => btn.disabled = false);
}

choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => playRound(btn.dataset.choice));
});

resetBtn.addEventListener('click', resetGame);
