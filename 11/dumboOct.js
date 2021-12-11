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
   return this.flashed;
  }
  makeFlash(){
    this.flashed = true;
    this.level = 0;
  }
  resetFlash() {
    this.flashed = false;
  }
}

const sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => new Octo(Number(num))));
const miniSample = fs.readFileSync('mini-sample.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => new Octo(Number(num))));
const realData = fs.readFileSync('input.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => new Octo(Number(num))));



const getTotalFlashes = (octoGrid, steps) => {
  let totalFlashes = 0;
  let realStep = 0;
  let allOctoHaveFlashed = false;

  const haveAllOctoFlashed = () => {
    let allFlashed = true;
    console.log('started checking')
    for(let octoLine of octoGrid) {
      for(let octo of octoLine) {
        if (octo.level !== 0) {
          allFlashed = false;
        }
      }
    }
    return allFlashed;
  }

  const resetOctoFlash = () => {
    for(let octoLine of octoGrid) {
      for(let octo of octoLine) {
        octo.resetFlash();
      }
    }
  }

  const spreadOctoFlash = (r,c) => {
    if (r > octoGrid.length -1 || r < 0 || c > octoGrid[0].length -1 || c < 0) {
      return;
    }
    if(octoGrid[r][c].level < 10 && octoGrid[r][c].hasFlashed() === false) {
      octoGrid[r][c].incLevel();
    }

    if (octoGrid[r][c].level > 9 ) {
      if (octoGrid[r][c].hasFlashed() === false) {
        totalFlashes++;
        octoGrid[r][c].makeFlash();

      }
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

  while(!allOctoHaveFlashed) {
    for(let i = 0; i < octoGrid.length; i++) {
      for(let j = 0; j < octoGrid[0].length; j++) {
        octoGrid[i][j].incLevel();
      }
    }
    for(let i = 0; i < octoGrid.length; i++) {
      for(let j = 0; j < octoGrid[0].length; j++) {
        if(octoGrid[i][j].level > 9) {
          spreadOctoFlash(i,j);
        }
      }
    }

    resetOctoFlash();
    realStep++;
    if (haveAllOctoFlashed(octoGrid)) {
      allOctoHaveFlashed = true;
      return realStep;
    }
  }
  return totalFlashes;
}

console.log(getTotalFlashes(realData, 100))