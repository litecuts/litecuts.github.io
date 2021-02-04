
let grid = createEmptyGrid(3, 3);
let rows, cols, cellWidth, cellHeight;
let bgMusic;
let clickSound;
let xImg, oImg;


function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = grid.length;
xImg = loadImage("assets/Letter X.png")
  cols = grid[0].length;
  cellWidth = width/cols;
  cellHeight = height/rows;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  toggleCell(x, y);   //self
}

function toggleCell(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}


function displayGrid() {
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      if (grid[y][x] === 3) {
        image(oImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      if (grid[y][x] === 1) {
        image(xImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function createEmptyGrid(cols, rows) {
  let empty = [];
  for (let y=0; y<rows; y++) {
    empty.push([]);
    for (let x=0; x<cols; x++) {
      empty[y].push(0);
    }
  }
  return empty;
}