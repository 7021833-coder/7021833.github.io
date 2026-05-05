// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let hit;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  hit = collideRectCircle(200, 200, 100, 150, mouseX, mouseY, 100);
  console.log (hit);
  if (hit){
    fill("blue");
  }
  else {
    fill("white");
  }
  background(255);
  rect(200, 200, 100, 150);
  circle(mouseX, mouseY, 100);




}
