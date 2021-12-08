var fs = require('fs');

let sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split(',').map(num => Number(num));
let realData = fs.readFileSync('input.txt').toString('utf-8').split(',').map(num => Number(num));



const calculateLanternFish = (input, days) => {
  let day = 0;
  while(day < days) {
    let fish = 0;
    let addNewFish = false;

    while(fish < input.length) {
      input[fish]--;
      if (input[fish] === -1) {
        input[fish] = 6;
        //compensate for input--
        input.push(9);
      }
      fish++;
    }
    day++;
  }
  console.log(input)
  return input.length
}

//refactor for less space.......

console.log(calculateLanternFish(sampleData, 256))