// 2D Array Game (Snakes and Ladders)
// Zain Ahmad Zaram
// 14 April 2026
//
// Extra for Experts:
// Took help a YTber named The Coding Train mostly for maths
// learnt how to use counter the challenges of the left to right and right to left moving of the player on the board 
// and how to convert the player's position on the board to row and column coordinates for drawing the player on the canvas
// discovered the min() function to make sure the board stays a square even on wide monitors

//for dice
const DICE_SIZE = 70;
const ONEDOT_RADIUS = 20;
const TWODOT_RADIUS = 10;
const THREEDOT_RADIUS = 9;
const FOURDOT_RADIUS = 9;
const FIVEDOT_RADIUS = 9;
const SIXDOT_RADIUS = 9;

//colors for the board tiles/cells
const LIGHT_SKIN = "#f9d5b0";
const DARK_SKIN = "#ac734a";

let diceNumber;
let playerPos = 1;
let cellSize;
let board = [];
let snakesAndLadders
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateSizes();
  initializeBoard();
}


function draw() {
  drawBoard();
  drawPlayer();
  drawDice();
}

function calculateSizes() {
  let availableHeight = height * 0.8;
  // min ensures the board stays a square even on wide monitors
  cellSize = min(width, availableHeight) / 10;
}


// Create the 10x10 structure of the board using a 2D array (the main requirement of the project))
function initializeBoard() {
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      // Initialize all cells to 0 (empty)
      board[i][j] = 0; 
    }
  }
}


function dice() {
  diceNumber = Math.floor(random(1, 7));
  playerPos += diceNumber;

  if (playerPos >= 100) {
    playerPos = 100;
      let x = (width - DICE_SIZE) / 2;
      let y = height - DICE_SIZE;
    textSize(32);
    fill("green");
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

function drawDice() {
  let x = (width - DICE_SIZE) / 2;
  let y = height - DICE_SIZE - 20;
// to make the dots appear where they are supposed to be on the dice
  let diceMid = 35;
  let diceLow = 15;
  let diceHigh = 52;

  push();
  stroke(0);
  strokeWeight(2);
  fill("white");
  square(x, y, DICE_SIZE);
  pop();

  if (diceNumber === 1) {
    fill("red");
    circle(x + diceMid, y + diceMid, ONEDOT_RADIUS);
  }
  if (diceNumber === 2) {
    fill("blue");
    circle(x + diceLow, y + diceMid, TWODOT_RADIUS);
    circle(x + diceHigh, y + diceMid, TWODOT_RADIUS);
  }
  if (diceNumber === 3) {
    fill("red");
    circle(x + diceHigh, y + diceHigh, THREEDOT_RADIUS);
    circle(x + diceMid, y + diceMid, THREEDOT_RADIUS);
    circle(x + diceLow, y + diceLow, THREEDOT_RADIUS);
  }
  if (diceNumber === 4) {
    fill("blue");
    circle(x + diceLow, y + diceLow, FOURDOT_RADIUS);
    circle(x + diceHigh, y + diceHigh, FOURDOT_RADIUS);
    circle(x + diceLow, y + diceHigh, FOURDOT_RADIUS);
    circle(x + diceHigh, y + diceLow, FOURDOT_RADIUS);
  }
  if (diceNumber === 5) {
    fill("blue");
    circle(x + diceLow, y + diceLow, FIVEDOT_RADIUS);
    circle(x + diceHigh, y + diceHigh, FIVEDOT_RADIUS);
    circle(x + diceLow, y + diceHigh, FIVEDOT_RADIUS);
    circle(x + diceHigh, y + diceLow, FIVEDOT_RADIUS);
    circle(x + diceMid, y + diceMid, FIVEDOT_RADIUS);
  }
  if (diceNumber === 6) {
    fill("blue");
    circle(x + diceLow, y + diceLow, SIXDOT_RADIUS);
    circle(x + diceHigh, y + diceHigh, SIXDOT_RADIUS);
    circle(x + diceLow, y + diceHigh, SIXDOT_RADIUS);
    circle(x + diceHigh, y + diceLow, SIXDOT_RADIUS);
    circle(x + diceLow, y + diceMid, SIXDOT_RADIUS);
    circle(x + diceHigh, y + diceMid, SIXDOT_RADIUS);
  }

}

function drawBoard() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let x = j * cellSize;
      let y = i * cellSize;

      let tileSum = i + j;

      // Checkerboard skin-tone pattern
    if (tileSum % 2 === 0) {
      fill(LIGHT_SKIN);
    } 
    else {
      fill(DARK_SKIN);
    }  
      stroke(255, 100);
      rect(x, y, cellSize, cellSize);

      // Tile Numbers
      let num = getTileNumber(i, j);
      fill(50);
      noStroke();
      textSize(cellSize * 0.2);
      textAlign(LEFT, TOP);
      text(num, x + 5, y + 5);
    }
  }
}

function getTileNumber(row, col) {
  let r = 9 - row;
  if (r % 2 === 0) {
    // Even rows go left to right
    return r * 10 + col + 1;
  } 
  else {
    // Odd rows go right to left
    return r * 10 + (9 - col) + 1;
  }
}

function drawPlayer() {
  let plyr= getGridCoords(playerPos);
  stroke(255); 
  strokeWeight(2);
  fill("blue"); 
  circle(plyr.col * cellSize + cellSize / 2, plyr.row * cellSize + cellSize / 2, cellSize * 0.6);
}

function getGridCoords(num) {
  // Calculate row and column based on the player's position on the board
  let row = Math.floor((num - 1) / 10);
  let col = (num - 1) % 10;

  // Invert the row index to match the board's top-to-bottom numbering
  let invertedRow = 9 - row;

  // For odd rows, reverse the column index to account for the zigzag pattern
  if (row % 2 === 1) {
    col = 9 - col;
  }

  // Ensure player doesn't go beyond 100
  if (num > 100) 
  {num = 100;}

  // Return as an object for easier access becouse we need both row and col to draw the player and it cant return two values at once
  return { row: invertedRow, col: col }; 
}

function mouseClicked() {
  let x = (width - DICE_SIZE) / 2;
  let y = height - DICE_SIZE - 20;
  if (mouseX > x && mouseX < x + DICE_SIZE && mouseY > y && mouseY < y + DICE_SIZE) {
    dice();
  }
}



