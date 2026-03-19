//Arrrays and Objects Assignment (improvements to Crossy Road)
//Zain Ahmad Zaram
//18/3/2026

// Extra for experts
// -sort((a, b) => a.moves - b.moves) rearranges the leaderboard array in order of moves (lowest to highest)
// //=> is an arrow function that compares two entries and returns a value to determine their order in the sorted array
// -leaderboard.length > 5 checks if there are more than 5 entries and removes the last one if so, ensuring only the top 5 are kept 
// -substring(0, currentName.length - 1) removes the last character from currentName when backspace is pressed, allowing for name editing
// -dist(mouseX, mouseY, x, colorBoxY) < colorBoxSize checks if the mouse click is within the radius of the color box, enabling color selection
// -leaderborad array as a global variable for storing the name and stats of each player who wins, allowing for an actual leaderboard display until the page is refreshed

//GLOBAL AND STATE VARIABLES

let gameState = "START";

//player object to store position, color, and move count
let player = {
  x: 0,
  y: 0,
  size: 30,
  r: 255,
  g: 100,
  b: 100,
  moves: 0
};

//for leaderboard storage and name entry
let leaderboard = [];
let enteringName = false;
let currentName = "";

//color selection boxes improved with arrays for easier management
let colorBoxX = [250, 350, 450, 550];
let colorBoxColors = [
  { r: 255, g: 100, b: 100 },
  { r: 100, g: 255, b: 100 },
  { r: 100, g: 150, b: 255 },
  { r: 255, g: 220, b: 100 }
];
let colorBoxY = 260;
let colorBoxSize = 70;

//lane and car properties stored in arrays for easier adjustments and scalability (readability and maintainability)
let laneCenters = [150, 250, 350, 450, 550, 650]; // vertical centers of lanes
let laneSpeeds = [3, -4, 2.5, -3.5, 3, -5];
let laneHeight = 60;
let carWidth = 80;
let carHeight = 35;
let carSpacing = 300;

//timer variables
let startTime = 0;
let finishTime = 0;

//FUNCTIONS

function setup() {
  createCanvas(800, 850);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  player.x = width / 2;
  player.y = height - 90; //player starts in the bottom safe zone
}

// main draw loop
function draw() {
  background(30, 30, 40);

  if (gameState === "START") drawMenu();
  else if (gameState === "PLAY") {
    drawEnvironment();
    drawPlayer();
    drawCars();
    checkWin();

    fill(255);
    textSize(20);
    let timer = (millis() - startTime) / 1000;
    // Display timer in the top right corner during gameplay
    text("Time: " + timer.toFixed(2) + "s", width - 100, 30);
  } else if (gameState === "WIN") drawEndScreen("VICTORY!", color(100, 255, 100));
  else if (gameState === "GAMEOVER") drawEndScreen("GAME OVER", color(255, 80, 80));
}

//menu screen
function drawMenu() {
  background(20, 25, 35);

  fill(255);
  textSize(60);
  text("CROSSY ROAD", width / 2, 120);

  textSize(22);
  text("Click to Select Your Character Color", width / 2, 200);

  for (let i = 0; i < colorBoxX.length; i++) {
    drawColorBox(colorBoxX[i], colorBoxColors[i].r, colorBoxColors[i].g, colorBoxColors[i].b);
  }

  fill(200);
  text("Press S to Start", width / 2, 350);
}
//Color Box drawing
function drawColorBox(x, r, g, b) {
  if (player.r === r && player.g === g && player.b === b) {
    stroke(255);
    strokeWeight(4);
  } else {
    stroke(120);
    strokeWeight(1);
  }
  fill(r, g, b);
  rect(x, colorBoxY, colorBoxSize, colorBoxSize, 12);
}

//end screen
function drawEndScreen(title, col) {
  background(20, 25, 35);

  fill(col);
  textSize(50);
  text(title, width / 2, 120);

  fill(255);
  textSize(20);
  text("Moves: " + player.moves, width / 2, 180);

  if (enteringName) {
    text("Enter Name: " + currentName, width / 2, 240);
    text("Press ENTER to save", width / 2, 280);
  } else {
    drawLeaderboard();
    text("Press R to Restart", width / 2, 650);
  }
}

//leaderboard display
function drawLeaderboard() {
  textSize(22);
  fill(200);
  text("Leaderboard (Top 5)", width / 2, 320);

  for (let i = 0; i < leaderboard.length; i++) {
    let entry = leaderboard[i];
    let timeSec = (entry.time / 1000).toFixed(2);

    text(
      (i + 1) + ". " + entry.name +
      " | Moves: " + entry.moves +
      " | Time: " + timeSec + "s",
      width / 2,
      360 + i * 30
    );
  }
}

//game environment improved with better lane drawing and tree function for cleaner code and easier adjustments
function drawEnvironment() {
  noStroke();

  // Top and bottom safe zones
  fill(40, 160, 60);
  rect(width / 2, height - 90, width, 180); // bottom start zone
  rect(width / 2, 60, width, 100); // top safe zone

  // Trees
  for (let x = 50; x < width; x += 150) {
    drawTree(x, height - 120);
    drawTree(x, 40);
  }

  // Draw lanes
  for (let lane = 0; lane < laneCenters.length; lane++) {
    // Lane background
    noStroke();
    fill(60);
    rect(width / 2, laneCenters[lane], width, laneHeight);

    // Dashed center line
    stroke(255, 180);
    strokeWeight(3);
    for (let x = 0; x < width; x += 50) {
      line(x, laneCenters[lane], x + 25, laneCenters[lane]);
    }
  }
}

