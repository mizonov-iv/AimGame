const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const buttons = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');
const colors = ['#ff0000', '#ff9100', '#f6ff00', '#40ff00', '#00ff80', '#00ffff', '#006aff', '#0400ff', '#9000ff', '#f200ff', '#ff009d'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

buttons.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList. contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }    
});

function startGame() {
    screens[1].classList.add('up');
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    timeEl.innerHTML = `00:${time}`;
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
    if (current < 10) {
        current = `0${current}`;
    }
    timeEl.innerHTML = `00:${current}`;
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}