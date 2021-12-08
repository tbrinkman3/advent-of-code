var fs = require('fs');

let sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split(',').map(num => Number(num));
let realData = fs.readFileSync('input.txt').toString('utf-8').split(',').map(num => Number(num));

const calcMassLanternFish = (input,day) => {
  //obj with total at each number....
  let fishCount = {
    '0':0,
    '1':0,
    '2':0,
    '3':0,
    '4':0,
    '5':0,
    '6':0,
    '7':0,
    '8':0
  };

  for(let fish of input) {
    fishCount[fish] ? fishCount[fish]+= 1 : fishCount[fish] = 1;
  }

  while(day > 0) {
    let prevCount = fishCount[8];
    let birthCount = fishCount[0];

    for(let i = 8; i > -1; i--) {
      if (i === 0) {
        fishCount['8'] = birthCount;
        fishCount['6']+= birthCount;
      } else {
        let temp = fishCount[i-1];
        fishCount[i - 1] = prevCount;
        prevCount = temp;
      }
    }
    day--;
  }

  let totalFishes = 0;
  //tally fishes
  for(let count in fishCount) {
    totalFishes+= fishCount[count]
  }
  console.log(totalFishes)
}

calcMassLanternFish(realData,256)