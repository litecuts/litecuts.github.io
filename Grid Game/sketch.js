// Grid Based Assignment
// Omair
// 2/7/2021
//
// Extra for Experts:
// There wasn't anything mentioned in the Extra For Experts, But I've managed to add an array in my project and some Sound Effects 

// An Array for the balls in the background
let theBouncingBalls = [];

let screen = 0;
const ROWS = 20;
const COLS = 20;
let grid, cellWidth, cellHeight;
let playerX = 0;
let playerY = 0;
let someMaze;
let anotherMaze;
let level3;
let playerImg, wallImg, grassImg, endImg;
let bgmusic;
let c;
let endMsg = "";
// Added Sound Effects, Levels  and Images
function preload() {
  level3 = loadJSON("assets/level3.json")
  anotherMaze = loadJSON("assets/level2.json")
  someMaze = loadJSON("assets/Level1.json");
  playerImg = loadImage("assets/Letter X.png");
  wallImg = loadImage("assets/O.png");
  bgMusic = loadSound("assets/Harp.mp3");
  clickSound = loadSound("assets/step_lth2.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.loop();

  grid = createEmptyGrid(COLS, ROWS);
  cellWidth = width / COLS;
  cellHeight = height / ROWS;
  //add player
  grid[playerY][playerX] = 9;
}

function draw() {
  background("black");
  displayGrid();
  moveBall();
  displayBall();
  
  // An if statement For the starting Screen to dissappear
  if(screen == 0) {
    startScreen()
  } if (screen == 1){
    displayGrid();
  }
}

// All The texts in the opening
function startScreen(){
  background(96, 157, 255)
  fill(255)
  textAlign(CENTER);
  text('WELCOME TO MY GRID GAME', width / 2, height / 2)
  text('Your Job is to get to the bottom right and then back top left of the grid', width / 2, height / 2 + 40);
  text('Press 1 To Load Level 1 and click anywhere to start. Use W, A, S, D to move around the Grid', width / 2, height / 2 + 80);
  text('After you Finish Level 1 press 2 for Level 2 and 3 for Level 3', width / 2, height / 2 + 100)
  text('Click To Start', width / 2, height / 2 + 140);
  text('Good Luck !', width / 2, height / 2 + 180)
  text('And the balls are just to confuse your path, You will not die if you touch them', width / 2, height / 2 + 220)
  textSize(20)
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);
  if (grid[y][x] === 1) { //if wall
    grid[y][x] = 0;       //make it empty
  }
  if (screen == 0){
  	screen = 1;
  }
}

  // A function for the array of Bouncing Balls to function
  function moveBall() {
    for (let ball of theBouncingBalls) {
      ball.k += ball.dk;
      ball.j += ball.dj;
    
      //check for bounce
      if (ball.k + ball.diameter/2 >= width ||
          ball.k - ball.diameter/2 <= 0) {
        ball.dk *= -1;
      }
      if (ball.j + ball.diameter/2 >= height ||
         ball.j - ball.diameter/2 <= 0) {
        ball.dj *= -1;
      }
    }
  }      
    
  
function keyPressed() {
  // keys so that the player can move up, down, left and right, and have a sound effect
  if (key === "d") {
    clickSound.play();
    movePlayer(playerX+1, playerY, playerX, playerY, "right");
  }
  if (key === "a") {
    clickSound.play();
    movePlayer(playerX-1, playerY, playerX, playerY, "left");
  }
  if (key === "s") {
    clickSound.play();
    movePlayer(playerX, playerY+1, playerX, playerY, "down");
  }
  if (key === "w") {
    clickSound.play();
    movePlayer(playerX, playerY-1, playerX, playerY, "up");
  }
  // So that the balls are spawned each time any keys are pressed 
  let ball = {
    k: (25, 50),
    j: (25, 50),
    diameter: random(25, 100),
    dk: random(-5, 5),
    dj: random(-5, 5),
    theColor: color(217, 217, 214)
  };
  theBouncingBalls.push(ball);
  if (key === "1") {
    grid = someMaze;
  }
  if (key === "2") {
    grid = anotherMaze;
  }
  if (key === "3") {
    grid = level3;
  }  
}

function movePlayer(x, y, oldX, oldY, direction) {
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS && grid[y][x] !== 1) {
    grid[y][x] = 9; //new player location
    grid[oldY][oldX] = 0; //remove player from old spot

    if (direction === "right") {
      playerX += 1;
    }
    if (direction === "left") {
      playerX -= 1;
    }
    if (direction === "down") {
      playerY += 1;
    }
    if (direction === "up") {
      playerY -= 1;
    }
  }
}

// To display the Grid
function displayGrid() {
  for (let y=0; y<ROWS; y++) {
    for (let x=0; x<COLS; x++) {
      if (grid[y][x] === 0) {
      }
      else if (grid[y][x] === 1) {
        image(wallImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 9) {
        image(playerImg, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      }
    }
  }
}

function createEmptyGrid(cols, rows) {
  let empty = [];
  for (let j=0; j<rows; j++) {
    empty.push([]);
    for (let k=0; k<cols; k++) {
      empty[j].push(0);
    }
  }
  return empty;
}

// Displaying the Bouncing Balls
function displayBall() {
  for (let w=0; w<theBouncingBalls.length; w++) {
    noStroke();
    fill(theBouncingBalls[w].theColor);
    ellipse(theBouncingBalls[w].k, theBouncingBalls[w].j, 
      theBouncingBalls[w].diameter, theBouncingBalls[w].diameter);
  }
}