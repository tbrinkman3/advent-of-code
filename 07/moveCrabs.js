var fs = require('fs');

const sampleData = fs.readFileSync('sample-data.txt').toString('utf-8').split(',').map(num => Number(num)).sort((a,b) => a-b)
const realData = fs.readFileSync('data.txt').toString('utf-8').split(',').map(num => Number(num)).sort((a,b) => a-b);

//console.log(sampleData)

const moveCrabs = (input) => {
  //get inital cost array
  let diffPoints = Array.from(new Set(input));

  let costArray = input.map(point => Math.abs(point - input[0]));
  let cost = costArray.reduce((prev, curr) => {return prev + curr}, 0);

  for(let i = 1; i < diffPoints.length; i++) {
    let newCostArray = costArray.map(point => Math.abs(point - diffPoints[i]));
    let newCost = newCostArray.slice().reduce((prev, curr) => {return prev + curr}, 0);
    if(newCost > cost) {
      break;
    } else {
      cost = newCost
    }
  }


  return cost
}

console.log(moveCrabs(realData))