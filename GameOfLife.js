class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    const board = [];
    for (let i = 0; i < this.height; i++) {
      board.push([]);
      for (let j = 0; j < this.width; j++) {
        board[i].push(0);
      }
    }
    return board;
  }

  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const r = row + i;
        const c = col + j;
        if (r < 0 || r >= this.height || c < 0 || c >= this.width) continue;
        if (this.board[r][c] === 1) count++;
      }
    }
    return count;
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const livingNeighbors = this.livingNeighbors(i, j);
        if (
          this.board[i][j] === 1 &&
          (livingNeighbors < 2 || livingNeighbors > 3)
        ) {
          newBoard[i][j] = 0;
        } else if (this.board[i][j] === 0 && livingNeighbors === 3) {
          newBoard[i][j] = 1;
        } else {
          newBoard[i][j] = this.board[i][j];
        }
      }
    }

    this.board = newBoard;
  }
}

const game = new GameOfLife(3, 3);

game.board[1][0] = 1; // or true, depending on which value represents "alive" in your implementation.
game.board[1][1] = 1;
game.board[1][2] = 1;

console.log(game.board);
//  [
//   [0, 0, 0],
//   [1, 1, 1],
//   [0, 0, 0]
//  ]

game.tick();

console.log(game.board);
//  [
//   [0, 1, 0],
//   [0, 1, 0],
//   [0, 1, 0]
//  ]
