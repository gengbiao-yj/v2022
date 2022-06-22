// canvas 图层抽象类
import config from '../config'
import {images} from "../service/images";

export default abstract class canvasAbstract {
  protected items = []; // 画布内元素，比如草地块、坦克模型、砖墙快
  abstract render(): void; // 抽象函数是单子继承给子类的，并且子类可以通过其调用父类方法
  // 构造函数
  constructor(
    protected app = document.querySelector('#app') as HTMLDivElement,
    protected el = document.createElement('canvas'),
    protected canvas = el.getContext('2d')!
  ) {
    this.createCanvas();
  }

  // 绘制图层
  protected createCanvas() {
    this.el.width = config.canvas.width;
    this.el.height = config.canvas.height;
    this.app.insertAdjacentElement('afterbegin', this.el);
  }

  // 绘制元素
  protected drawModels(num: number) {
    Array(num).fill('').forEach(() => {
      const position = this.position();
      this.canvas.drawImage(images.get('straw')!, position.x, position.y, config.model.width, config.model.height);
    })
  }

  // 获取随机位置
  protected position() {
    return {
      x: 20,
      y: 20
    }
  }
}