var fs = require('fs');

const sampleData = fs.readFileSync('sample-data.txt').toString('utf-8').split(',').map(num => Number(num))

console.log(sampleData)