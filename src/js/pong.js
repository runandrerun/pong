class Pong {
  constructor(canvas) {
    this._canvas = canvas;
    this._canvas = canvas.getContext('2d');
  }

  update = (time) => {
    ball.pos.x += ball.velocity.x * time;
    ball.pos.y += ball.velocity.y * time

    // table constraints
    if (ball.left< 0 || ball.right > canvas.width) {
      ball.velocity.x = -ball.velocity.x
    }

    if (ball.top < 0 || ball.bottom > canvas.height) {
      ball.velocity.y = -ball.velocity.y
    }

    // ball
    context.fillStyle = '#000';
    context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);

    // table
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('pong');
  const context = canvas.getContext('2d');

  // instantiate ball
  const ball = new Ball;
  ball.pos.x = 100;
  ball.pos.y = 50;

  ball.velocity.x = 100;
  ball.velocity.y = 100;

  let last;

  // ball animation
  ballMovement = (ms) => {
    if (last) {
      update((ms - last) / 1000);
    }
    last = ms
    requestAnimationFrame(ballMovement)
  }

  // ball positioning

  ballMovement()

});
