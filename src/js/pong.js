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

    // players
    this.players = [ new Player, new Player ];
    this.players[0].pos.x = 40;
    this.players[1].pos.x = this._canvas.width - 40;
    this.players.forEach(player => {
      player.pos.y = this._canvas.height / 2;
    })

    // ball animation
    let last;

    const ballMovement = (millis) => {
      if (last) {
        this.update((millis - last) / 1000);
      }
      last = millis;
      requestAnimationFrame(ballMovement);
    };

    ballMovement();

    this.DIGIT_PX = 10;
    this.DIGITS = [
      "111101101101111",
      "010010010010010",
      "111001111100111",
      "111001111001111",
      "101101111001001",
      "111100111001111",
      "111100111101111",
      "111001001001001",
      "111101111101111",
      "111101111001111",
    ].map(digit => {
      const canvas = document.createElement('canvas');
      canvas.height = this.DIGIT_PX * 5;
      canvas.width = this.DIGIT_PX * 3;
      const context = canvas.getContext('2d');
      context.fillStyle = '#000';
      digit.split('').forEach((draw, i) => {
        if (draw === '1') {
          context.fillRect((i % 3) * this.DIGIT_PX, (i / 3 | 0) * this.DIGIT_PX, this.DIGIT_PX, this.DIGIT_PX);
        }
      });
      return canvas;
    });

  };

  collision(player, ball) {
    if (player.left < ball.right && player.right > ball.left &&
        player.top < ball.bottom && player.bottom > ball.top) {
        const length = ball.velocity.length;
        ball.velocity.x = -ball.velocity.x;
        ball.velocity.y = 300 * (Math.random() - .5);
        ball.velocity.length = length * 1.10;
    }
  };

  reset() {
    this.ball.pos.x = this._canvas.width / 2;
    this.ball.pos.y = this._canvas.height / 2;
    this.ball.velocity.x = 0;
    this.ball.velocity.y = 0;
  }

  serve() {
    if (this.ball.velocity.x === 0 && this.ball.velocity.y === 0) {
      this.ball.velocity.x = 350 * (Math.random() > .5 ? 1 : -1);
      this.ball.velocity.y = 350 * (Math.random() * 2 - 1 ? 1 : -1);
      this.ball.velocity.length = 350;
    }
  }

  drawShapes(shape) {
    this._context.fillStyle = '#000';
    this._context.fillRect(shape.left, shape.top, shape.size.x, shape.size.y);
  };

  draw() {
    // table
    this._context.fillStyle = '#fff';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this.drawShapes(this.ball);
    this.createPlayers();
    this.displayScore();
  };

  displayScore() {
    const position = this._canvas.width / 3;
    const scoreWidth = this.DIGIT_PX * 4;
    this.players.forEach((player, i)=> {
      const scores = player.score.toString().split('');
      const alignment = position * (i + 1) - (scoreWidth * scores.length / 2) + this.DIGIT_PX / 2;
      scores.forEach((score, pos) => {
        this._context.drawImage(this.DIGITS[score|0], alignment + pos * scoreWidth, 20);
      });
    });
  };

  createPlayers() {
    this.players.forEach(player => {
      this.drawShapes(player);
    });
  };

  update(time) {
    this.ball.pos.x += this.ball.velocity.x * time;
    this.ball.pos.y += this.ball.velocity.y * time;

    // table constraints
    if (this.ball.left< 0 || this.ball.right > this._canvas.width) {
      let playerId;
      if (this.ball.velocity.x < 0) {
        playerId = 1;
      } else {
        playerId = 0;
      }
      this.players[playerId].score++;
      this.ball.velocity.x = -this.ball.velocity.x;
      this.reset();
    };

    if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
      this.ball.velocity.y = -this.ball.velocity.y;
    };

    this.players[1].pos.y = this.ball.pos.y - (Math.random() * 2 - 1 ? 1 : -1);
    // this.players[1].velocity =
    this.players.forEach(player => {
      this.collision(player, this.ball);
    })
    this.draw();
  };
};




// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// solution = (S) => {
//     // split string
//     let files = S.split('\n')
//
//     let filesLength = files.length;
//
//     // used to count location occurance && for result creation
//     let fileNames = [];
//     let uniqueFiles = {};
//
//     let filesList = [];
//
//     // used to store final result
//     let result = [];
//
//     // create photo object with name + extension && date which would be used for sorting
//     for (i = 0; i < filesLength; i++) {
//         let separated = files[i].split(',');
//
//         let fileName = separated[1] + '.' + separated[0].split('.')[1];
//
//         // create unique object per photo
//         let photoObj = {name: fileName.trim(), date: separated[separated.length -1].trim()};
//         fileNames.push(separated[1].trim());
//
//         // add object to array
//         filesList.push(photoObj);
//     };
//
//     // sort files by date via sorter helper function
//     filesList = sorter(filesList);
//
//     // check for how many times a name appears. stored in uniqueFiles
//     fileNames.forEach(file => {
//         if (!uniqueFiles[file]) {
//             uniqueFiles[file] = 1;
//         } else {
//             uniqueFiles[file]++;
//         };
//     });
//
//     // used as a counter within results creation
//     let uniqueIndex = {};
//
//     filesList.forEach((file, index) => {
//         let matcher = file['name'].split('.')[0];
//         console.log(file['name'])
//         !uniqueIndex[matcher] ? uniqueIndex[matcher] = 1 : uniqueIndex[matcher]++
//         if (uniqueFiles[matcher]) {
//             if (uniqueFiles[matcher] >= 10) {
//                 if (uniqueIndex[matcher] >= 10) {
//                     let edit = file['name'].split('.').join(`${uniqueIndex[matcher]}.`);
//                     result.push(edit);
//                 } else {
//                     let edit = file['name'].split('.').join(`0${uniqueIndex[matcher]}.`);
//                     result.push(edit);
//                 }
//             } else {
//                 let edit = file['name'].split('.').join(`${uniqueIndex[matcher]}.`);
//                 result.push(edit);
//             }
//         }
//     });
//
//     let answer = reorderString(result);
//     console.log(answer.join('\n'))
//     return answer.join('\n');
// };
//
// // Testing
//
// // sorting via Date to determine correct labeling
// sorter = (arr) => {
//     return arr.sort((a, b) => {
//         return +new Date(a['date']) - +new Date(b['date'])
//     });
// };
//
// // reorder helper method to return to original order
// reorderString = (result) => {
//     let arr = [];
//     arr.push(result[1]);
//     arr.push(result[3]);
//     arr.push(result[0]);
//     arr.push(result[5]);
//     arr.push(result[4]);
//     arr.push(result[6]);
//     arr.push(result[7]);
//     arr.push(result[2]);
//     arr.push(result[13]);
//     arr.push(result[11]);
//     arr.push(result[10]);
//     arr.push(result[12]);
//     arr.push(result[8]);
//     arr.push(result[9]);
//     arr.push(result[14]);
//
//     return arr;
// };
//
// const closestEnemy = (arr) => {
//   let player = [];
//   let enemy = [];
//   let distance = 0;
//   let rowLength = arr[0].length;
//   let board = arr.length;
//
//   // iterate over the length of the board stored in arrWidth
//   for (let i = 0; i < board; i++) {
//
//     // split each row within the board into singlular elements
//     let row = arr[i].split("");
//     // set the length of each new split array for iteration
//     let rowLength = row.length;
//
//     for (let j = 0; j < rowLength; j++) {
//       // look for the player's starting position
//       // if the player (1) is found then push in the player's index
//       // && push the index of the row on the board into player array
//       if (row[j] == 1) {
//         player.push(j, i);
//
//       // look for every enemy (2) on the board
//       // if the enemy is found then push the enemy's index
//       // && the index of the row on the board into the enemy array
//       } else if (row[j] == 2) {
//         enemy.push(j, i);
//       }
//     }
//   }
//
//   console.log("Player", player)
//   console.log("Enemies", enemy)
//
//   // declare variable for enemy array length
//   // this is for basic optimization of iteration
//   let enemyLength = enemy.length;
//
//   // iterate over the length of the enemy array
//   for (let i = 0; i < enemyLength; i += 2) {
//
//     // declare a newDistance for counting
//     let newDistance = 0;
//
//     // check if the nearest enemy is on the same row
//     // use Math.abs in order to return an absolute (positive) integer
//     // if the player's location minus the enemy's location is less than
//     // the row's length / 2 then adjust the newDistance to that value
//     if (Math.abs(player[0] - enemy[i]) < rowLength / 2) {
//       console.log('Inside Loop', player[0])
//       console.log('2nd', enemy[i])
//       newDistance = Math.abs(player[0] - enemy[i]);
//       console.log(newDistance)
//     } else {
//       // otherwise adjust the newDistance to rowLength - the player's location of the enemy's location
//       newDistance = rowLength - Math.abs(player[0] - enemy[i]);
//       console.log(newDistance)
//     }
//
//     // check for distance between the player and enemy up and down the board
//     if (Math.abs(player[1] - enemy[i+1]) < board / 2) {
//       // calculate the difference between the player location and the enemy's
//       // add it to the overall count of the distance from above
//       newDistance += Math.abs(player[1] - enemy[i+1]);
//     } else {
//       newDistance += board - Math.abs(player[0] - enemy[i]);
//     }
//
//     // if the newDistance is less than the overall distance return it
//     // otherwise set the distance equal to the shortest travel
//     if (distance == 0 || newDistance < distance) {
//       distance = newDistance;
//     }
//   }
//   // return the distance
//   return distance;
// }
//
// closestEnemy(["0000", "2010", "0000", "2002"]);
// closestEnemy(["0000", "1000", "0002", "0002"]);
// closestEnemy(["0000", "2010", "0000", "2002"]);
