// Getting reference to HTML elements
const board = document.getElementById('game-board');
const textInstruction = document.getElementById('instruction');
const textCurrentScore = document.getElementById('current-score');
const textHighScore = document.getElementById('high-score');
const instructionStandby = 'Press space to start the game';
const instructionRunning = 'Use arrow key to control the snake';
const instructionStopping = 'Game Over';

// Declaring debugging mode
const IsOnDebug = true;

// Declaring game variables
const gridSize = 20;
let gameIsRunning = false;
let gameInterval;
let gameSpeedDelay = 500;
let snake = [{x: 10, y: 10},
    {x: 10, y: 11},
    {x: 10, y: 12}];
let snakeDirection = 'up';
let food = placeFood();
let scoreCurrent = 0;
let scoreHighest = 0;

//Declaring variable for touch control
let touchInitialX;
let touchInitialY;
let touchFinalX;
let touchFinalY;

// 
function drawBoard() {
    if (IsOnDebug) {console.log('Running drawBoard function')};
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeDot = createDot('div', 'snake');
        setDotPosition(snakeDot, segment);
        board.appendChild(snakeDot);
    })
}

function drawFood() {
    const foodDot = createDot('div','food');
    setDotPosition(foodDot, food);
    board.appendChild(foodDot);
}

function createDot(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setDotPosition(dot, position) {
    dot.style.gridColumn = position.x;
    dot.style.gridRow = position.y;
}

function placeFood() {
    const x = Math.floor((Math.random() * gridSize) + 1);
    const y = Math.floor((Math.random() * gridSize) + 1);
    while (isOnCollisionBody(x,y)) {
        const x = Math.floor((Math.random() * gridSize) + 1);
        const y = Math.floor((Math.random() * gridSize) + 1);
    }
    return {x, y};
}

function increaseSnakeSpeed() {
    if (gameSpeedDelay > 300) {
        gameSpeedDelay -= 10;
    }
    else if (gameSpeedDelay > 200) {
        gameSpeedDelay -= 5
    }
    else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3
    }
    else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 1
    }
    else {
        gameSpeedDelay -= 50
    }
}

function updateScore() {
    // Updating current score text
    textCurrentScore.textContent = scoreCurrent.toString().padStart(3,'0');
    // Updating high score
    scoreHighest = Math.max(scoreHighest, scoreCurrent);
    textHighScore.textContent = scoreHighest.toString().padStart(3,'0');
}

function moveSnake() {
    if (IsOnDebug) {console.log('Running moveSnake function')};
    // Calculating new snake head position (using pointer)
    const snakeHead = { ...snake[0]};
    if (IsOnDebug) {console.log(snakeHead)}
    // const snakeHead = snake[0];
    switch (snakeDirection)
    {
        case 'left':
            snakeHead.x--;
            break;
        case 'right':
            snakeHead.x++;
            break;
        case 'up':
            snakeHead.y--;
            break;
        case 'down':
            snakeHead.y++;
            break;
    }
    if (IsOnDebug) {console.log(snakeHead)}
    // Checking for upcoming collision
    if (isOnCollisionWall(snakeHead.x,snakeHead.y) || isOnCollisionBody(snakeHead.x,snakeHead.y)) {
        if (IsOnDebug) {console.log('Wall collision detected')}
        stopGame();
    }
    else {
        // Moving snake head
        snake.unshift(snakeHead);
        // Checking for collision with food
        if (snakeHead.x === food.x && snakeHead.y === food.y)
        {
            // Updating score
            scoreCurrent++;
            updateScore();
            // Placing new food in a random location
            food = placeFood();
            // Increasing snake movement speed
            increaseSnakeSpeed()
            // Clear old interval
            clearInterval(gameInterval);
            // Creating new interval (with new snake movement speed)
            gameInterval = setInterval(() => gameLoop(), gameSpeedDelay);
        }
        else{
            snake.pop();
        }
    }
}

function isOnCollisionWall(x,y) {
    return (x < 1 || x > gridSize || y < 1 || y > gridSize)
}

