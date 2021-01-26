let grid = createEmptyGrid(3, 3);
let rows, cols, cellWidth, cellHeight;
let bgMusic;
let clickSound;
let tic;

function preload() {
  bgMusic = loadSound("assets/in_the_middle_of_nowhere_remix.ogg");
  clickSound = loadSound("assets/click.wav");
  tic = loadImage("assets/X.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.loop();
  rows = grid.length;
  cols = grid[0].length;
  cellWidth = width/cols;
  cellHeight = height/rows;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  clickSound.play();

  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  toggleCell(x, y);   
  toggleCell(x, y-1); 
  toggleCell(x, y+1); 
  toggleCell(x+1, y); 
  toggleCell(x-1, y); 
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
      if (grid[y][x] === 0) {
        fill("red");
      }
      if (grid[y][x] === 1) {
        fill("black");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight, tic);
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