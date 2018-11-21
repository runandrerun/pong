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

    let fileNames = [];
    let uniqueFiles = {};

    let filesList = [];

    let result = [];

    for (i = 0; i < filesLength; i++) {
        let separated = files[i].split(',')

        let fileName = separated[1] + '.' + separated[0].split('.')[1]

        // create unique object per photo
        let photoObj = {name: fileName, date: separated[separated.length -1]}
        fileNames.push(separated[1])

        // add object to array
        filesList.push(photoObj)
    }

    // sort files by date
    filesList.sort((a, b) => {
        return parseInt(a['date']) - parseInt(b['date'])
    })


    // check for how many times a name appears
    fileNames.forEach(file => {
        if (!uniqueFiles[file]) {
            return uniqueFiles[file] = 1
        } else {
            return uniqueFiles[file]++
        }
    })

    console.log(uniqueFiles)

    let counter = 0;
    filesList.forEach((file, index) => {
        let matcher = file['name'].split('.')[0];

        if (uniqueFiles[matcher]) {
            console.log(uniqueFiles[matcher])
            if (uniqueFiles[matcher] >= 10) {
                if (index + 1 - counter >= 10) {
                    let edit = file['name'].split('.').join(`${index + 1 - counter}.`);
                    console.log(edit)
                    // result.push(edit);
                } else {
                    let edit = file['name'].split('.').join(`0${index + 1 - counter}.`);
                    console.log(edit)
                    // result.push(edit);
                }
            } else {
                let edit = file['name'].split('.').join(`0${index + 1}.`);
                console.log(edit)
                // result.push(edit);
            }
        } else {
            console.log("no");
        }
        counter++
    })


    return result

}