function isOnCollisionBody(x,y) {
    let isOnCollision = false;
    for (let i = 1; i < snake.length; i++) {
        if (x === snake[i].x && y === snake[i].y) {
            isOnCollision = true;
        }
    }
    return isOnCollision;
}

function isSnakeOnHorizontal() {
    return (snake[0].x != snake[1].x);
}

function isSnakeOnVertical() {
    return (snake[0].y != snake[1].y);
}

function gameLoop() {
    moveSnake();
    drawBoard();
}

function startGame() {
    // Resetting game variables
    gameIsRunning = false;
    gameInterval;
    gameSpeedDelay = 200;
    snake = [{x: 10, y: 10},
        {x: 10, y: 11},
        {x: 10, y: 12}];
    snakeDirection = 'up';
    food = placeFood();
    scoreCurrent = 0;
    updateScore();
    // Staring game loop
    gameIsRunning = true;
    textInstruction.innerHTML = instructionRunning;
    gameInterval = setInterval(() => gameLoop(), gameSpeedDelay)
}

function stopGame() {
    // Stopping game loog
    gameIsRunning = false;
    textInstruction.innerHTML = instructionStopping;
    clearInterval(gameInterval);
}

// Create keypress event handler
function handleKeyPress(event) {
    // Starting the game if it is not running yet
    if ((!gameIsRunning && event.code === 'Space') || (!gameIsRunning && event.code === ' ')) {
        startGame();
    }
    // Controlling snake movement direction based on keyboard press
    else {
        switch (event.key)
        {
            case 'ArrowUp':
                if (isSnakeOnHorizontal()) {
                    snakeDirection = 'up'
                }
                break;
            case 'w':
                if (isSnakeOnHorizontal()) {
                    snakeDirection = 'up'
                }
                break;
            case 'ArrowDown':
                if (isSnakeOnHorizontal()) {
                    snakeDirection = 'down'
                }
                break;
            case 's':
                if (isSnakeOnHorizontal()) {
                    snakeDirection = 'down'
                }
                break;
            case 'ArrowLeft':
                if (isSnakeOnVertical()) {
                    snakeDirection = 'left'
                }
                break;
            case 'a':
                if (isSnakeOnVertical()) {
                    snakeDirection = 'left'
                }
                break;
            case 'ArrowRight':
                if (isSnakeOnVertical()) {
                    snakeDirection = 'right'
                }
                break;
            case 'd':
                if (isSnakeOnVertical()) {
                    snakeDirection = 'right'
                }
                break;
        }
    }
}

// Create touchstart event handler
function handleTouchStart(event) {
    // Getting the location of touch start
    touchInitialX = event.touches[0].screenX;
    touchInitialY = event.touches[0].screenY;
}

// Create touchmove event handler
function handleTouchMove(event) {
    // console.log(touchInitialX - event.touches[0].screenX);
    // console.log(touchInitialY - event.touches[0].screenY);
}

// Create touchstart event handler
function handleTouchEnd(event) {
    // Calculating swipe vector
    swipeX = event.changedTouches[0].screenX - touchInitialX;
    swipeY = event.changedTouches[0].screenY - touchInitialY;
    // Starting the game if it is not running yet
    if (!gameIsRunning) {
        gameIsRunning = true;
        startGame();
    }
    // Controlling snake movement direction based on keyboard press
    else {
        if (Math.abs(swipeX) > Math.abs(swipeY) && isSnakeOnVertical()) {
            if (swipeX < 0) {
                snakeDirection = 'left';
            }
            if (swipeX > 0) {
                snakeDirection = 'right';
            }
        }
        if (Math.abs(swipeY) > Math.abs(swipeX) && isSnakeOnHorizontal()) {
            if (swipeY < 0 ) {
                snakeDirection = 'up';
            }
            if (swipeY > 0) {
                snakeDirection = 'down';
            }
        }
    }
}

document.addEventListener('keydown',handleKeyPress);
document.addEventListener('touchstart',handleTouchStart);
document.addEventListener('touchmove',handleTouchMove);
document.addEventListener('touchend',handleTouchEnd)

drawBoard();

// drawBoard();
// setInterval(() =>{
//     moveSnake();
//     drawBoard();
// }, 200)