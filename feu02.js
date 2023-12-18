const fs = require('fs');

function readMatrixFromFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        const lines = content.trim().split('\n');
        return lines
            .filter(line => line.trim() !== '') // Ignore les lignes vides
            .map(line => line.split('').map(cell => (cell.trim() === '' ? 10 : parseInt(cell))));
    } catch (error) {
        console.error(`Erreur de lecture du fichier ${filename}: ${error.message}`);
        process.exit(1);
    }
}
function cropMatrix(matrix,newCols, newRows) {
    const currentRows = matrix.length;
    const currentCols = matrix[0].length;

    if (newRows < currentRows || newCols < currentCols) {
        // Retirer des lignes ou des colonnes
        return matrix.slice(0, newRows).map(row => row.slice(0, newCols));
    } else {
        // Ajouter des lignes ou des colonnes remplies de zéros
        const resizedMatrix = matrix.map(row => [...row, ...Array(newCols - currentCols).fill(0)]);
        for (let i = currentRows; i < newRows; i++) {
            resizedMatrix.push(Array(newCols).fill(0));
        }
        return resizedMatrix;
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
                    const shapeCell = shape[si][sj];
                    const boardCell = board[i + si][j + sj];

                    console.log(`Comparaison : shape[${si}][${sj}] (${shapeCell}) === board[${i + si}][${j + sj}] (${boardCell})`);

                    if (shapeCell !== 10 && shapeCell !== boardCell) {
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
                    console.log(shape[si].map(cell => (cell === 10 ? 'X' : cell)).join(' '));
                }
                return;
            }
        }
    }

    console.log('Introuvable');
}



const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node feu02.js <board_file> <shape_file>');
    process.exit(1);
}

const boardFilename = args[0];
const shapeFilename = args[1];

// Lire le plateau et la forme à partir des fichiers
const originalBoard = readMatrixFromFile(boardFilename);
const originalShape = readMatrixFromFile(shapeFilename);

// Redimensionner les matrices à 4x3 
const croppedBoard = cropMatrix(originalBoard,originalBoard[0].length-1, originalBoard.length);
const croppedShape = cropMatrix(originalShape,originalShape[0].length-1, originalShape.length);

// Afficher les matrices lues et redimensionnées
console.log('Board :');
console.log(croppedBoard.map(row => row.join(' ')).join('\n'));
console.log('----');
console.log('Shape :');
console.log(croppedShape.map(row => row.join(' ')).join('\n'));
console.log('----');

// Rechercher la forme dans le plateau
findShape(croppedBoard, croppedShape);
