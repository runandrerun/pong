document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('pong');
  const pong = new Pong(canvas)

  canvas.addEventListener('mousemove', (e) => {
    pong.players[0].pos.y = e.offsetY;
  });

  canvas.addEventListener('click', (e) => {
    pong.serve();
  });
});
