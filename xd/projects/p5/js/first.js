//variable creation "Creating the buckets"
var esize;
var xPos;
var yPos;
var inc;
var sinRepeat;

var centerX;
var centerY;
var iter;
var n;

//setup function, no arguments (), runs once
function setup() {
    createCanvas(windowWidth, windowHeight - 150);

    h1 = createElement('h1', 'my first js project');
    h1.position(windowWidth / 2, 20);
    //instantiation .. aka "start"
    esize = 80;
    xPos = 50;
    yPos = 60;
    inc = 0;
    sinRepeat = 0;

    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    iter = 0;
    n = 0;
    console.log("Here is the console message");
}
//draw runs continuously
function draw() {
    //ellipse (x,y,width,height);
    //ellipse(xPos, yPos, esize, esize);

    sinRepeat = sin(inc);
    fill(255, 195, 0);
    stroke(255);
    esize = sin(inc) * 30;
    xPos = sinRepeat * 200 + 300 * .5;
    yPos = windowHeight / 2 + 150 * cos(inc);
    ellipse(xPos, yPos, esize, esize);


    if (mouseIsPressed) {
        //console.log("esize: " + esize);
        fill(136, 18, 252);
        noStroke();
        ellipse(mouseX, mouseY, inc % 50, inc % 50);
    }

    if (keyIsPressed) {
        fill(255, 255, 255, 80);
        rect(0, 0, windowWidth, windowHeight);
    }

    rEllipse(centerX, centerY, 150, 150, 15, .52);

    iter += 4;
    n += .03;

    if (iter > windowWidth) {
        iter = 0;
    }



    // inc = inc + 1; (inc++) increases by one every time that draw runs
    inc += .1;



}

function rEllipse(x, y, w, h, depth, angle) {
    if (depth <= 0) {

    } else {
        ellipse(x, y, w, h);
        x = x + w * .8 * sin(angle);
        y = y + h * .8 * cos(angle);
        angle += .68;
        console.log(map(mouseX, 0, windowWidth, 0, 2 * PI));
        // I liked 4.19
        //angle += map(mouseX, 0, windowWidth, 0, 2 * PI);
        rEllipse(x, y, w * .8, h * .8, depth - 1, angle);
    }
}