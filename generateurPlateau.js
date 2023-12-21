const fs = require('fs');

if (process.argv.length !== 5) {
  console.log("params needed: x y density");
  process.exit(1);
}

const x = parseInt(process.argv[2]);
const y = parseInt(process.argv[3]);
const density = parseInt(process.argv[4]);

const filename = 'plateau.txt';

fs.writeFileSync(filename, '');

for (let i = 0; i <= y; i++) {
  let line = '';
  for (let j = 0; j <= x; j++) {
    line += Math.random() * 200 < density ? 'x' : '.';
  }
  line += '\n';
  fs.appendFileSync(filename, line);
}

console.log(`Plateau généré et enregistré dans ${filename}`);
