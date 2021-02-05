// Name
//Project

//Extra for Experts:

let boids = [];

let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;

let n2 = 20;

let r = 10;
let r1 = 90;
let r2 = 350;
let ang = 0;
let ang2 = 0;

function setup() {
       background(255, 255, 255);
       createCanvas(windowWidth, windowHeight);
       
       x1 = (windowWidth / 2) + r2*cos(radians(ang));
       y1 = (windowHeight / 2) + r1*sin(radians(2*ang));
       
       for (let i = 0; i < 3; i++) {
              boids[i] = new Boid(x1, y1);
       }
}

function draw() {
              
       background(255,255,255,1);
       
       noStroke();
       fill(n2, 0, n2);
       
       x1 = (windowWidth / 2) + r2*cos(radians(ang));
       y1 = (windowHeight / 2) + r1*sin(radians(2*ang));
       //ellipse(x1, y1, 0.1, 0.1);
       
       x2 = x1 + r*sin(radians(ang2*noise(n2)));
       y2 = y1 + r*sin(radians(ang2*noise(n2)));
       //ellipse(x2, y2, 0.1, 0.1);
       
       
       n2 += .008;
       ang += 0.4;
       ang2 += 0.09;
       
       
       // Run all the boids
       for (var i = 0; i < boids.length; i++) {
              boids[i].run(boids);
       }
}


function Boid(x, y) {
       this.acceleration = createVector(0, 0);
       this.velocity = p5.Vector.random2D();
       this.position = createVector(x, y);
       this.r = 3.0;
       this.maxspeed = 3; // Maximum speed
       this.maxforce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) {
       this.flock(boids);
       this.update();
       this.borders();
       this.render();
};

Boid.prototype.applyForce = function(force) {
       this.acceleration.add(force);
};

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
       let sep = this.separate(boids); // Separation
       let ali = this.align(boids); // Alignment
       let coh = this.cohesion(boids); // Cohesion
       let fol = this.follow(boids); // Cohesion
       // Arbitrarily weight these forces
       sep.mult(2.5);
       ali.mult(1.0);
       coh.mult(1.0);
       fol.mult(2.0);
       // Add the force vectors to acceleration
       this.applyForce(sep);
       this.applyForce(ali);
       this.applyForce(coh);
       this.applyForce(fol);
}

// Method to update location
Boid.prototype.update = function() {
       // Update velocity
       this.velocity.add(this.acceleration);
       // Limit speed
       this.velocity.limit(this.maxspeed);
       this.position.add(this.velocity);
       // Reset acceleration to 0 each cycle
       this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
       let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
       // Normalize desired and scale to maximum speed
       desired.normalize();
       desired.mult(this.maxspeed);
       // Steering = Desired minus Velocity
       let steer = p5.Vector.sub(desired, this.velocity);
       steer.limit(this.maxforce); // Limit to maximum steering force
       return steer;
}

// Draw boid as a circle
Boid.prototype.render = function() {
noStroke();
fill(0, 0, 0);
ellipse(this.position.x, this.position.y, 0.5, 0.5);
};

// Wraparound
Boid.prototype.borders = function() {
       if (this.position.x < -this.r) this.position.x = width + this.r;
       if (this.position.y < -this.r) this.position.y = height + this.r;
       if (this.position.x > width + this.r) this.position.x = -this.r;
       if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
       var desiredseparation = 10.0;
       var steer = createVector(0, 0);
       var count = 0;
       // For every boid in the system, check if it's too close
       for (var i = 0; i < boids.length; i++) {
              var d = p5.Vector.dist(this.position, boids[i].position);
              // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
              if ((d > 0) && (d < desiredseparation)) {
                     // Calculate vector pointing away from neighbor
                     var diff = p5.Vector.sub(this.position, boids[i].position);
                     diff.normalize();
                     diff.div(d); // Weight by distance
                     steer.add(diff);
                     count++; // Keep track of how many
              }
       }
       // Average -- divide by how many
       if (count > 0) {
              steer.div(count);
       }

       // As long as the vector is greater than 0
       if (steer.mag() > 0) {
              // Implement Reynolds: Steering = Desired - Velocity
              steer.normalize();
              steer.mult(this.maxspeed);
              steer.sub(this.velocity);
              steer.limit(this.maxforce);
       }
       return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
       var neighbordist = 50;
       var sum = createVector(0, 0);
       var count = 0;
       for (var i = 0; i < boids.length; i++) {
              var d = p5.Vector.dist(this.position, boids[i].position);
              if ((d > 0) && (d < neighbordist)) {
                     sum.add(boids[i].velocity);
                     count++;
              }
       }
       if (count > 0) {
              sum.div(count);
              sum.normalize();
              sum.mult(this.maxspeed);
              var steer = p5.Vector.sub(sum, this.velocity);
              steer.limit(this.maxforce);
              return steer;
       } else {
              return createVector(0, 0);
       }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
       var neighbordist = 50;
       var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
       var count = 0;
       for (var i = 0; i < boids.length; i++) {
              var d = p5.Vector.dist(this.position, boids[i].position);
              if ((d > 0) && (d < neighbordist)) {
                     sum.add(boids[i].position); // Add location
                     count++;
              }
       }
       if (count > 0) {
              sum.div(count);
              return this.seek(sum); // Steer towards the location
       } else {
              return createVector(0, 0);
       }
}

Boid.prototype.follow = function(boids) {
  let neighbordist = 100;
  let m = createVector(x2, y2)
  let d = p5.Vector.dist(this.position, m);
  if ((d > 0) && (d < neighbordist)) {
    return this.seek(m); // Steer towards the mouse location 
  } else {
    return createVector(0, 0);
  }
}

function windowResized() {
       resizeCanvas(windowWidth, windowHeight);
}
