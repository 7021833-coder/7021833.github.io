// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let gameState = "START";

// player variables
let player = {
    x: 0,
    y: 0,
    size: 30,
    r: 255,
    g: 100,
    b: 100,
    moves: 0
};
//leaderboard variables
let leaderboard = [];
let enteringName = false;
let currentName = "";


//character color selection
let colorBoxX = [250, 350, 450, 550];
let colorBoxColors = [
    { r: 255, g: 100, b: 100 },
    { r: 100, g: 255, b: 100 },
    { r: 100, g: 150, b: 255 },
    { r: 255, g: 220, b: 100 }
];
let colorBoxY = 260;
let colorBoxSize = 70;

// lane variables
let laneCenters = [150, 250, 350, 450, 550, 650]; // 6 lanes
let laneSpeed = [3, -4, 2.5, -3.5, 3, -5]; // speed for each lane
let laneHeight = 60;
let carWidth = 80;
let carHeight = 35;
let carSpacing = 300; // gap between cars

//timer variables
let startTime = 0;
let finishTime = 0;
//FUNCTIONS

function setup() {
    createCanvas(800, 850);
    rectMode(CENTER); // Center rectangles on their position
    textAlign(CENTER, CENTER);

    //Start position
    player.x = width / 2;
    player.y = height - 90;
}
// main draw loop
function draw() {
    background(30, 30, 40);

    if (gameState === "START") { drawMenu(); }
    else if (gameState === "PLAY") {
        drawEnvironment();
        drawPlayer();
        drawCars();
        checkWin();
        // Display timer
        fill(255);
        textSize(20);
        let timer = (millis() - startTime) / 1000;
        text("Time: " + timer.toFixed(2) + "s", width - 100, 30);
    }
    else if (gameState === "WIN") drawEndScreen("VICTORY!", color(100, 255, 100)); // Green color for win
    else if (gameState === "GAMEOVER") drawEndScreen("GAME OVER", color(255, 80, 80)); // Red color for game over
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

function drawColorBox(x, r, g, b) {
    if (player.r === r && player.g === g && player.b === b) {
        stroke(255);
        strokeWeight(4);
    } else {
        stroke(120);
        strokeWeight(1);
    }
    fill(r, g, b); // Fill with the color of the box for character color selection
    rect(x, colorBoxY, colorBoxSize, colorBoxSize, 12);
}

//end screen
    function drawEndScreen(title, col) {
    background(20, 25, 35);

    fill(col); // Use the color passed as an argument for the title
    textSize(50);
    text(title, width / 2, 120);

    fill(255);
    textSize(20);
    text("Moves: " + player.moves, width / 2, 180); // Display moves on end screen

    if (enteringName) {
        text("Enter Name: " + currentName, width / 2, 240);
        text("Press ENTER to save", width / 2, 280);
      } // Display time only on win screen
      else {
        drawLeaderboard();
        text("Press R to Restart", width / 2, 650);
      } 
}
// to draw the leaderboard with top 5 scores

function drawLeaderboard() {
    textSize(22);
    fill(200);
    text("Leaderboard (Top 5)", width / 2, 320);
// Loop through leaderboard entries and display them
    for (let i = 0; i < leaderboard.length; i++) {
        let entry = leaderboard[i];
        let timeSec = (entry.time / 1000).toFixed(2);
// Display name, moves, and time for each entry
        text(
            (i + 1) + ". " + entry.name +
            " | Moves: " + entry.moves +
            " | Time: " + timeSec + "s",
            width / 2,
            360 + i * 30
        );
    }
}

//game environment
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

//player being drawn
function drawPlayer() {
    push();
    translate(player.x, player.y);
    fill(player.r, player.g, player.b);
    stroke(0);
    strokeWeight(2);
    rect(0, 0, player.size, player.size, 8);
    pop();
}

//cars being drawn and moving in lanes updated to use laneCenters and laneSpeeds arrays
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

// to draw each car with its position and speed
function drawCar(x, y, speed) {
    push();
    translate(x, y);
    if (speed < 0) scale(-1, 1);
    fill(200, 50, 50);
    stroke(0);
    rect(0, 0, carWidth, carHeight, 10);

    // Wheels
    fill(30);
    ellipse(-carWidth / 3, carHeight / 2, 18);
    ellipse(carWidth / 3, carHeight / 2, 18);
    pop();
}

// to check if player hits any car
function checkCollision(x, y) {
    if (playerX + playerSize / 2 > x - carWidth / 2 &&
        playerX - playerSize / 2 < x + carWidth / 2 &&
        playerY + playerSize / 2 > y - carHeight / 2 &&
        playerY - playerSize / 2 < y + carHeight / 2) {
        gameState = "GAMEOVER";
    }
}

//checks if you win by reaching the top grass area
function checkWin() {
    if (playerY < 80) {
        gameState = "WIN";
        finishTime = millis() - startTime; // record finish time
    }
}

//mouse interaction for character color selection in the menu
function mousePressed() {
    if (gameState === "START") {
        if (mouseX > colorBox1X - colorBoxSize / 2 && mouseX < colorBox1X + colorBoxSize / 2 &&
            mouseY > colorBoxY - colorBoxSize / 2 && mouseY < colorBoxY + colorBoxSize / 2) {
            playerRed = 255; playerGreen = 100; playerBlue = 100;
        }
        if (mouseX > colorBox2X - colorBoxSize / 2 && mouseX < colorBox2X + colorBoxSize / 2 &&
            mouseY > colorBoxY - colorBoxSize / 2 && mouseY < colorBoxY + colorBoxSize / 2) {
            playerRed = 100; playerGreen = 255; playerBlue = 100;
        }
        if (mouseX > colorBox3X - colorBoxSize / 2 && mouseX < colorBox3X + colorBoxSize / 2 &&
            mouseY > colorBoxY - colorBoxSize / 2 && mouseY < colorBoxY + colorBoxSize / 2) {
            playerRed = 100; playerGreen = 150; playerBlue = 255;
        }
        if (mouseX > colorBox4X - colorBoxSize / 2 && mouseX < colorBox4X + colorBoxSize / 2 &&
            mouseY > colorBoxY - colorBoxSize / 2 && mouseY < colorBoxY + colorBoxSize / 2) {
            playerRed = 255; playerGreen = 220; playerBlue = 100;
        }
    }
}

//keyboard interaction for other things
function keyPressed() {
    if (gameState === "START" && (key === 's' || key === 'S')) {
        gameState = "PLAY";
        startTime = millis();
    }
    else if (gameState === "PLAY") {
        let step = 35;
        if (keyCode === UP_ARROW) playerY -= step;
        if (keyCode === DOWN_ARROW) playerY += step;
        if (keyCode === LEFT_ARROW) playerX -= step;
        if (keyCode === RIGHT_ARROW) playerX += step;

        playerX = constrain(playerX, playerSize / 2, width - playerSize / 2);
        playerY = constrain(playerY, playerSize / 2, height - playerSize / 2);
    }
    else if (gameState === "WIN" || gameState === "GAMEOVER") {
        if (key === 'r' || key === 'R') {
            playerX = width / 2;
            playerY = height - 60;
            startTime = 0;
            finishTime = 0;
            gameState = "START";
        }
    }
}