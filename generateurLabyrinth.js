const fs = require('fs');

if (process.argv.length < 5 || process.argv[4].length < 5) {
    console.log(process.argv.length);
    console.log(process.argv[3] ? process.argv[3].length : 0);
    console.log("params needed: height width characters");
} else {
    const height = parseInt(process.argv[2]);
    const width = parseInt(process.argv[3]);
    const chars = process.argv[4];
    const gates = parseInt(process.argv[5]);
    const entry = Math.floor(Math.random() * (width - 4)) + 2;
    const entry2 = Math.floor(Math.random() * (width - 4)) + 2;

    const maze = [];

    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            if (y === 0 && x === entry) {
                row += chars[3];
            } else if (y === height - 1 && x === entry2) {
                row += chars[4];
            } else if (y > 0 && y < height - 1 && x > 0 && x < width - 1 && Math.random() > 0.2) {
                row += chars[1];
            } else {
                row += chars[0];
            }
        }
        maze.push(row);
    }

    const mazeText = maze.join('\n');

    fs.writeFileSync('maze.txt', `${height}x${width}${process.argv[4]}\n${mazeText}`);

    console.log(`Labyrinthe généré et enregistré dans le fichier maze.txt`);
}
