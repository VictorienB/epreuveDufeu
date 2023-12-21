// Trouver le plus grand carré
const fs = require('fs');

function replaceEmptyWithSolid(board) {
    const lines = board.split('\n');
    const [, height, emptyChar, obstacleChar, solidChar] = lines[0].match(/(\d+)([ox\.])([ox\.])([ox\.])/);
  
    //console.log('Height:', height);
    //console.log('Empty Char:', emptyChar);
    //console.log('Obstacle Char:', obstacleChar);
    //console.log('Solid Char:', solidChar);
  
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
    for (let row = 1; row <= height; row++) {
        for (let col = 0; col < width; col++) {
            if (lines[row][col] === emptyChar) {
                let squareSize = 1;
  
            while (
                row + squareSize < lines.length &&
                col + squareSize < lines[row].length &&
                lines[row + squareSize][col] === emptyChar &&
                lines[row].slice(col, col + squareSize + 1).indexOf(obstacleChar) === -1
            ) {
            let valid = true;
            for (let i = 0; i < squareSize; i++) {
                if (lines[row + i][col + squareSize] !== emptyChar || lines[row + squareSize][col + i] !== emptyChar) {
                    valid = false;
                    break;
                }
            }
            if (!valid) {
                break;
            }
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
      const prefix = line.slice(0, maxSquareCol);
      const suffix = line.slice(maxSquareCol + maxSquareSize);
      const filledSquare = solidChar.repeat(maxSquareSize);
      return prefix + filledSquare + suffix;
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

