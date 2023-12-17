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

                    console.log(`Comparaison : shape[${si}][${sj}] (${shapeChar}) === board[${i + si}][${j + sj}] (${boardChar})`);

                    if (shapeChar !== boardChar && shapeChar !== 'X') {
                        found = false;
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

// Suite a poursuivrer : au lieu de chercher comme ca, chercher chaque ligne dans le board et si on trouve les lignes dans le board, on regarde si les correspondance sont bien alignées.