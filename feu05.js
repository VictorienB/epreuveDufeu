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
    const queue = [[start[0], start[1], []]]; // [row, col, path]
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, Right, Down, Left

    while (queue.length > 0) {
        const [row, col, path] = queue.shift();

        if (row === end[0] && col === end[1]) {
            return path;
        }

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (isValidMove(map, newRow, newCol)) {
                queue.push([newRow, newCol, [...path, [newRow, newCol]]]);
                map[newRow][newCol] = ' '; // Mark the cell as visited
            }
        }
    }

    return null; // No path found
}

function solveMaze(filename) {
    const { dimensions, map, start, end } = readMap(filename);
    const path = findShortestPath(map, start, end);

    if (path) {
        console.log(`=> SORTIE ATTEINTE EN ${path.length} COUPS !`);
        // Print the solved maze with only the path
        console.log(map.map((row, rowIndex) =>
            row.map((cell, colIndex) => path.some(([r, c]) => r === rowIndex && c === colIndex) ? 'o' : cell).join('')
        ).join('\n'));
    } else {
        console.log('=> AUCUN CHEMIN POSSIBLE !');
    }
}

// Example usage
const filename = 'maze.txt';
solveMaze(filename);
