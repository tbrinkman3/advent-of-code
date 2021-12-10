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

  const getSize = (r,c,prevDirection, prevValue) => {

    size++;
    //the incrementing and decrements is affecting them
    let plusR = r + 1;
    let minusR = r - 1;
    let plusC = c + 1;
    let minusC = c - 1;

    let directions = {
      up: [r > 0 ? heights[minusR][c] : -1, minusR, c],
      down: [r + 1 < heights.length ? heights[plusR][c]: -1, plusR, c],
      left: [c > 0 ? heights[r][minusC]: -1, r, minusC],
      right: [c + 2 < heights[0].length ? heights[r][plusC] : -1, r, plusC]
    };
    console.log('directsion pre remova:', directions)
    for(let d in directions) {
      if (d === prevDirection || directions[d][0] === -1 || prevValue+1 !== directions[d][0]) {
        console.log('this was deleted: ', d)
        delete directions[d];
      }
    }
    console.log('remaining directions', directions)
    for(let d in directions) {
      let val = directions[d][0];

      if (val === prevValue+1) {
        console.log('row and col:', r, c)
        let row = directions[d][1];
        let col = directions[d][2];
        let previousD = d === 'up' ? 'down' : d === 'down' ? 'up': d === 'right' ? 'left' : 'right';
        getSize(row, col,previousD, val)
      }
    }

  }
  getSize(2,2,'start', sampleData[2][2])
  console.log(size)
  return size;
  //r-1, r+1, c-1, c+1
}



let test = findLowPoints(sampleData);

findBasinSize(0,1,sampleData, 'left')