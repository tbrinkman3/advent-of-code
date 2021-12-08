var fs = require('fs');

const sampleData = fs.readFileSync('sample-data.txt').toString('utf-8').split(',').map(num => Number(num))
const realData = fs.readFileSync('data.txt').toString('utf-8').split(',').map(num => Number(num))

console.log(sampleData)

const moveCrabs = (input) => {

  const mostCommonLocation = (locations) => {
    let mostCommonCount = 0;
    let mostCommonLoc;

    for(let loc in locations) {
      if (locations[loc] > mostCommonCount) {
        mostCommonCount = locations[loc];
        mostCommonLoc = loc;
      }
    }
    return mostCommonLoc;
  }

  let crabLocations = {};

  for(let crab of input) {
    crabLocations[crab] ? crabLocations[crab] += 1 : crabLocations[crab] = 1;
  }

  let fuelCost = 0;
  let mostCommonCrabLocation = mostCommonLocation(crabLocations)

  for (let loc of input) {
    let moveCost = Math.abs(loc - mostCommonCrabLocation);

    fuelCost += moveCost
  }
  return fuelCost;
  //mostCommonLocation(crabLocations)
}

console.log(moveCrabs(realData))