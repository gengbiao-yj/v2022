// 断言：必须是canvas 元素，且不为空
const el = document.querySelector<HTMLCanvasElement>("#canvas")!;
const app = el.getContext("2d")!;

/**
 * 绘制填充矩形
 *  1) 定义填充颜色
 *  2) 绘制填充矩形：起始x/y 结束x/y
 */
// app.fillStyle = '#95a5a6';
// app.fillRect(0,0,299,299);

// app.fillStyle = '#9b59b6';
// app.fillRect(el.width / 2 -50,el.height / 2 -50,100,100);

/**
 * 绘制边框矩形
 *  1) 定义线条颜色
 *  2) 定义线条粗细
 *  3) 定义线条倒角
 *  4) 绘制边框矩形：起始x/y 结束x/y
 */
// app.strokeStyle = '#9b59b6';
// app.lineWidth = 12;
// app.lineJoin = 'round';
// app.strokeRect(50,50,200,200);

/**
 * 绘制填充圆（圆形的定义与绘制方法是分开的 arc fill）
 *  1) 定义填充颜色
 *  2) 绘制填充圆：起始圆心x/y 半径 起始角度 结束角度
 */
// app.fillStyle = '#f39c12';
// app.arc(150,150,80,0,2*Math.PI);
// app.fill();

/**
 * 绘制边框圆（圆形的定义与绘制方法是分开的 arc stroke）
 *  1) 定义线条颜色
 *  2) 定义线条粗细
 *  3) 绘制边框圆：起始圆心x/y 半径 起始角度 结束角度
 */
// app.strokeStyle = '#e74c3c';
// app.lineWidth = 8;
// app.arc(150,150,100,0,2*Math.PI);
// app.stroke();

/**
 * 记录点并绘制多边形
 *  1) 开始记录点位
 *  2) 移动到起始点
 *  3) 新增连接点
 *  4) 闭合已有点形成多边形
 *  5) 定义线条颜色 【根据调用的方法不同，也可以定义填充颜色】
 *  6) 绘制多边形边框 【根据调用的方法不同，也可以绘制填充多边形】
 */
// app.beginPath();
// app.moveTo(el.width / 2,20);
// app.lineTo(280, 200);
// app.lineTo(20, 200);
// app.closePath();
// app.strokeStyle = '#8e44ad';
// app.lineWidth = 10;
// app.stroke();

/**
 * 定义渐变色
 */
const gradient = app.createLinearGradient(0, 0, 300, 300);
gradient.addColorStop(0, "#55efc4");
gradient.addColorStop(0.25, "#81ecec");
gradient.addColorStop(0.5, "#74b9ff");
gradient.addColorStop(0.75, "#a29bfe");
gradient.addColorStop(1, "#6c5ce7");

// app.strokeStyle = gradient;
// app.lineWidth = 20;
// app.lineJoin = 'round';
// app.strokeRect(25,25,120,120);

// app.fillStyle = gradient;
// app.fillRect(160,160,120,120);

/**
 * 绘制文字
 * 1) 绘制背景色
 * 2) 绘制填充字体
 * 3) 绘制边框字体
 */
// app.fillStyle = "#34495e";
// app.fillRect(0,0,el.width,el.height);

// app.fillStyle = "#e67e22"; // 设置填充子颜色
// app.font = "30px Arial"; // 设置字体大小和类型
// app.textBaseline = "top" // 设置字体对齐的基线
// app.fillText("沐沐宝贝", 50 ,0, 100);

// app.lineWidth = 2;
// app.font = "50px Arial"; // 设置字体大小和类型
// app.strokeStyle = gradient;
// app.textBaseline = "top";
// app.strokeText("我爱沐沐",100,100,180);

/**
 * 贴图
 *  1) 创建图片
 *  2) 加载图片
 *  3) 创建填充背景图
 *  4) 定义尺寸绘制填充贴图
 */
// const img = document.createElement('img');
// img.src = '../images/img1@200_200.jpeg';
// img.onload = () => {
//   const pattern = app.createPattern(img, 'repeat')!;
//   app.fillStyle = pattern;
//   app.fillRect(0,0,300,300);
// }

/**
 * 绘制图片
 */
// const img = document.createElement('img');
// img.src = '../images/img1@200_200.jpeg';
// img.onload = () => {
//   app.fillStyle = gradient
//   app.fillRect(0,0,300,300);
//   app.drawImage(img,50,50,200,200); // 绘制的图片，初始位置x/y 绘制后的尺寸w/h
// }

/**
 * 绘制图片，画布与图片尺寸自适应
 */
// const img = document.createElement('img');
// img.src = '../images/img1@200_200.jpeg';
// function scale(img: HTMLImageElement, el: HTMLCanvasElement) {
//   return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight);
// }
// img.onload = () => {
//   el.width = img.naturalWidth * scale(img, el);
//   el.height = img.naturalHeight * scale(img, el);
//   app.drawImage(img, 0, 0, el.width, el.height); // 绘制的图片，初始位置x/y 绘制后的尺寸w/h
// }

/**
 * 填充杂色矩形
 */
// el.width = 500;
// el.height = 500;
// app.fillStyle = "#000";
// app.fillRect(0,0,el.width,el.height);
// for(let i = 0; i < 1000; i++) {
//   app.fillStyle = "#fff";
//   app.fillRect(el.width * Math.random(), el.height * Math.random(), 5, 5);
// }

/**
 * 填充杂色圆形
 */
el.width = 500;
el.height = 500;
function drawArc() {
  app.clearRect(0, 0, el.width, el.height); // 指定范围内清空画布
  app.fillStyle = "#000";
  app.fillRect(0, 0, el.width, el.height);
  for (let i = 0; i < 50; i++) {
    app.beginPath(); // 每次刷新页面重新绘制圆形
    app.fillStyle = ["#00a8ff", "#9c88ff", "#fbc531", "#4cd137", "#487eb0"].sort(
      () => (Math.floor(Math.random() * 3) ? 1 : -1)
    )[0];
    app.arc(
      Math.random() * el.width,
      Math.random() * el.height,
      5 + Math.random() * 10,
      0,
      2 * Math.PI
    );
    app.fill();
  }
}
setInterval(() => {
  drawArc();
}, 800)

