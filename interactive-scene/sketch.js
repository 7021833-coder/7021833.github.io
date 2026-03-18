//Name: Zain Ahmad Zaram
//Date: 3/3/3026
//Assignment: Interactive Scene: Crossy Road

//STATE VARIABLES
// game state (win, game over, start, play)
let gameState = "START";

// player variables
let playerX, playerY;
let playerSize = 30;
let playerRed = 255, playerGreen = 100, playerBlue = 100;

//character color selection
let colorBox1X = 250, colorBox2X = 350, colorBox3X = 450, colorBox4X = 550;
let colorBoxY = 260;
let colorBoxSize = 70;

// lane variables
let laneY = [140, 210, 280, 350, 420]; // 5 lanes
let laneSpeed = [3, -4, 2.5, -3.5, 3]; // speed for each lane
let carWidth = 80;
let carHeight = 40;
let carSpacing = 300; // gap between cars

//timer variables
let startTime = 0;
let finishTime = 0;
//FUNCTIONS

function setup() {
    createCanvas(800, 600);
    rectMode(CENTER); // Center rectangles on their position
    textAlign(CENTER, CENTER);

    //Start position
    playerX = width / 2;
    playerY = height - 60;
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

    drawColorBox(colorBox1X, 255, 100, 100);
    drawColorBox(colorBox2X, 100, 255, 100);
    drawColorBox(colorBox3X, 100, 150, 255);
    drawColorBox(colorBox4X, 255, 220, 100);

    noStroke();
    fill(200);
    text("Press S to Start", width / 2, 350);
}

function drawColorBox(x, r, g, b) {
    if (playerRed === r && playerGreen === g && playerBlue === b) {
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
    fill(col); // Use the color passed in for win/lose
    textSize(60);
    text(title, width / 2, height / 2 - 20);

    // Display time only on win screen
    fill(200);
    textSize(22);
    if (gameState === "WIN") {
        text("Your Time: " + (finishTime / 1000).toFixed(2) + "s", width / 2, height / 2 + 20);
        text("Press R to Restart", width / 2, height / 2 + 60);
    } else {
        text("Press R to Restart", width / 2, height / 2 + 40);
    }
}

//game environment
function drawEnvironment() {
    noStroke();

    //grass
    fill(40, 160, 60);
    rect(width / 2, height - 50, width, 100);
    rect(width / 2, 50, width, 100);

    //trees being drawn (loop)
    for (let x = 50; x < width; x += 150) {
        drawTree(x, height - 80);
        drawTree(x, 80);
    }

    //road markings (nested loops)
    stroke(255, 150);
    strokeWeight(3);
    for (let lane = 0; lane < laneY.length; lane++) {
        for (let x = 0; x < width; x += 50) {
            line(x, laneY[lane], x + 25, laneY[lane]);
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
    translate(playerX, playerY);
    stroke(0);
    strokeWeight(2);
    fill(playerRed, playerGreen, playerBlue);
    rect(0, 0, playerSize, playerSize, 8);
    pop();
}

//cars being drawn and moving in lanes
function drawCars() {
    for (let lane = 0; lane < laneY.length; lane++) {
        for (let carIndex = 0; carIndex < 3; carIndex++) {
            // Car moves in loop using frameCount * speed
            let x = (frameCount * laneSpeed[lane] + carIndex * carSpacing) % (width + carWidth) - carWidth / 2;
            drawCar(x, laneY[lane], laneSpeed[lane]);
            checkCollision(x, laneY[lane]);
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

//THINGS THAT WERE NEW TO ME, FORGOT OR ACCIDENTALLY DISCOVERED:

//constraint to keep player within canvas bounds
//push() and pop() to isolate transformations for player and cars
//push() saves the current drawing state, and pop() restores it
//rectMode(CENTER) to draw rectangles from their center point, making positioning easier
//textAlign(CENTER, CENTER) to center text both horizontally and vertically
//rectangles can be drawn with rounded corners by adding radius (x,y,width,height,radius) {this is the accidental discovery part}
//elipses can be drawn with ellipse(x, y, width, height)
//text can be drawn with text(string, x, y) and textSize(size) to set the font size
//you can measure how long an array is with array.length, learned this in my c++ days but forgot about it