var fs = require('fs');

const smallSample = fs.readFileSync('sample-input-small.txt').toString('utf-8').split('\n').map(i => i.split('-'));

console.log(smallSample)

class Cave{
  constructor(name) {
    this.name = name,
    this.isLarge = false,
    this.hasBeenVisited = false
  }
  visitCave(){
    this.hasBeenVisited = true;
  }
  isCaveLarge(){
    this.isLarge = /^[A-Z]*$/.test(this.name)
  }
}

class CaveSystem{
  constructor(){
    this.caves = {};
    this.largeCaves = {};
    this.smallCaves = {};
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
        this.largeCaves[c] = 0;
      }else {
        this.smallCaves[c] = 0;
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
  return caveSystem
}


let caveSystem = createCaveSystem(smallSample)
caveSystem.classifyCaves();

caveSystem.visitCave('b')



console.log(caveSystem)