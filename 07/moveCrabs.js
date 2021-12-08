var fs = require('fs');

const sampleData = fs.readFileSync('sample-data.txt').toString('utf-8').split(',').map(num => Number(num)).sort((a,b) => a-b)
const realData = fs.readFileSync('data.txt').toString('utf-8').split(',').map(num => Number(num)).sort((a,b) => a-b);

//console.log(sampleData)

const moveCrabsRateConstant = (input) => {
  //get inital cost array
  let diffPoints = Array.from(new Set(input));

  let costArray = input.map(point => Math.abs(point - input[0]));
  let cost = costArray.reduce((prev, curr) => {return prev + curr}, 0);

  let currCostExp = 1;

  let costArr = [];

  for(let i = 1; i < diffPoints.length; i++) {
    //find cost at next different horizontal line
    let newCostArray = costArray.map(point => Math.abs(point - diffPoints[i]) * currCostExp);
    //calculate new cost
    let newCost = [...newCostArray].reduce((prev, curr) => {return prev + curr}, 0);

      costArr.push(newCost)
      currCostExp++;
      cost = newCost

  }
  return costArr
}

const moveCrabsRateIncrease = (input) => {
  //get inital cost array
  let diffPoints = Array.from(new Set(input));

  let costArray = input.map(point => Math.abs(point - input[0]));
  let cost = costArray.reduce((prev, curr) => {return prev + curr}, 0);

  let currCostExp = 1;

  let costArr = [];

  for(let i = 1; i < diffPoints.length; i++) {

    //find cost at next different horizontal line
    let newCostArray = costArray.map(point => {
      let change = Math.abs(point - diffPoints[i])
      return (change * (change + 1)) / 2
      });
    //calculate new cost
    let newCost = [...newCostArray].reduce((prev, curr) => {return prev + curr}, 0);

      costArr.push(newCost)
      currCostExp++;
      cost = newCost

  }
  return Math.min(...costArr)
}

console.log(moveCrabsRateIncrease(realData))