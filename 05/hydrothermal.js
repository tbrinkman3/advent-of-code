/*
You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

So, the horizontal and vertical lines from the above list would produce the following diagram:

.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....
In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

*/

var fs = require('fs');

let sampleData = fs.readFileSync('./sample-input.txt').toString('utf-8').split('\n').map(coords => coords.replace(/\s/g,'').replace(/->/g, ',').split(','))


class Coord{
  constructor(x1,y1,x2,y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.coords = [];

    this.lessX = null;
    this.greaterX = null;
    this.lessY = null;
    this.greaterY = null;
    this.constant = null;

  }
  isStraightLine(){
    if (this.x1 === this.x2 && this.y1 !== this.y2) {
      this.constant = this.x1;
      this.lessY = this.y1 < this.y2 ? this.y1 : this.y2;
      this.greaterY = this.y1 > this.y2 ? this.y1 : this.y2;

      this.getStraightCoords(this.lessY, this.greaterY, this.constant, 'y')
      return true;
    }

    if (this.y1 === this.y2 && this.x1 !== this.x2) {
      this.constant = this.y1;
      this.lessX = this.x1 < this.x2 ? this.x1 : this.x2;
      this.greaterX = this.x1 > this.x2 ? this.x1 :this.x2;
      this.getStraightCoords(this.lessX, this.greaterX, this.constant, 'x')
      return true;
    }
    this.x1 === this.x2 && this.y1 === this.y2 ? console.log('no movement') : console.log('edge case error')
  }
  getStraightCoords(p1, p2, c, axis) {
    if(axis === 'x') {
      for(let i = p1; i <= p2; i++) {
        this.coords.push(`${i}-${c}`)
      }
    } else {
      for(let i = p1; i <= p2; i++) {
        this.coords.push(`${c}-${i}`)
      }
    }
  }
}


const findHydroThermalVents = (coords) => {

  let placedCoordinates = {};
  let pointsOfOverlap = 0;

  let lineData = coords.map(coord => {

    let toNumbers = coord.map(num => Number(num));
    const [x1,y1,x2,y2] = toNumbers;

    return new Coord(x1,y1,x2,y2)

  })
  //calculate all coords
  for (let line of lineData) {
    line.isStraightLine();
    if(line.coords.length) {
      line.coords.forEach(coord => {
        placedCoordinates[coord] ? placedCoordinates[coord] += 1 : placedCoordinates[coord] = 1;
      })
    }
  }

  for(let point in placedCoordinates) {
    if (placedCoordinates[point] > 1) {
      pointsOfOverlap++;
    }
  }

  console.log(pointsOfOverlap)
}
findHydroThermalVents(sampleData)
//console.log(sampleData)