var fs = require('fs');

let sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => Number(num)));

let realData = fs.readFileSync('input.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => Number(num)));

const findLowPoints = (heights) => {
  let lowPoints = [];
  for(let i = 0; i < heights.length; i++) {
    for(let j = 0; j < heights[i].length; j++) {
      let height = heights[i][j];

      /*
      up = i -1, j
      down = i + 1, j
      left = i, j -1
      right = i, j + 1
      */

      let up = i > 0 ? heights[i-1][j] : -1;
      let down = i + 1 < heights.length ? heights[i+1][j] : -1;
      let left = j > 0 ? heights[i][j-1]: -1;
      let right = j + 1 < heights[i].length ? heights[i][j+1] : -1;

      let surroundingVals = [up, down, left, right].filter(val => val > -1)

      if (height < Math.min(...surroundingVals)) {
        lowPoints.push([i,j])
      }
    }
  }
  console.log(lowPoints)
  //return risk;
};

const findBasinSize = (r, c, heights, prevDirection) => {
  let size = 0;

  const getSize = (r,c,prevDirection) => {
    size++;
    if (r < 0 || r > heights.length || c < 0 || c > heights[0].length) {
      return;
    }
    let directions = {
      up: [r > 0 ? heights[r-1][c] : -1, r - 1, c],
      down: [r + 1 < heights.length ? heights[r+1][c]: -1, r + 1, c],
      left: [c > 0 ? heights[r][c-1]: -1, r, c-1],
      right: [c + 1 < heights[0].length ? heights[r][c+1] : -1, r, c+1]
    };
    for(let d in directions) {
      if (d === prevDirection || directions[d][0] === -1) {
        delete directions[d];
      }
    }
    console.log(directions)
    for(let d in directions) {
      let row = directions[d][1];
      let col = directions[d][2];
      let previousD = d === 'up' ? 'down' : d === 'down' ? 'up': d === 'right' ? 'left' : 'right';
      getSize(row, col,previousD)
    }

  }
  getSize(0,1,sampleData, 'start')

  return size;
  //r-1, r+1, c-1, c+1
}



let test = findLowPoints(sampleData);

findBasinSize(0,1,sampleData, 'left')