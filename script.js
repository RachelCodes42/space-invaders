const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerWidth = 50;
const playerHeight = 20;
const playerSpeed = 5;
const bulletSpeed = 5;
const invaderWidth = 30;
const invaderHeight = 30;
const invaderSpeed = 2;
const invaderPadding = 10;
const invadersColumns = 10;
const invadersRows = 4;
const bulletWidth = 5;
const bulletHeight = 10;

let playerX = canvas.width / 2 - playerWidth / 2;
let bullets = [];
let invaders = [];

function createInvaders() {
  for (let row = 0; row < invadersRows; row++) {
    for (let col = 0; col < invadersColumns; col++) {
      const x = col * (invaderWidth + invaderPadding);
      const y = row * (invaderHeight + invaderPadding);
      invaders.push({ x, y });
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "#00f";
  ctx.fillRect(playerX, canvas.height - playerHeight, playerWidth, playerHeight);
}

function drawBullet(x, y) {
  ctx.fillStyle = "#0f0";
  ctx.fillRect(x, y, bulletWidth, bulletHeight);
}

function drawInvaders() {
  ctx.fillStyle = "#f00";
  invaders.forEach((invader) => {
    ctx.fillRect(invader.x, invader.y, invaderWidth, invaderHeight);
  });
}

function moveBullets() {
  bullets.forEach((bullet) => {
    bullet.y -= bulletSpeed;

    // Check if the bullet hit any invaders
    for (let i = invaders.length - 1; i >= 0; i--) {
      const invader = invaders[i];
      if (
        bullet.x < invader.x + invaderWidth &&
        bullet.x + bulletWidth > invader.x &&
        bullet.y < invader.y + invaderHeight &&
        bullet.y + bulletHeight > invader.y
      ) {
        bullets.splice(bullets.indexOf(bullet), 1);
        invaders.splice(i, 1);
        break;
      }
    }

    // Remove the bullet when it goes off the screen
    if (bullet.y < 0) {
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    playerX -= playerSpeed;
  } else if (event.key === "ArrowRight") {
    playerX += playerSpeed;
  } else if (event.key === " ") { // Space key to shoot
    bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: canvas.height - playerHeight });
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawInvaders();
  bullets.forEach((bullet) => drawBullet(bullet.x, bullet.y));

  moveBullets();

  if (invaders.length === 0) {
    alert("You win!");
    location.reload(); // Reload the game after winning
  } else {
    requestAnimationFrame(draw);
  }
}

createInvaders();
draw();
