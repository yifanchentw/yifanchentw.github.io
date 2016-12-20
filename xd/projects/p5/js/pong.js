var ball;
var p1;
var p2;
var p1Score;
var p2Score;
var winningScore;

var canvas;
var button;
var input;
var inputButton;
var greeting;


function setup() {
    canvas = createCanvas(700, 450);
    canvas.parent('game');

    h1 = createElement('h1', 'my pong project');
    h1.position(windowWidth / 2, 20);

    background(0);
    ball = new Ball(width / 2, height / 2);
    p1 = new Paddle(10, 10, 60);
    p2 = new AIPaddle(width - 60, 10, 60);
    p1Score = 0;
    p2Score = 0;
    winningScore = 10;


    greeting = createElement('p', 'please enter your name!');
    input = createInput();
    inputButton = createButton('submit');
    inputButton.mousePressed(greet);


    button = createButton("↺ Reset Game");
    button.mousePressed(resetGame);

}

function greet() {
    var name = input.value();
    greeting.html('Hello, ' + name + "!");
    text(input.value(), 200, 430);

}

function draw() {
    background(255);
    fill(255);

    rect(3, 0, 655, 449, 20);
    line(327, 0, 327, 449);
    noFill();
    ellipse(width / 2 - 22, height / 2, 80, 80);


    fill(255, 0, 0);
    rect(300, 420, 15, 15);
    rect(350, 420, 15, 15);

    text("Instruction: use up and down arrow keys", width / 2, 10);
    text(input.value(), 200, 430);
    text('computer', 375, 430);
    //We want to check for winners, and if someone has won, stop the game.
    if (p1Score == winningScore) {
        text("you win!", width / 2, height / 2);
        //display win message for player 1
        /*
         *  Add "play again" button? This just could reset the 
         *  p1 and p2 scores and it would work using this code.
         */

    } else if (p2Score == winningScore) {

        text("you lose", width / 2, height / 2);
        //display win message for player 2
        /*
         *  Add (or unhide) "play again" button? This just could reset the 
         *  p1 and p2 scores and it would work using this code.
         */
    } else {
        // nobody has won, play continues
        ball.update();
        ball.display();
        p1.update();
        p1.display();
        p2.update(ball);
        p2.display();
        //check for player one paddle and ball interaction
        leftDefend(ball, p1);
        rightDefend(ball, p2);
    }


    fill(255);
    text(p1Score, 300, 430);
    text(p2Score, 350, 430);



}

function resetGame() {
    location.reload();
}
/**
 * parameters : b is ball, p is paddle
 */
function leftDefend(b, p) {
    //var distance = dist(b.pos.x, b.pos.y, p.pos.x, p.pos.y);
    //check x dimension (horizontal)
    //check left 
    //NEW I changed this to account for the *radius* of the ball, not diameter.
    //Also, I added the logic using the new scored boolean we added to the class.
    var bDist = 0; //ball distance from center of paddle
    if (b.pos.x - b.size / 2 <= p.pos.x + p.size.x) {
        //check if ball is in vertical bounds of paddle
        if (b.pos.y + b.size / 2 >= p.pos.y && b.pos.y - b.size / 2 <= p.pos.y + p.size.y) {
            if (b.scored == false) {
                b.speed.x *= -1;
                bDist = b.pos.y - p.pos.y - p.size.y / 2;
                b.speed.y = map(bDist, -p.size.y / 2 - b.size / 2, p.size.y / 2 + b.size / 2, -10, 10);
            }
        } else {
            b.scored = true;
        }
    }
}



/**
 * parameters : b is ball, p is paddle
 */
function rightDefend(b, p) {
    //var distance = dist(b.pos.x, b.pos.y, p.pos.x, p.pos.y);
    //check x dimension (horizontal)
    //check left NEW (see notes from leftDefend)
    if (b.pos.x + b.size / 2 >= p.pos.x) {
        //check if ball is in vertical bounds of paddle
        if (b.pos.y + b.size / 2 >= p.pos.y && b.pos.y - b.size / 2 <= p.pos.y + p.size.y) {
            if (b.scored == false) {
                b.speed.x *= -1;
            }
        } else {
            b.scored = true;
        }
    }
}

function Paddle(x, hSize, vSize) {
    this.pos = createVector(x, height / 2);
    this.size = createVector(hSize, vSize);
    this.speed = 5;

    this.update = function() {
        var bottom = this.pos.y + this.size.y >= height;
        var top = this.pos.y <= 0;

        if (keyIsPressed && keyCode === UP_ARROW && !top) {
            this.pos.y += -this.speed;
        } else if (keyIsPressed && keyCode === DOWN_ARROW && !bottom) {
            this.pos.y += this.speed;
        }
    }

    this.display = function() {
        fill(0);
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

function AIPaddle(x, hSize, vSize) {
    this.pos = createVector(x, height / 2);
    this.size = createVector(hSize, vSize);
    this.speed = 5;
    this.d = 0;

    //when updating, need the ball's position - pass in ball!
    this.update = function(b) {
        //distance to ball
        this.d = b.pos.y - this.pos.y - this.size.y / 2;
        //adjust speed based on ball position
        var difficulty = map(p1Score - p2Score, -winningScore + 1, winningScore - 1, 20, 6);
        this.speed = this.d / difficulty;
        this.pos.y += this.speed;

    }

    this.display = function() {
        rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    }
}

function Ball(x, y) {
    this.pos = createVector(x, y);
    this.speed = createVector(-8, random(-4, 4));
    this.size = 20;
    //NEW!  This scored variable will catch the glitch where the ball can
    //get stuck "in" the paddle sometimes.
    this.scored = false;

    this.update = function() {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;

        if (this.pos.x >= width) {
            //score point for player 1
            p1Score++;
            //reset ball to center
            this.reset();
        }
        if (this.pos.x <= 0) {
            //score point for player 2
            p2Score++;
            //reset ball to center
            this.reset();
        }

        if (this.pos.y <= 0 || this.pos.y >= height) {
            //reflect the y speed
            this.speed.y *= -1;
        }
    }

    this.display = function() {
        fill(0);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    this.reset = function() {
        this.pos.set(width / 2, height / 2);
        var sM = map(p1Score + p2Score, 0, 18, 5, 15);

        var xSpeed = 0;
        var c = random(-1, 1);
        if (c <= 0) {
            xSpeed = random(-sM, -4);
            //use low value
        } else {
            xSpeed = random(4, sM);
            //use high value
        }

        this.speed.set(xSpeed, random(-sM, sM));
        //NEW!
        this.scored = false;
    }
}