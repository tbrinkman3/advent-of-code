var fs = require('fs');

class Octo{
  constructor(level) {
    this.level = level;
    this.flashed = false;
  }
  incLevel() {
    this.level++;
  }
  hasFlashed() {
    this.flashed = true;
  }
  resetFlash() {
    this.flashed = false;
  }
}

const sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => Number(num)));



const getTotalFlashes = (octoGrid, steps) => {
  let totalFlashes = 0;

  const spreadOctoFlash = (r,c) => {
    if (r > octoGrid.length -1 || r < 0 || c > octoGrid[0].length -1 || c < 0) {
      return;
    }

    if(octoGrid[r][c] < 10) {
      octoGrid[r][c]++;
    }

    if (octoGrid[r][c] > 9) {
      totalFlashes++;
      octoGrid[r][c] = 0;
      let dirOutward = [
        [r-1,c],
        [r+1,c],
        [r, c-1],
        [r, c+1],
        [r-1, c+1],
        [r+1, c+1],
        [r+1, c-1],
        [r-1, c-1]
      ];

      for(let dir of dirOutward) {
        spreadOctoFlash(dir[0], dir[1])
      }
    }
  }
  //declare totalFlashes
  let realStep = 0;
  //for every step
  while(steps > -1) {
    //iterate over octo grid
    console.log('++++++++');
    console.log(`Octo grid at step ${realStep}:`, octoGrid)
    for(let i = 0; i < octoGrid.length; i++) {
      for(let j = 0; j < octoGrid[0].length; j++) {
        octoGrid[i][j]++;
        if(octoGrid[i][j] > 9) {
          spreadOctoFlash(i,j);
        }
      }
    }
    realStep++;
    steps--;
  }
  console.log(totalFlashes)
  return totalFlashes;
}

getTotalFlashes(sampleData, 3)