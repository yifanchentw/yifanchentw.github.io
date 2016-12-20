// Sketch One
var s = function(p) {
    var circle = {
        x: 0,
        y: 250,
        diameter: 50
    };
    var speed = 3;

    p.setup = function() {
        p.createCanvas(1240, 350);

    };

    p.draw = function() {
        p.background(255, 197, 197);
        p.noStroke();
        p.fill(255);
        p.ellipse(circle.x, circle.y, circle.diameter, circle.diameter);

        if (circle.x > p.windowWidth || circle.x < 0) {
            speed = -speed;
        }
        circle.x = circle.x + speed;
    };
};
var myp5 = new p5(s);

// Sketch Two
var t = function(p) {
    var diameter;
    var angle = 0;
    p.setup = function() {
        p.createCanvas(1240, 350);
        diameter = p.height - 10;
        p.noStroke();
        p.fill(164, 146, 237);
    };

    p.draw = function() {
        p.background(160, 243, 252);
        var d1 = 10 + (p.sin(angle) * diameter / 2) + diameter / 2;
        var d2 = 10 + (p.sin(angle + p.PI / 2) * diameter / 2) + diameter / 2;
        var d3 = 10 + (p.sin(angle + p.PI) * diameter / 2) + diameter / 2;

        p.ellipse(0, p.height / 2, d1, d1);
        p.ellipse(p.width / 2, p.height / 2, d2, d2);
        p.ellipse(p.width, p.height / 2, d3, d3);

        angle += 0.02;

    };
};
var myp5 = new p5(t);

// Sketch Three
var u = function(p) {
    p.setup = function() {
        p.createCanvas(1240, 350);
    };

    p.draw = function() {
        p.background(156, 254, 149);
        p.noStroke();
        p.fill(255);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
};
var myp5 = new p5(u);

//Sketch Four
var v = function(p) {
    var x = 100;
    var y = 100;
    p.setup = function() {
        p.createCanvas(1240, 400);

    };

    p.draw = function() {
        p.background(211, 151, 252);
        p.noStroke();
        p.fill(255);
        p.drawCircle(p.width / 2, 280, 6);
    };


    p.drawCircle = function(x, radius, level) {
        var tt = 126 * level / 4.0;
        p.fill(tt);
        p.ellipse(x, p.height / 2, radius * 2, radius * 2);
        if (level > 1) {
            level = level - 1;
            p.drawCircle(x - radius / 2, radius / 2, level);
            p.drawCircle(x + radius / 2, radius / 2, level);
        };
    };
};

var myp5 = new p5(v);

//Sketch Five
var w = function(p) {

    p.setup = function() {
        p.createCanvas(1240, 400);
    };

    p.draw = function() {
        p.background(164, 146, 237);
        p.noStroke();
        for (var i = 0; i < p.height; i += 20) {
            p.fill(129, 206, 15);
            p.rect(0, i, p.width, 10);
            p.fill(255);
            p.rect(i, 0, 10, p.height);
        };
    };
};

var myp5 = new p5(w);