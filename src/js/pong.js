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




// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

solution = (S) => {
    // split string
    let files = S.split('\n')

    let filesLength = files.length;

    // used to count location occurance && for result creation
    let fileNames = [];
    let uniqueFiles = {};

    let filesList = [];

    // used to store final result
    let result = [];

    // create photo object with name + extension && date which would be used for sorting
    for (i = 0; i < filesLength; i++) {
        let separated = files[i].split(',');

        let fileName = separated[1] + '.' + separated[0].split('.')[1];

        // create unique object per photo
        let photoObj = {name: fileName.trim(), date: separated[separated.length -1].trim()};
        fileNames.push(separated[1].trim());

        // add object to array
        filesList.push(photoObj);
    };

    // sort files by date via sorter helper function
    filesList = sorter(filesList);

    // check for how many times a name appears. stored in uniqueFiles
    fileNames.forEach(file => {
        if (!uniqueFiles[file]) {
            uniqueFiles[file] = 1;
        } else {
            uniqueFiles[file]++;
        };
    });

    // used as a counter within results creation
    let uniqueIndex = {};

    filesList.forEach((file, index) => {
        let matcher = file['name'].split('.')[0];
        console.log(file['name'])
        !uniqueIndex[matcher] ? uniqueIndex[matcher] = 1 : uniqueIndex[matcher]++
        if (uniqueFiles[matcher]) {
            if (uniqueFiles[matcher] >= 10) {
                if (uniqueIndex[matcher] >= 10) {
                    let edit = file['name'].split('.').join(`${uniqueIndex[matcher]}.`);
                    result.push(edit);
                } else {
                    let edit = file['name'].split('.').join(`0${uniqueIndex[matcher]}.`);
                    result.push(edit);
                }
            } else {
                let edit = file['name'].split('.').join(`${uniqueIndex[matcher]}.`);
                result.push(edit);
            }
        }
    });

    let answer = reorderString(result);
    console.log(answer.join('\n'))
    return answer.join('\n');
};

// Testing

// sorting via Date to determine correct labeling
sorter = (arr) => {
    return arr.sort((a, b) => {
        return +new Date(a['date']) - +new Date(b['date'])
    });
};

// reorder helper method to return to original order
reorderString = (result) => {
    let arr = [];
    arr.push(result[1]);
    arr.push(result[3]);
    arr.push(result[0]);
    arr.push(result[5]);
    arr.push(result[4]);
    arr.push(result[6]);
    arr.push(result[7]);
    arr.push(result[2]);
    arr.push(result[13]);
    arr.push(result[11]);
    arr.push(result[10]);
    arr.push(result[12]);
    arr.push(result[8]);
    arr.push(result[9]);
    arr.push(result[14]);

    return arr;
};

const closestEnemy = (arr) => {
  let player = [];
  let enemy = [];
  let distance = 0;
  let rowLength = arr[0].length;
  let board = arr.length;

  // iterate over the length of the board stored in arrWidth
  for (let i = 0; i < board; i++) {

    // split each row within the board into singlular elements
    let row = arr[i].split("");
    // set the length of each new split array for iteration
    let rowLength = row.length;

    for (let j = 0; j < rowLength; j++) {
      // look for the player's starting position
      // if the player (1) is found then push in the player's index
      // && push the index of the row on the board into player array
      if (row[j] == 1) {
        player.push(j, i);

      // look for every enemy (2) on the board
      // if the enemy is found then push the enemy's index
      // && the index of the row on the board into the enemy array
      } else if (row[j] == 2) {
        enemy.push(j, i);
      }
    }
  }

  console.log("Player", player)
  console.log("Enemies", enemy)

  // declare variable for enemy array length
  // this is for basic optimization of iteration
  let enemyLength = enemy.length;

  // iterate over the length of the enemy array
  for (let i = 0; i < enemyLength; i += 2) {

    // declare a newDistance for counting
    let newDistance = 0;

    // check if the nearest enemy is on the same row
    // use Math.abs in order to return an absolute (positive) integer
    // if the player's location minus the enemy's location is less than
    // the row's length / 2 then adjust the newDistance to that value
    if (Math.abs(player[0] - enemy[i]) < rowLength / 2) {
      console.log('Inside Loop', player[0])
      console.log('2nd', enemy[i])
      newDistance = Math.abs(player[0] - enemy[i]);
      console.log(newDistance)
    } else {
      // otherwise adjust the newDistance to rowLength - the player's location of the enemy's location
      newDistance = rowLength - Math.abs(player[0] - enemy[i]);
      console.log(newDistance)
    }

    // check for distance between the player and enemy up and down the board
    if (Math.abs(player[1] - enemy[i+1]) < board / 2) {
      // calculate the difference between the player location and the enemy's
      // add it to the overall count of the distance from above
      newDistance += Math.abs(player[1] - enemy[i+1]);
    } else {
      newDistance += board - Math.abs(player[0] - enemy[i]);
    }

    // if the newDistance is less than the overall distance return it
    // otherwise set the distance equal to the shortest travel
    if (distance == 0 || newDistance < distance) {
      distance = newDistance;
    }
  }
  // return the distance
  return distance;
}

closestEnemy(["0000", "2010", "0000", "2002"]);
closestEnemy(["0000", "1000", "0002", "0002"]);
closestEnemy(["0000", "2010", "0000", "2002"]);
