const board = document.querySelector(".board");
const StartButton = document.querySelector(".btn-start");
const Modal = document.querySelector(".modal");
const gameOverModal = document.querySelector(".game-over");
const gameStartModal = document.querySelector(".start-game");
const ReStartButton = document.querySelector(".btn-over");

const highScoreBoard = document.querySelector("#high-score");
const scoreBoard = document.querySelector("#score");
const timeBoard = document.querySelector("#time");

const blockWidth = 20;
const blockHeight = 20;

let cols = Math.floor(board.clientWidth / blockWidth);
let rows = Math.floor(board.clientHeight / blockHeight);

let blocks = [];
const snake = [{ x: 10, y: 10 }];

let score = 0;
let time = "0:0";
let highScore = localStorage.getItem("highScore") || 0;

let intervalID = null;
let timeIntervalId = null;
let direction = "Right";
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

//Grid Making
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

//Game Logic
function render() {
  let head = null;

  highScoreBoard.innerText = highScore;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction == "Left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction == "Right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction == "Down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction == "Up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    Modal.style.display = "flex";
    gameStartModal.style.display = "none";
    gameOverModal.style.display = "flex";
    clearInterval(intervalID);
  }

  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);

    score += 10;
    scoreBoard.innerText = score;
    if (highScore < score) {
      localStorage.setItem("highScore", score);
    }
  }

  snake.forEach((e) => {
    blocks[`${e.x}-${e.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();

  snake.forEach((element) => {
    blocks[`${element.x}-${element.y}`].classList.add("fill");
  });
}

//Resetting the Game
function resetGame() {
  clearInterval(intervalID);
  clearInterval(timeIntervalId);

  for (let key in blocks) {
    blocks[key].classList.remove("fill", "food");
  }

  score = 0;
  time = "0:0";

  scoreBoard.innerText = score;
  timeBoard.innerText = "0:0";
  highScoreBoard.innerText = highScore;

  snake.length = 0;
  snake.push({
    x: 10,
    y: 10,
  });

  direction = "Right";

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  blocks[`${food.x}-${food.y}`].classList.add("food");
}

//Start Button
StartButton.addEventListener("click", () => {
  resetGame();
  Modal.style.display = "none";
  intervalID = setInterval(() => {
    render();
  }, 200);
  timeIntervalId = setInterval(() => {
    let [m, s] = time.split(":").map(Number);

    if (s == 59) {
      m += 1;
      s = 0;
    } else {
      s += 1;
    }

    time = `${m}:${s}`;
    timeBoard.innerText = time;
  }, 1000);
});

//Restart Button
ReStartButton.addEventListener("click", () => {
  resetGame();
  Modal.style.display = "none";
  intervalID = setInterval(() => {
    render();
  }, 200);
  timeIntervalId = setInterval(() => {
    let [m, s] = time.split(":").map(Number);

    if (s == 59) {
      m += 1;
      s = 0;
    } else {
      s += 1;
    }

    time = `${m}:${s}`;
    timeBoard.innerText = time;
  }, 1000);
});

//Game Movements
addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") direction = "Left";
  else if (e.key === "ArrowRight") direction = "Right";
  else if (e.key === "ArrowUp") direction = "Up";
  else if (e.key === "ArrowDown") direction = "Down";
});
