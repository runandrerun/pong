class Pong {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');

    // instantiate ball
    this.ball = new Ball;
    this.ball.pos.x = 100;
    this.ball.pos.y = 50;

    this.ball.velocity.x = 100;
    this.ball.velocity.y = 100;
  }

  update(time) {
    ball.pos.x += ball.velocity.x * time;
    ball.pos.y += ball.velocity.y * time

    // table constraints
    if (ball.left< 0 || ball.right > this._canvas.width) {
      ball.velocity.x = -ball.velocity.x
    }

    if (ball.top < 0 || ball.bottom > this._canvas.height) {
      ball.velocity.y = -ball.velocity.y
    }

    // ball
    context.fillStyle = '#000';
    context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);

    // table
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('pong');
  const context = canvas.getContext('2d');

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



solution = (S) => {
    let files = S.split('\n');
    let filesLength = files.length;

    let fileList = [];
    let uniqueFiles = {};

    for (i = 0; i < filesLength; i++) {
        let separated = files[i].split(',')

        let fileName = separated[1] + '.' + separated[0].split('.')[1] + "\n"
        fileList.push(separated[1])
        process.stdout.write(fileName)
    }

    // check for how many times a name appears
    fileList.forEach(file => {
        if (!uniqueFiles[file]) {
            return uniqueFiles[file] = 1
        } else {
            return uniqueFiles[file]++
        }
    })


    return Object.keys(uniqueFiles).forEach(location => {
        if (location.value >= 10) {
            for (let i = 0; i < location.value; i++) {
                if (i <= 9) {
                    // let name = `${location}`
                    // let file = name + "0" + `${i}` + ".jpg" + "/n"
                    // return process.stdout.write(file)
                    // console.log(file)
                    return process.stdout.write(location)
                } else {
                    // let name = `${location}`
                    // let file = name + `${i}` + ".jpg" + "/n"
                    // return process.stdout.write(file)
                    return process.stdout.write(location)
                }
            }
        } else {
            for (let i = 0; i < location.value; i++) {
                // let name = `${location}`
                // let file = name + `${i}` + ".jpg" + "/n"
                return process.stdout.write(location)
            }
        }
    })

}
