/*
You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

Maybe it wants to play bingo?

Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
Finally, 24 is drawn:

22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7
At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?
*/

const fs = require('fs');

//Formatting input to arrays of numbers

const bingoNums = fs.readFileSync('./bingoNum-input.txt').toString('utf-8').split(',').map(i => Number(i));
const bingoBoards = fs.readFileSync('./bingoBoards-input.txt').toString('utf-8').split(/\n\s*\n/).map(b => b.split('\n')).map(board => board.map(row => row.split(' ').filter(r => r !=='').map(i => Number(i))));

const sampleNums = fs.readFileSync('./sampleNums.txt').toString('utf-8').split(',').map(i => Number(i));
const sampleBoards = fs.readFileSync('./sampleBoards.txt').toString('utf-8').split(/\n\s*\n/).map(b => b.split('\n')).map(board => board.map(row => row.split(' ').filter(r => r !== '').map(i => Number(i))));


//Class with helper methods
class BingoBoard {
  constructor(board) {
      this.board = board;
      this.total = 0;
      this.winner = false;
  }

  placePiece(piece) {
      for(const row of this.board) {
          let pieceIndex = row.indexOf(piece)
          if (pieceIndex !== -1) {
              row[pieceIndex] = 'x'
          }
      }
  }

  checkBoard() {
      //check rows
      for (const row of this.board) {
          let checkRow = row.filter(i => i === 'x');

          if (checkRow.length === row.length) {
              console.log('Bingo at row')
              this.winner = true;
              return;
          }
      }

      let colI = 0;

      while(colI < 5) {
          let c = [];
          for(const row of this.board) {
              c.push(row[colI]);
          }

          let checkCol = c.filter(i => i === 'x');
          if (checkCol.length === c.length) {
              console.log('Bingo at col!')
              this.winner = true;
              return;
          }
          colI++;
      }
  }
  tallyBoard() {
    let total = 0;
      for(const row of this.board) {
          let sum = row.reduce((prev, curr) => {
              if (curr !== 'x') {
                  return curr + prev
              } else {
                  return prev
              }
          }, 0);
          total += sum;
      }
      this.total = total;
  }
  calcFinalScore(piece) {
      return this.total * piece;
  }
};

let boards = bingoBoards.map(board => new BingoBoard(board));
//let boards = sampleBoards.map(board => new BingoBoard(board));


const findBingo = (nums, boards) => {
  for (const num of nums) {
    for(const board of boards) {
      board.placePiece(num);
      board.checkBoard();
      if (board.winner) {
        board.tallyBoard();
        return board.calcFinalScore(num)
      }
    }
  }
}

const findLastBingo = (nums, boards) => {
  const winners = [];
  for(const num of nums) {
    for(const board of boards) {
      if (!board.winner) {
        board.placePiece(num);
        board.checkBoard();
        if (board.winner) {
          board.tallyBoard();
          let final = board.calcFinalScore(num);
          winners.push(final);
        }
      }
    }
  }
  return winners[winners.length -1];
}

//console.log(findBingo(bingoNums, boards))
console.log(findLastBingo(bingoNums, boards))

//console.log(bingoBoards)

