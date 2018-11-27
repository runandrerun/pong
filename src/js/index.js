document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('pong');
  const pong = new Pong(canvas)

  canvas.addEventListener('mousemove', (e) => {
    const realtime = e.offsetY / e.target.getBoundingClientRect().height;
    pong.players[0].pos.y = canvas.height * realtime;
  });

  canvas.addEventListener('click', (e) => {
    pong.serve();
  });
});