// to draw trees on the grass areas
function drawTree(x, y) {
  push();
  translate(x, y);
  fill(120, 70, 20);
  rect(0, 15, 20, 40);
  fill(30, 140, 40);
  ellipse(0, -10, 60);
  ellipse(-20, 0, 50);
  ellipse(20, 0, 50);
  pop();
}

//player being drawn improved
function drawPlayer() {
  push();
  translate(player.x, player.y);
  fill(player.r, player.g, player.b);
  stroke(0);
  strokeWeight(2);
  rect(0, 0, player.size, player.size, 8);
  pop();
}

//cars being drawn and moving in lanes (changed to use laneCenters and laneSpeeds arrays, differrent math for smoother looping and better handling of off-screen cars)
function drawCars() {
  for (let lane = 0; lane < laneCenters.length; lane++) {
    for (let i = 0; i < 3; i++) {

      let baseX = i * carSpacing + (frameCount * laneSpeeds[lane]);
      let x = baseX % (width + carWidth);

      if (x < -carWidth) x += width + carWidth;
      if (x > width + carWidth) x -= width + carWidth;

      drawCar(x, laneCenters[lane], laneSpeeds[lane]);
      checkCollision(x, laneCenters[lane]);
    }
  }
}

// to draw each car with its position and speed (better visuals)
function drawCar(x, y, speed) {
  push();
  translate(x, y);

  if (speed < 0) scale(-1, 1);

  rectMode(CENTER);

  stroke(0); // black border
  strokeWeight(2);
  fill(200, 50, 50);
  rect(0, 0, carWidth, carHeight, 10);

  // wheels
  noStroke();
  fill(30);
  ellipse(-carWidth / 3, carHeight / 2, 18);
  ellipse(carWidth / 3, carHeight / 2, 18);

  pop();
}

// to check if player hits any car
function checkCollision(x, y) {
  if (
    player.x + player.size / 2 > x - carWidth / 2 &&
    player.x - player.size / 2 < x + carWidth / 2 &&
    player.y + player.size / 2 > y - carHeight / 2 &&
    player.y - player.size / 2 < y + carHeight / 2
  ) {
    gameState = "GAMEOVER";
  }
}

//checks if you win by reaching the top grass area (increased gamelength)
function checkWin() {
  if (player.y < 110) { // top safe zone
    gameState = "WIN";
    finishTime = millis() - startTime;
    enteringName = true;
  }
}

//reccomended improvement fuunction for color selection click detection
function checkColorBoxClick(x, r, g, b) {
  if (dist(mouseX, mouseY, x, colorBoxY) < colorBoxSize) {
    player.r = r;
    player.g = g;
    player.b = b;
    return true;
  }
  return false;
}

//Color selection for menu (improved with function and loop)
function mousePressed() {
  if (gameState === "START") {
    for (let i = 0; i < colorBoxX.length; i++) {
      if (checkColorBoxClick(colorBoxX[i], colorBoxColors[i].r, colorBoxColors[i].g, colorBoxColors[i].b)) break;
    }
  }
}
//keyboard interaction for gameplay and menu
//added leaderboard array management and name entry for win state, saves it too unless you refresh the page
function keyPressed() {

  // NAME INPUT
  if (enteringName) {
    if (keyCode === ENTER) {
      if (currentName.trim().length === 0) return;

      leaderboard.push({
        name: currentName,
        moves: player.moves,
        time: finishTime
      });

      leaderboard.sort((a, b) => a.moves - b.moves); //sorts leaderboard by moves (lowest to highest)

      if (leaderboard.length > 5) leaderboard.pop(); // keep only top 5

      currentName = "";
      enteringName = false;

    } else if (keyCode === BACKSPACE) {
      currentName = currentName.substring(0, currentName.length - 1);  // remove last character for editing
    } else if (key.length === 1 && currentName.length < 10) {
      currentName += key;
    }
    return;
  }

  if (gameState === "START" && (key === 's' || key === 'S')) {
    gameState = "PLAY";
    startTime = millis();
    player.moves = 0;
    player.x = width / 2;
    player.y = height - 90;
  }
  else if (gameState === "PLAY") {
    let step = 80;

    if (keyCode === UP_ARROW) { player.y -= step; player.moves++; }
    if (keyCode === DOWN_ARROW) { player.y += step; player.moves++; }
    if (keyCode === LEFT_ARROW) { player.x -= step; player.moves++; }
    if (keyCode === RIGHT_ARROW) { player.x += step; player.moves++; }

    player.x = constrain(player.x, player.size / 2, width - player.size / 2);
    player.y = constrain(player.y, player.size / 2, height - player.size / 2);
  }
  else if (gameState === "WIN" || gameState === "GAMEOVER") {
    if (key === 'r' || key === 'R') {
      player.x = width / 2;
      player.y = height - 90;
      player.moves = 0;
      startTime = 0;
      finishTime = 0;
      gameState = "START";
    }
  }
}