function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    stroke(255, 100);
    strokeWeight(80);}

function draw() {
    background(0, 100);
   
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);
    
    line(x1, y1, x2, y2);}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)}