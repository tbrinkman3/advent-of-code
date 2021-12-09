var fs = require('fs');

let sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => Number(num)));

let realData = fs.readFileSync('input.txt').toString('utf-8').split('\n').map(line => line.split('').map(num => Number(num)));

const calculateRisk = (heights) => {
  let risk = 0;
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
        console.log('heights', height, [i,j])
        risk+= height + 1;
      }
    }
  }
  console.log(risk)
  return risk;
}



calculateRisk(realData)