var fs = require('fs');

let sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split('\n');

console.log(sampleData)


//some sore of queue as you iterate over keeping the next expected closing bracket and if it matches
//if find closing and no mathcy, is corrupted, if get to end and still ok but not finished, incomplete

//create symbol queue class

//iterate over string
  //use queue
  //if queue aborts
  //trak numb and save