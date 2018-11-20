document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('pong');
  const context = canvas.getContext('2d');

  // instantiate ball
  const ball = new Ball;

  let last;

  callBack = (ms) => {

  }

  // movement
  update = (time) => {
    ball.pos.x += ball.value.x * time;
    ball.pos.y += ball.value.y * time

    // ball
    context.fillStyle = '#000';
    context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);

    // table
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

});
