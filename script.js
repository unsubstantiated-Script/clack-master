const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';


//Focus on text on start...
text.focus();

const timeInterval = setInterval(updateTime, 1000);



async function getWord(werd) {
    const res = await fetch(`https://random-word-api.herokuapp.com/word?number=1&swear=0`);
    const data = await res.json();
    werd = data.toString()
    return werd
}

async function addWordToDOM() {
    randomWord = await getWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + ' s';

    if (time === 0) {
        clearInterval(timeInterval);

        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Restart</button>
    `;

    endgameEl.style.display = "flex";
}


addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;


    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        e.target.value = '';

        if (difficulty === 'hard') {
            time += 3;
        } else if (difficulty === 'medium') {
            time += 4;
        } else {
            time += 6;
        }

        updateTime();
    }

})



settingsBtn.addEventListener('click', () => settings.classList.toggle('show'));

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})