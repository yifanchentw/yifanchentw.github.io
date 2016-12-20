var circle1 = {
    x: 0,
    y: 100,
    diameter: 50
};

var circle2 = {
    x: 0,
    y: 400,
    diameter: 100
};

var r = 0;
var g = 150;
var b = 255;

var speed = 3;

var centerX;
var centerY;
var b2;
var bobs;

function setup() {
    createCanvas(windowWidth, windowHeight - 150);

    h1 = createElement('h1', 'my object project');
    h1.position(windowWidth / 2, 20);

    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    b2 = new bob(40, 100);
    bobs = new Array();
    for (var i = 0; i < 1; i++) {
        append(bobs, new bob(50 + 20 * i, windowHeight / 2, random(0, TWO_PI)));
    }
}

function draw() {
    r = map(mouseX, 0, windowWidth, 0, 255);
    b = map(mouseX, 0, windowWidth, 255, 0);
    noStroke();
    background(r, 0, b);
    fill(r, g, b);

    ellipse(circle1.x, circle1.y, circle1.diameter, circle1.diameter);
    circle1.x = circle1.x + 3;
    circle1.y = circle1.y + 1;
    circle1.diameter = circle1.diameter + 1;

    ellipse(circle2.x, circle2.y, circle2.diameter, circle2.diameter);
    if (circle2.x > windowWidth || circle2.x < 0) {
        speed = -speed;
    }
    circle2.x = circle2.x + speed;

    noFill();
    stroke(r, g, b);

    r = r + 1;
    g = g + 1;
    b = b + 1;

    b2.dance();
    b2.display();
    for (var i = 0; i < bobs.length; i++) {
        if (keyIsPressed) {
            bobs[i].dance();
        }
        bobs[i].display();
    }
}

function mousePressed() {
    append(bobs, new bob(mouseX, mouseY));
}

function bob(x, y, seed = 0) {

    this.x = x;
    this.y = y;
    this.iter = seed;
    //moveBob moves to the right. 
    this.moveBob = function() {
            this.x++;
        }
        //moves bob in a small pattern.
    this.dance = function() {
        this.x += sin(this.iter);
        this.y += cos(random(0, TWO_PI));
    }
    this.display = function() {
        ellipse(this.x, this.y, 60, 60);
        //bezier (x, y, cx1, cy1, cx2, cys, x2, y2);

        bezier(windowWidth / 2, 0,
            this.x, this.y,
            this.x, this.y * 3,
            windowWidth / 2, windowHeight);
        this.iter = this.iter + .1;
        //thus.iter += 0.5
    }
}