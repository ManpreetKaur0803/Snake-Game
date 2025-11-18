const board = document.querySelector(".board");
const StartButton = document.querySelector(".btn-start");
const Modal = document.querySelector(".modal");
const gameOverModal = document.querySelector(".game-over");
const gameStartModal = document.querySelector(".start-over");

const blockWidth = 20;
const blockHeight = 20;

let cols = Math.floor(board.clientWidth / blockWidth);
let rows = Math.floor(board.clientHeight / blockHeight);

let blocks = [];
const snake = [{ x: 10, y: 10 }];

let intervalID = null;
let direction = "Right";
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  let head = null;

  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction == "Left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction == "Right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction == "Down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction == "Up") {
    head = { x: snake[0].x - 1, y: snake[0].y - 1 };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    Modal.style.display = "flex";
    gameStartModal.display = "none";
    gameOverModal.display = "flex";
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

// intervalID = setInterval(() => {
//   render();
// }, 500);

StartButton.addEventListener("click", () => {
  Modal.style.display = "none";
  intervalID = setInterval(() => {
    render();
  }, 300);
});

addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") direction = "Left";
  else if (e.key === "ArrowRight") direction = "Right";
  else if (e.key === "ArrowUp") direction = "Up";
  else if (e.key === "ArrowDown") direction = "Down";
});
