let CharArr = 
["School",
  "of",
  "the",
  "Art",
  "Institute",
  "of",
  "Chicago"];
let speed =10;
// let char;
let stream;
let streams = [];
let charSize = 90;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  textSize(charSize);
  // char = new Char(width / 1, 0, speed);
  let x = 0;
  for (let i = 0; i < width / charSize; i++) {
    stream = new Stream()
    stream.generateChar(x, random(height));
    streams.push(stream);
    x += charSize;
  }
}

function draw() {
  background(0, 130);
  // char.render();
  streams.forEach(function (stream) {
    stream.render();
  });
}

//单个字符的类
class Char {
  constructor(x, y, speed, opacity, lighter) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.value;
    this.opacity = opacity;
    this.lighter = lighter;
  }

  setToRandomChar() {
    if (frameCount % round(random(5, 3)) == 0) {
      this.value = CharArr[round(random(CharArr.length - 1))];
    }
  }

  rain() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

  // render() {
  //   fill(0, 255, 70);
  //   text(this.value, this.x, this.y);
  //   this.setToRandomChar();
  //   this.rain();
  // }
}

//多个字符一组的类
class Stream {
  constructor() {
    this.chars = [];
    this.amount = round(random(height / charSize / 2, height / charSize / 2));
    this.speed = random(2, 4);
    this.opacity;
    this.lighter;
  }
  generateChar(x, y) {
    this.opacity = 300;
    this.lighter = (round(random(0, 300)) == true);
    for (let i = 0; i < this.amount; i++) {
      let char = new Char(x, y, this.speed, this.opacity, this.lighter)
      char.setToRandomChar();
      this.chars.push(char);
      this.chars[round(random(this.chars.length - 1))].opacity = round(random(50, 2))
      y -= charSize;
      this.lighter = false;
    }
  }
  render() {
    this.chars.forEach(function (char) {
      if (char.lighter) {
        fill(210, 255, 230, 240)
      } else {
        fill(0, 255, 170, char.opacity);
      }
      text(char.value, char.x, char.y);
      char.setToRandomChar();
      char.rain();
    });
  }
}