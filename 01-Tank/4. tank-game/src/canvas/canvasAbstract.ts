// canvas 图层抽象类
import config from "../config";

export default abstract class canvasAbstract {
  protected items = []; // 画布内元素，比如草地块、坦克模型、砖墙快
  abstract render(): void; // 抽象函数是单子继承给子类的，并且子类可以通过其调用父类方法
  // 构造函数
  constructor(
    protected app = document.querySelector("#app") as HTMLDivElement,
    protected el = document.createElement("canvas"),
    protected canvas = el.getContext("2d")!
  ) {
    this.createCanvas();
  }

  // 绘制图层
  protected createCanvas() {
    this.el.width = config.canvas.width;
    this.el.height = config.canvas.height;
    this.app.insertAdjacentElement("afterbegin", this.el);
  }

  // 绘制元素
  protected drawModels(num: number, model: any) {
    this.positionCollection(num).forEach((position) => {
      new model(this.canvas, position.x, position.y);
    });
  }

  // 批量获取唯一坐标(排除重复坐标)
  protected positionCollection(num: number) {
    const collection = [] as { x: number; y: number }[];
    for (let i = 0; i < num; i++) {
      while (true) {
        const position = this.position();
        const exists = collection.some(
          (e) => e.x == position.x && e.y == position.y
        );
        if (!exists) {
          collection.push(position);
          break;
        }
      }
    }
    return collection;
  }

  // 获取随机位置
  protected position() {
    return {
      x:
        Math.floor(Math.random() * (config.canvas.width / config.model.width)) *
        config.model.width,
      y:
        Math.floor(
          Math.random() * (config.canvas.height / config.model.height)
        ) * config.model.height,
    };
  }
}
