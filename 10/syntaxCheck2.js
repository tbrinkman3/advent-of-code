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

const bPts = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
}

const checkSyntax = (line) => {
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
        return 'bad';
      }
    }
  }
  return stack.store;
}

const flipBrackets = (bracketArr) => {
  return bracketArr.map(b => rightBracks[leftBracks.indexOf(b)])
}

const getTotal = (brackets, total) => {
  console.log(brackets)
  if (brackets.length === 0) {
    return total;
  }
  let b = bPts[brackets[0]];
  total = total * 5 + b;
  return getTotal(brackets.slice(1), total);
}

const checkLinesSyntax = (lines) => {
  let incompleteLines = lines.filter(line => checkSyntax(line)!== 'bad');
  let completedLines = incompleteLines.map(line => flipBrackets(checkSyntax(line)));

  let pts = completedLines.map(line => getTotal(line, 0)).sort((a,b) => a-b);
  let medianPt = pts[Math.floor(pts.length/2)]
  return medianPt
}

checkLinesSyntax(realData);

