var centerX;
var centerY;
var b2;
var people;

function setup() {
    createCanvas(windowWidth, windowHeight);
    //initialize variables
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    //initialize array
    people = new Array();
    for (var i = 0; i < 200; i++) {
        //add people to the array
        append(people, new Person(centerX, centerY, i * 10));
    }
    b2 = new Person(200, 300, 0);
}

function draw() {

    background(255);
    noStroke();

    for (var i = 0; i < people.length; i++) {
        if (keyIsPressed) {
            people[i].twitch();
        }
        people[i].display();
        people[i].move();
    }

    //only twitch on keyboard down
    if (keyIsPressed) {
        b2.twitch();
    }

    b2.display();
}

//mouse click function
function mousePressed() {
    //create fifty persons on click
    for (var i = 0; i < 50; i++) {
        //add people to the array
        append(people, new Person(mouseX, mouseY, i * 10));
    }
    //append(people, new Person(mouseX, mouseY, random(10)));
}


//Object Person takes in an X, Y starting position. 
//Seed provides variation to the sin function so they all don't move in sync
function Person(x, y, seed = 0) {

    this.radius = random(10);
    this.x = x;
    this.y = y;
    this.dir = random(-6, 6);
    this.dirY = random(-6, 6);
    this.gravity = this.radius * 0.1;
    this.color = color(0, 0, 255);
    this.iter = seed;

    this.move = function() {
        if (this.x + this.radius > windowWidth || this.x - this.radius < 0) {
            this.dir = -this.dir;
        }

        if (this.y + this.radius > windowHeight || this.y - this.radius < 0) {
            this.dirY = -this.dirY;
        }
        this.x += this.dir;
        this.y += this.dirY;

        this.dirY += this.gravity;
    }

    this.twitch = function() {
        this.x += .9 * sin(this.iter);
        this.y += .9 * random(-1, 1);
    }

    this.display = function() {
        fill(this.color);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        this.iter += .2;
    }

}