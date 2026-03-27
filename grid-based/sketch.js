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
  stroke(0);
  strokeWeight(2);
  fill ("white");
  square (829,937,DICE_SIZE);
  if (diceNumber===1){
    fill("red");
    circle ();
  }


}

function mousePressed(){


}



