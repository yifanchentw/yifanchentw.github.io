var diameter;
var angle = 0;

var xpos1;
var xpos2;
var xpos3;
var xpos4;
var thin = 8;
var thick = 36;


function setup() {
    createCanvas(windowWidth, windowHeight - 150);
    diameter = height - 10;
    noStroke();

    h1 = createElement('h1', 'my emotion project');
    h1.position(windowWidth / 2, 20);

    xpos1 = width / 2;
    xpos2 = width / 2;
    xpos3 = width / 2;
    xpos4 = width / 2;
}

function draw() {
    background(0);

    var mx = mouseX * 0.4 - width / 5.0;

    fill(102);
    rect(xpos2, 0, thick, height / 2);
    fill(204);
    rect(xpos1, 0, thin, height / 2);
    fill(102);
    rect(xpos4, height / 2, thick, height / 2);
    fill(204);
    rect(xpos3, height / 2, thin, height / 2);

    xpos1 += mx / 16;
    xpos2 += mx / 64;
    xpos3 -= mx / 16;
    xpos4 -= mx / 64;

    if (xpos1 < -thin) { xpos1 = width; }
    if (xpos1 > width) { xpos1 = -thin; }
    if (xpos2 < -thick) { xpos2 = width; }
    if (xpos2 > width) { xpos2 = -thick; }
    if (xpos3 < -thin) { xpos3 = width; }
    if (xpos3 > width) { xpos3 = -thin; }
    if (xpos4 < -thick) { xpos4 = width; }
    if (xpos4 > width) { xpos4 = -thick; }



    var d1 = 10 + (sin(angle) * diameter / 2) + diameter / 2;
    var d2 = 10 + (sin(angle + PI / 2) * diameter / 2) + diameter / 2;

    fill(255, 0, 0);
    ellipse(250, height / 2, d1, d1);
    ellipse(500, height / 3, d1, d2);

    angle += 0.09;

}