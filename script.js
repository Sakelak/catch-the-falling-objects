const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreBoard = document.getElementById('score-board');

let score = 0;
let basketPosition = 160;
let gameInterval;

document.addEventListener('keydown', moveBasket);

function moveBasket(event) {
    if (event.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 20;
    } else if (event.key === 'ArrowRight' && basketPosition < 320) {
        basketPosition += 20;
    }
    basket.style.left = basketPosition + 'px';
}

function createFallingObject() {
    const object = document.createElement('div');
    object.classList.add('falling-object');
    object.style.left = Math.floor(Math.random() * 380) + 'px';
    gameContainer.appendChild(object);
    moveFallingObject(object);
}

function moveFallingObject(object) {
    let position = 0;
    const fallInterval = setInterval(() => {
        if (position >= 580) {
            clearInterval(fallInterval);
            gameContainer.removeChild(object);
            if (parseInt(object.style.left) > basketPosition - 20 && parseInt(object.style.left) < basketPosition + 80) {
                score++;
                scoreBoard.textContent = 'Score: ' + score;
                if (score === 10) {
                    clearInterval(gameInterval);
                    alert('You win!');
                }
            }
        } else {
            position += 4;
            object.style.top = position + 'px';
        }
    }, 20);
}

function startGame() {
    gameInterval = setInterval(createFallingObject, 1000);
}

startGame();
