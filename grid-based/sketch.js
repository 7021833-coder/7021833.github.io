// 2D Array Game (Snakes and Ladders)
// Zain Ahmad Zaram
// 14 April 2026
//
// Extra for Experts:
// Took help a YTber named The Coding Train mostly for maths
// learnt how to use counter the challenges of the left to right and right to left moving of the player on the board 
// and how to convert the player's position on the board to row and column coordinates for drawing the player on the canvas
// discovered the min() function to make sure the board stays a square even on wide monitors
// discovered transparancy in colors to make the lines for snakes and ladders look better and not so harsh on the eyes
// discovered objects can be used to return multiple values from a function

//Constants for dice
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

//game variables
let diceNumber;
let playerPos = 1;
let cellSize;
let board = [];

// These arrays define the start and end points of the special tiles (snakes and ladders)
let specialTileStarts = [2, 7, 15, 28, 51, 16, 46, 62, 74, 99];
let specialTileEnds   = [38, 14, 26, 84, 67, 6, 25, 19, 53, 40];

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateSizes();
  initializeBoard();
}


function draw() {

  background(225);

  drawBoard();
  drawSpecials();
  drawPlayer();
  drawDice();

  if (playerPos === 100) {
    winText();
  }
}

function calculateSizes() {
  let availableHeight = height * 0.8;
  // min ensures the board stays a square even on wide monitors
  cellSize = min(width, availableHeight) / 10;
}


// Create the 10x10 structure of the board using a 2D array (the main requirement of the project)
function initializeBoard() {
  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      // Initialize all cells to 0 (empty)
      board[i][j] = 0;
    }
  }
    // Populates the 2D array with destination numbers at specific coordinates to act as a "lookup table" for snakes and ladders
  for (let i = 0; i < specialTileStarts.length; i++) {
    // Get the starting and ending tile numbers for the current special tile while matching the indexes of the two arrays
    let sNum = specialTileStarts[i];
    let eNum = specialTileEnds[i];
    
    // Convert the starting tile number to grid coordinates (row and column)
    let pos = getGridCoords(sNum);
    
    // Place the special tile on the board by setting the value at the corresponding row and column to the ending tile number
    //also acts as a lookup for the player's position to know where to move them when they land on a snake or ladder
    board[pos.row][pos.col] = eNum;
  }
}



function dice() {
  diceNumber = Math.floor(random(1, 7));
  playerPos += diceNumber;

  if (playerPos >= 100) {
    playerPos = 100;
  }
  //this piece gets info from initializeBoard() to check if the player has landed on a special tile and move them accordingly, if not it just leaves them where they are
  else {
    // Get the grid coordinates of the player's new position after moving
    let pos = getGridCoords(playerPos); 
    // Check if the player has landed on a special tile by looking up the value in the board array at the corresponding row and column
    if (board[pos.row][pos.col] !== 0) {
      // If the value is not 0, it means it's a special tile, so we update the player's position to the destination number of that tile
      playerPos = board[pos.row][pos.col];
    }
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
  square(x, y, DICE_SIZE, 10);
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
 // This function draws the 10x10 grid of the board and also adds the tile numbers to each cell for better visualization of cells
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

// This function calculates the tile number based on the row and column indices, taking into account the zigzag pattern of the board
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

// This function draws the player's piece on the board based on their current position
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

  // invberting due to the board's top-to-bottom numbering, so row 0 is at the bottom and row 9 is at the top
  let invertedRow = 9 - row;

  // For odd rows, reverse the column index to account for the zigzag pattern
  if (row % 2 === 1) {
    col = 9 - col;
  }

  // Ensure player doesn't go beyond 100
  if (num > 100) {
    num = 100;
  }

  // We can't return two values at once so we return an object with both row and col as properties for easier access when drawing the player
  // This way we can easily get both the row and column coordinates in one function call and use them to draw the player on the canvas
  // set rows as invertedRow to match the board's top-to-bottom numbering and col as is since it will be adjusted for odd rows in the function
  return { row: invertedRow, col: col }; 
}

// this function draws the lines for snake and ladders based on the specialTileStarts and specialTileEnds arrays
function drawSpecials() {
  for (let i = 0; i < specialTileStarts.length; i++) {
    let sNum = specialTileStarts[i];
    let eNum = specialTileEnds[i];

    // Get the starting and ending tile coordinates for the current special tile while matching the indexes of the two arrays
    let start = getGridCoords(sNum);
    let end = getGridCoords(eNum);
    
    // Calculate the center coordinates of the starting and ending tiles for drawing the line
    let x1 = start.col * cellSize + cellSize / 2;
    let y1 = start.row * cellSize + cellSize / 2;
    let x2 = end.col * cellSize + cellSize / 2;
    let y2 = end.row * cellSize + cellSize / 2;

    // Set the color
    if (eNum > sNum) {
      // Darker green with a bit of transparency
      stroke(0, 180, 0, 180);
    } else {
      // Red with a bit of transparency
      stroke(200, 0, 0, 180);
    }

    // Using cellSize * 0.2 makes the line about 20% of the square's width
    strokeWeight(cellSize * 0.2); 
    
    line(x1, y1, x2, y2);
    
    // Added a small circle at the start so it looks like their heads are on the line,looks better overal
    noStroke();
    //used a ternary operator to make the code compact
    fill(eNum > sNum ? "green" : "red");
    circle(x1, y1, cellSize * 0.2);
  }
}

function restartGame() {
  // Reset the player's position to the starting point
  playerPos = 1;

  // Reset the dice number to 0 or any default value if needed
  diceNumber = 0;
}

 function winText() {
    textSize(32);
    fill("green");
    textAlign(CENTER, CENTER);
    text("You Win!", width/ 2, height - DICE_SIZE- 90);

    textSize(32);
    fill("black");
    textAlign(CENTER, CENTER);
    text("Click \"R\" to Restart", width/ 2, height - DICE_SIZE- 50);
  }

function mouseClicked() {
  let x = (width - DICE_SIZE) / 2;
  let y = height - DICE_SIZE - 20;
  if (mouseX > x && mouseX < x + DICE_SIZE && mouseY > y && mouseY < y + DICE_SIZE) {
    dice();
  }
}

function keyPressed() {
  if (key === "r" || key === "R") {
    restartGame();
  }
}