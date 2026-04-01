// 2D Array Game (LUDO)
// Zain Ahmad Zaram
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const CELL_SIZE_MOVABLETILES=60;
const CELL_SIZE_HOMESTAND =50;
const CELL_SIZE_HOME = 200;
const PIECE_RADIUS = 15;
const DICE_SIZE = 70;
const ONEDOT_RADIUS = 20;
const TWODOT_RADIUS = 10;
const THREEDOT_RADIUS = 8;
const FOURDOT_RADIUS = 8;
const FIVEDOT_RADIUS = 7;
const SIXDOT_RADIUS = 6;


let diceNumber;
let moveableGrid;
function setup() {
  createCanvas(windowWidth*0.9, windowHeight*0.9);
}

function draw() {
  drawDice();
}


function dice(){
  diceNumber= Math.floor(random (1,7));
}

function drawDice(){
  let x= (width-DICE_SIZE)/2;
  let y= (height-DICE_SIZE)/2;
  push();
  stroke(0);
  strokeWeight(2);
  fill ("white");
  square (x,y,DICE_SIZE);
  pop();

  if (diceNumber===1){
    fill("red");
    circle (x+35,y+35,ONEDOT_RADIUS);
  }
  if (diceNumber===2){
    fill("black");
    circle (x+35,y+35,TWODOT_RADIUS);
    circle (x+35,y+35,TWODOT_RADIUS);
  }
  if (diceNumber===3){
    fill("red");
    circle (x+35,y+35,THREEDOT_RADIUS);
    circle (x+35,y+35,THREEDOT_RADIUS);
    circle (x+35,y+35,THREEDOT_RADIUS);
  }
  if (diceNumber===4){
    fill("blue");
    circle (x+35,y+35,FOURDOT_RADIUS);
    circle (x+35,y+35,FOURDOT_RADIUS);
    circle (x+35,y+35,FOURDOT_RADIUS);
    circle (x+35,y+35,FOURDOT_RADIUS);
  }
  if (diceNumber===5){
    fill("blue");
    circle (x+35,y+35,FIVEDOT_RADIUS);
    circle (x+35,y+35,FIVEDOT_RADIUS);
    circle (x+35,y+35,FIVEDOT_RADIUS);
    circle (x+35,y+35,FIVEDOT_RADIUS);
    circle (x+35,y+35,FIVEDOT_RADIUS);
  }
  if (diceNumber===6){
    fill("blue");
    circle (x+35,y+35,SIXDOT_RADIUS);
    circle (x+35,y+35,SIXDOT_RADIUS);
    circle (x+35,y+35,SIXDOT_RADIUS);
    circle (x+35,y+35,SIXDOT_RADIUS);
    circle (x+35,y+35,SIXDOT_RADIUS);
    circle (x+35,y+35,SIXDOT_RADIUS);
  }

}

function mouseClicked() {
  let x= (width-DICE_SIZE)/2;
  let y= (height-DICE_SIZE)/2;
  if (mouseX > x && mouseX < x + DICE_SIZE  && mouseY > y && mouseY < y + DICE_SIZE){
    dice();
  }
}



