var fs = require('fs');

const smallSample = fs.readFileSync('sample-input-small.txt').toString('utf-8').split('\n').map(i => i.split('-'));

class CaveSystem{
  constructor(){
    this.caves = {};
    this.largeCaves = [];
    this.smallCaves = [];
  }
  addCave(cave){
    if(!this.caves[cave]){
      this.caves[cave] = [];
    }
  }
  createConnection(c1, c2){
    if(!this.caves[c1]){
      this.addCave(c1)
    }
    if(!this.caves[c2]){
      this.addCave(c2)
    }
    this.caves[c1].push(c2);
    this.caves[c2].push(c1)
  }
  classifyCaves(){
    for(let c in this.caves) {
      if(/^[A-Z]*$/.test(c)){
        this.largeCaves.push(c);
      }else {
        this.smallCaves.push(c);
      }
    }
  }
  visitCave(cave){
    if(this.caves[cave]) {
      if(this.largeCaves[cave]>=0){
        this.largeCaves[cave]++;
      }else {
        this.smallCaves[cave]++;
      }
    }
  }
}

const createCaveSystem = (input) => {
  const findUniqueCaves = (caveConnections) => {
    return Array.from(new Set(caveConnections.flat()))
  }
  let caveSystem = new CaveSystem();
  const uniqueCaves = findUniqueCaves(input);

  for(let cave of uniqueCaves) {
    caveSystem.addCave(cave)
  }
  for(let c of input) {
    caveSystem.createConnection(c[0], c[1])
  }
  return caveSystem;
}


const mapCaveSystem = (input) => {
  let paths = 0;
  let caveSystem = createCaveSystem(input);
  caveSystem.classifyCaves();

  console.log(caveSystem.caves)

  const trackPath = (currCave,visitedSmallCaves,largeCaves,path) => {
//maybe start at first path??
  }

  trackPath('start',[], caveSystem.largeCaves, []);

  console.log(paths)
}

mapCaveSystem(smallSample)