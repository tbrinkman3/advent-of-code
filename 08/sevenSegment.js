var fs = require('fs');

var sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split('\n').map(i => i.split('|')[1].replace(/\s/, '').split(' '));

var realData = fs.readFileSync('input.txt').toString('utf-8').split('\n').map(i => i.split('|')[1].replace(/\s/, '').split(' '));

const findNumOfUniqeDisplay = (input) => {
  let uniqueDisplay = 0;
  let uniqueNums = [2,3,4,7];

  for(let display of input) {
    for(let i of display) {
      let displayLength = i.length;
      if(uniqueNums.indexOf(displayLength) > -1) {
        uniqueDisplay++;
      }
    }
  }

  return uniqueDisplay
}



console.log(findNumOfUniqeDisplay(realData))