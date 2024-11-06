
const C = {
    loaded: false,
    // 返回画布的宽高比例
    prop() { return this.height / this.width },
    // 判断当前窗口是否为横向模式
    isLandscape() { return window.innerHeight <= window.innerWidth * this.prop() },
    // 调整画布大小的函数
    resize() {
        if (this.isLandscape()) {
            // 横向模式下设置高度为 100%
            document.getElementById(this.css).style.height = "100%";
            document.getElementById(this.css).style.removeProperty('width');
        } else {
            // 纵向模式下设置宽度为 100%
            document.getElementById(this.css).style.removeProperty('height');
            document.getElementById(this.css).style.width = "100%";
        }
    },
    // 设置画布的宽度、高度、像素密度和CSS样式
    setSize(w, h, p, css) {
        this.width = w, this.height = h, this.pD = p, this.css = css;
    },
    // 创建画布
    createCanvas() {
        this.main = createCanvas(this.width, this.height, WEBGL);  // 创建带有 WEBGL 模式的画布
        pixelDensity(this.pD);  // 设置像素密度
        this.main.id(this.css);  // 设置画布的ID
        this.resize();  // 调整画布大小
    }
};
C.setSize(1500, 2000, 1, 'mainCanvas');  // 初始化画布大小

// 当窗口大小变化时调整画布
function windowResized() {
    C.resize();
}


let palette = ["#7b4800", "#002185", "#003c32", "#fcd300", "#ff2702", "#6b9404"];  // 颜色调色板

// 设置函数，只在开始时运行一次
function setup() {
    C.createCanvas();  // 创建画布
    angleMode(DEGREES);  // 将角度模式设为度数
    background("#fffceb");  // 设置背景颜色
}

// 绘制随机笔刷效果的函数
function drawRandomBrush() {
    // 在鼠标附近选择一个随机位置
    let x = mouseX - width / 2;
    let y = mouseY - height / 2;

    // 从调色板中选择一个随机颜色，并设置透明度
    let col = color(random(palette));
    col.setAlpha(random(60, 100));

    // 设置随机的笔刷宽度、高度和角度
    let brushWidth = random(20, 80);
    let brushHeight = random(20, 80);
    let angle = random(0, 360);

    // 随机决定使用填充还是描边
    if (random() < 0.1) {
        // 填充笔刷效果
        fill(col);
        noStroke();
        ellipse(x, y, brushWidth, brushHeight);  // 使用椭圆来模拟填充笔刷效果
    } else {
        // 描边 + 条纹笔刷效果
        stroke(col);
        strokeWeight(random(1, 5));
        noFill();
        push();
        translate(x, y);
        rotate(angle);
        rect(0, 0, brushWidth, brushHeight);  // 使用矩形来模拟描边笔刷效果

        // 可选的条纹效果
        for (let i = -brushWidth / 2; i < brushWidth / 2; i += random(10, 20)) {
            line(i, -brushHeight / 2, i, brushHeight / 2);
        }
        pop();
    }
}

// 当鼠标移动时触发的函数
function mouseMoved() {
    drawRandomBrush(); // 每次鼠标移动时只绘制一笔随机的笔刷效果
}
