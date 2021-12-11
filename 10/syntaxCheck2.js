var fs = require('fs');

let sampleData = fs.readFileSync('sample-input.txt').toString('utf-8').split('\n');
let realData = fs.readFileSync('input.txt').toString('utf-8').split('\n');

//console.log(sampleData)

class Stack{
  constructor(){
    this.store = [];
  }
  add(input){
    this.store.unshift(input);
  }
  remove(){
    return this.store.shift();
  }
  viewTop(){
    return this.store[0];
  }
}

const leftBracks = ['{', '(','<','['];
const rightBracks = ['}',')','>',']'];

const badLinePts = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const checkBadSyntax = (line) => {
  let stack = new Stack();
  for(let i = 0; i < line.length; i++) {
    let bracket = line[i];
    if (leftBracks.indexOf(bracket) !== -1) {
      stack.add(bracket);
    } else {
      let matchingBrack = leftBracks[rightBracks.indexOf(bracket)];
      if (matchingBrack === stack.viewTop()) {
        stack.remove();
      } else {
        return true;
      }
    }
  }
  return false;
}

const checkLinesSyntax = (lines) => {
  let incompleteLines = lines.filter(line => !checkBadSyntax(line)))

}

//PART 1
let badLines = checkLinesSyntax(realData);
let pts = badLines.map(bracket => badLinePts[bracket]).reduce((prev, curr) => prev + curr, 0);
console.log(pts)

