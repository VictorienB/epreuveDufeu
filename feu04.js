// Trouver le plus grand carré
const fs = require('fs');

function replaceEmptyWithSolid(board) {
  const lines = board.split('\n');
  const [height, emptyChar, obstacleChar, solidChar] = lines[0].split('');
  const width = lines[1].length;

  // Vérification de la validité de la carte
  if (
    lines.length < 3 ||
    lines.slice(1, -1).some(line => line.length !== width) ||
    !['.', 'o', 'x'].includes(emptyChar) ||
    !['.', 'o', 'x'].includes(obstacleChar) ||
    !['.', 'o', 'x'].includes(solidChar)
  ) {
    console.error('Carte invalide');
    return;
  }

  let maxSquareSize = 0;
  let maxSquareRow = 0;
  let maxSquareCol = 0;

  // Recherche du plus grand carré
  for (let row = 1; row < height + 1; row++) {
    for (let col = 0; col < width; col++) {
      if (lines[row][col] === emptyChar) {
        let squareSize = 1;

        while (
          lines[row + squareSize] &&
          lines[row + squareSize][col] === emptyChar &&
          lines[row + squareSize].slice(col, col + squareSize + 1).indexOf(obstacleChar) === -1
        ) {
          squareSize++;
        }

        if (squareSize > maxSquareSize) {
          maxSquareSize = squareSize;
          maxSquareRow = row;
          maxSquareCol = col;
        }
      }
    }
  }

  // Remplacement des caractères vides par des caractères pleins pour former le plus grand carré
  const updatedLines = lines.map((line, index) => {
    if (index >= maxSquareRow && index < maxSquareRow + maxSquareSize) {
      return line.slice(0, maxSquareCol) + solidChar.repeat(maxSquareSize) + line.slice(maxSquareCol + maxSquareSize);
    }
    return line;
  });

  console.log(updatedLines.join('\n'));
}

// Lecture du fichier et appel de la fonction principale
const filename = process.argv[2];
if (!filename) {
  console.error('Veuillez spécifier un fichier en argument.');
} else {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`Erreur de lecture du fichier : ${err.message}`);
    } else {
      replaceEmptyWithSolid(data);
    }
  });
}
