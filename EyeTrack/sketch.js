// 24个时钟表情
let emojis = [
  "🕕", "🕧", "🕐", "🕜", "🕑", "🕝", "🕒", "🕞", 
  "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢", 
  "🕗", "🕣", "🕘", "🕤", "🕙", "🕥", "🕚", "🕦"
];

let randomEmoji;//定义当前显示的表情
let emojiX, emojiY; // 定义表情的位置
let displayTime = 10; // 定义表情显示时间
let timer = 0; // 计时器

let stars = []; // 星光组
let isEyeVisible = true; // 当前眼睛可见性
let lastEyeVisibility = true; // 上一次的眼睛可见性

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#222222");
  textSize(80);
  textAlign(CENTER, CENTER);

  // 设置WebGazer监听：webgazer.setGazeListener()是一种访问这些预测的便捷方式。此方法每隔几毫秒调用一次您提供的回调，以提供用户当前的注视位置。
  webgazer
    .setGazeListener((data) => {
      isEyeVisible = !!data; // 判断眼睛是否可见

      // 检测眨眼（从不可见到可见）
      if (!lastEyeVisibility && isEyeVisible) {
        triggerBlinkAction();
      }

      // 更新上一次的眼睛可见状态
      lastEyeVisibility = isEyeVisible;
    })
    .begin();
}

function draw() {
  background("#222222");

  // 显示随机表情
  if (randomEmoji && timer < displayTime) {
    fill(255);
    text(randomEmoji, emojiX, emojiY);
    timer++;
  } else if (timer >= displayTime) {
    addStars();
    timer = 0;
    randomEmoji = null;
  }

  // 绘制星光效果
  drawStars();
}

function drawStars() {
  for (let i = stars.length - 1; i >= 0; i--) {
    let star = stars[i];
    fill(255, star.alpha);
    noStroke();
    ellipse(star.x, star.y, star.size);

    // 逐渐减小透明度
    star.alpha -= 5;
    if (star.alpha <= 0) {
      stars.splice(i, 1); // 移除透明度为0的星光
    }
  }
}

function mousePressed() {
  triggerBlinkAction();
}

function triggerBlinkAction() {
  // 随机选择并显示一个emoji
  randomEmoji = random(emojis);

  // 设置边距，防止表情超出屏幕
  let margin = 40; // 边距值，基于文本大小或其他需要
  emojiX = random(margin, width - margin);
  emojiY = random(margin, height - margin);

  console.log("眨眼触发，显示新的emoji:", randomEmoji);
}

function addStars() {
  for (let i = 0; i < 20; i++) {
    stars.push({
      x: emojiX + random(-50, 50),
      y: emojiY + random(-50, 50),
      size: random(2, 5),
      alpha: 255
    });
  }
}
