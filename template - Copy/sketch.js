// Name
//Project

//Extra for Experts:

let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background("black");

  rect(x, y, mouseX, mouseY);
}
