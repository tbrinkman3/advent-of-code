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

/*
NOTES FOR PART 2

Have dictionary of what each number maps to in terms of positions

   0
  1 2
   3
  4 5
   6

  {
    0: [0,1,2,4,5,6],
    1: [2,5],
    2: [0,2,3,4,6],
    3: [0,2,3,5,6],
    4: [1,2,3,5],
    5: [0,1,3,5,6],
    6: [0,1,3,4,5,6],
    7: [0,2,5],
    8: [0,1,2,3,4,5,6],
    9: [0,1,2,3,5,6]
  }

Iterare over 4 unique values and map probably locations

Using example on

{
  0: d
  1: e,f
  2: a,b
  3: e,f
  4: c,g
  5: a,b
  6: c,g
}

Compare the 4 value to 5??? how ot find that value OR compare the 4 lenght to a 5 length and get one that has only difference of 3

Compare 2 to 6?? how to find that vlaue OR compare a 5 leng to 6 len and copare

Need some way to track what has been for sure found so that you can target more specifically

  this will allow correct representation of display model for that line



*/



console.log(findNumOfUniqeDisplay(realData))