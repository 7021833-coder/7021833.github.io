// 2D Array Game (Snakes and Ladders)
// Zain Ahmad Zaram
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const CELL_SIZE_MOVABLETILES=60;
const PIECE_RADIUS = 15;
const DICE_SIZE = 70;
const ONEDOT_RADIUS = 20;
const TWODOT_RADIUS = 10;
const THREEDOT_RADIUS = 9;
const FOURDOT_RADIUS = 9;
const FIVEDOT_RADIUS = 9;
const SIXDOT_RADIUS = 9;


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
// to make the dots appear where they are supposed to be on the dice
  let diceMid=35; 
  let diceLow=15; 
  let diceHigh=52; 

  push();
  stroke(0);
  strokeWeight(2);
  fill ("white");
  square (x,y,DICE_SIZE);
  pop();

  if (diceNumber===1){
    fill("red");
    circle (x+diceMid,y+diceMid,ONEDOT_RADIUS);
  }
  if (diceNumber===2){
    fill("blue");
    circle (x+diceLow,y+diceMid,TWODOT_RADIUS);
    circle (x+diceHigh,y+diceMid,TWODOT_RADIUS);
  }
  if (diceNumber===3){
    fill("red");
    circle (x+diceHigh,y+diceHigh,THREEDOT_RADIUS);
    circle (x+diceMid,y+diceMid,THREEDOT_RADIUS);
    circle (x+diceLow,y+diceLow,THREEDOT_RADIUS);
  }
  if (diceNumber===4){
    fill("blue");
    circle (x+diceLow,y+diceLow,FOURDOT_RADIUS);
    circle (x+diceHigh,y+diceHigh,FOURDOT_RADIUS);
    circle (x+diceLow,y+diceHigh,FOURDOT_RADIUS);
    circle (x+diceHigh,y+diceLow,FOURDOT_RADIUS);
  }
  if (diceNumber===5){
    fill("blue");
    circle (x+diceLow,y+diceLow,FIVEDOT_RADIUS);
    circle (x+diceHigh,y+diceHigh,FIVEDOT_RADIUS);
    circle (x+diceLow,y+diceHigh,FIVEDOT_RADIUS);
    circle (x+diceHigh,y+diceLow,FIVEDOT_RADIUS);
    circle (x+diceMid,y+diceMid,FIVEDOT_RADIUS);
  }
  if (diceNumber===6){
    fill("blue");
    circle (x+diceLow,y+diceLow,SIXDOT_RADIUS);
    circle (x+diceHigh,y+diceHigh,SIXDOT_RADIUS);
    circle (x+diceLow,y+diceHigh,SIXDOT_RADIUS);
    circle (x+diceHigh,y+diceLow,SIXDOT_RADIUS);
    circle (x+diceLow,y+diceMid,SIXDOT_RADIUS);
    circle (x+diceHigh,y+diceMid,SIXDOT_RADIUS);
  }

}

function mouseClicked() {
  let x= (width-DICE_SIZE)/2;
  let y= (height-DICE_SIZE)/2;
  if (mouseX > x && mouseX < x + DICE_SIZE  && mouseY > y && mouseY < y + DICE_SIZE){
    dice();
  }
}



