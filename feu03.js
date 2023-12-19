// faire un sudoku
const fs = require('fs');

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] == num || board[x][col] == num || board[row - row % 3 + Math.floor(x / 3)][col - col % 3 + x % 3] == num) {
      return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == '.') {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num.toString())) {
            board[row][col] = num.toString();

            if (solveSudoku(board)) {
              return true;
            }

            board[row][col] = '.'; // Backtrack
          }
        }
        return false;
      }
    }
  }
  return true;
}

function printBoard(board) {
  for (let i = 0; i < 9; i++) {
    console.log(board[i].join(''));
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error('Usage: node sudoku_solver.js <filename>');
    process.exit(1);
  }

  const filename = args[0];

  try {
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split('\n');
    const board = lines.map(line => line.split(''));

    if (solveSudoku(board)) {
      printBoard(board);
    } else {
      console.log('No solution exists.');
    }
  } catch (err) {
    console.error('Error reading the file:', err.message);
    process.exit(1);
  }
}

main();
