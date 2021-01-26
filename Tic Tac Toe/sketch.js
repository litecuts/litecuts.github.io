let grid = createEmptyGrid(3, 3);
let rows, cols, cellWidth, cellHeight;
let bgMusic;
let clickSound;
let xImage;
let oImage;

function preload() {
  bgMusic = loadSound("assets/Bg music.ogg");
  clickSound = loadSound("assets/click.wav");
  xImage = loadImage("assets/X.png");
  oImage = loadImage("assets/circle.png");

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
        fill("blue");
      }
      if (grid[y][x] === 1) {
        fill("red");
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