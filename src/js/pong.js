document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('pong');
  const context = canvas.getContext('2d');

  // table
  context.fillStyle = '#ccc';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // ball
  const ball = new Ball;
  
  context.fillStyle = '#000';
  context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);

  console.log(ball)
});
