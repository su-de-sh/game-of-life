const width = 25;
const height = 20; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  // iterate through the board  and paint the cells accordingly

  for (let i = 0; i < gol.board.length; i++) {
    for (let j = 0; j < gol.board[i].length; j++) {
      const cell = gol.board[i][j];
      const td = tds[i * width + j];

      if (cell === 1) {
        console.log("paint cell", i, j);
        td.classList.add("alive");
      } else {
        td.classList.remove("alive");
      }
    }
  }
};

document.getElementById("board").addEventListener("click", (event) => {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  console.log("clicked", row, col);
  gol.board[row][col] = 1;
  paint();
});

document.getElementById("step_btn").addEventListener("click", (event) => {
  // TODO: Do one gol tick and paint
  gol.tick();

  paint();
});

let clicked = false;
let interval;
document.getElementById("play_btn").addEventListener("click", (event) => {
  if (!clicked) {
    document.querySelector("#play_btn").innerHTML = "Stop";
    clicked = true;
    interval = setInterval(() => {
      gol.tick();
      paint();
    }, 500);
  } else {
    clicked = false;
    document.querySelector("#play_btn").innerHTML = "Play";
    clearInterval(interval);
  }
});

document.getElementById("random_btn").addEventListener("click", (event) => {
  // TODO: Randomize the board and paint
});

document.getElementById("clear_btn").addEventListener("click", (event) => {
  // TODO: Clear the board and paint
  gol.board = gol.makeBoard();
  paint();
});
