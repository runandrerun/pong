document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('pong');
  const context = canvas.getContext('2d');

  // table
  context.fillStyle = '#ccc';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // ball
  context.fillStyle = '#000';
  context.fillRect(0, 0, 10, 10);

  const ball = new Ball;
  console.log(ball)
});
