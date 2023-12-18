// feu02.js

const fs = require('fs');

function readBoardFromFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        return content.trim().split('\n').map(row => row.trim().split(''));
    } catch (error) {
        console.error(`Erreur de lecture du fichier ${filename}: ${error.message}`);
        process.exit(1);
    }
}

function readShapeFromFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        return content.split('\n').map(row => row.trim().split(''));
    } catch (error) {
        console.error(`Erreur de lecture du fichier ${filename}: ${error.message}`);
        process.exit(1);
    }
}

function findShape(board, shape) {
    const rows = board.length;
    const cols = board[0].length;
    const shapeRows = shape.length;
    const shapeCols = shape[0].length;

    for (let i = 0; i <= rows - shapeRows; i++) {
        for (let j = 0; j <= cols - shapeCols; j++) {
            let found = true;

            for (let si = 0; si < shapeRows; si++) {
                for (let sj = 0; sj < shapeCols; sj++) {
                    const shapeChar = shape[si][sj];
                    const boardChar = board[i + si][j + sj];
            
                    // Ignore special characters and spaces
                    if (shapeChar.trim() === '' || boardChar.trim() === '') {
                        console.log(`Ignoré le caractère spécial ou espace`);
                        continue;
                    }
            
                    console.log(`Comparaison : shape[${si}][${sj}] (${shapeChar}) === board[${i + si}][${j + sj}] (${boardChar})`);
            
                    // Update the comparison condition
                    if (shapeChar !== ' ' && shapeChar !== String.fromCharCode(boardChar.charCodeAt(0))) {
                        found = false;
                        console.log(`Pas trouvé à (${i + 1},${j + 1})`);
                        console.log(`shapeChar: ${shapeChar}, boardChar: ${boardChar}`);
                        console.log(`shapeChar ASCII: ${shapeChar.charCodeAt(0)}, boardChar ASCII: ${boardChar.charCodeAt(0)}`);
                        break;
                    }
                }
                if (!found) break;
            }

            if (found) {
                console.log('Trouvé !');
                console.log(`Coordonnées : ${i + 1},${j + 1}`);
                console.log('----');
                for (let si = 0; si < shapeRows; si++) {
                    console.log(shape[si].join(''));
                }
                return;
            }
        }
    }

    console.log('Introuvable');
}

// Récupérer les noms de fichiers à partir des arguments en ligne de commande
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node feu02.js <board_file> <shape_file>');
    process.exit(1);
}

const boardFilename = args[0];
const shapeFilename = args[1];

// Lire le plateau et la forme à partir des fichiers
const board = readBoardFromFile(boardFilename);
const shape = readShapeFromFile(shapeFilename);

// Afficher les plateaux lus
console.log('Board :');
console.log(board.map(row => row.join('')).join('\n'));
console.log('----');
console.log('Shape :');
console.log(shape.map(row => row.join('')).join('\n'));
console.log('----');

// Rechercher la forme dans le plateau
findShape(board, shape);
