// Image Demo

let monkeyImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  monkeyImg= loadImage("Monkey-Selfie.webp")
  imageMode(CENTER);
}

function draw() {
  background(220);
  image (monkeyImg, mouseX, mouseY, monkeyImg.width*0.3, monkeyImg.height*0.3);
}
