const fs = require('fs');

function readMap(filename) {
    const mapData = fs.readFileSync(filename, 'utf-8');
    const lines = mapData.split('\n');
    const dimensions = lines[0].split('x').map(Number);
    const map = lines.slice(1, dimensions[0] + 1).map(line => line.split(''));

    const start = findCoordinates(map, '2');
    const end = findCoordinates(map, '$');

    return {
        dimensions,
        map,
        start,
        end,
    };
}

function findCoordinates(map, char) {
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        const col = row.indexOf(char);
        if (col !== -1) {
            return [i, col];
        }
    }
    return null;
}

function isValidMove(map, row, col) {
    return row >= 0 && row < map.length && col >= 0 && col < map[0].length && map[row][col] !== '*';
}

function findShortestPath(map, start, end) {
    const queue = [[start[0], start[1], 0]]; // [row, col, steps]
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, Right, Down, Left

    while (queue.length > 0) {
        const [row, col, steps] = queue.shift();

        if (row === end[0] && col === end[1]) {
            return steps;
        }

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (isValidMove(map, newRow, newCol)) {
                queue.push([newRow, newCol, steps + 1]);
                map[newRow][newCol] = 'o'; // Mark the cell as visited
            }
        }
    }

    return -1; // No path found
}

function solveMaze(filename) {
    const { dimensions, map, start, end } = readMap(filename);
    const steps = findShortestPath(map, start, end);

    if (steps !== -1) {
        console.log(`=> SORTIE ATTEINTE EN ${steps} COUPS !`);
    } else {
        console.log('=> AUCUN CHEMIN POSSIBLE !');
    }

    // Print the solved maze
    console.log(map.map(row => row.join('')).join('\n'));
}

// Example usage
const filename = 'maze.txt';
solveMaze(filename);
