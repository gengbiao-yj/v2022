// 草地 canvas 图层
import canvasAbstract from "./canvasAbstract";
import config from "../config";
class straw extends canvasAbstract{
  render(): void {
    super.drawModels(config.straw.num);
  }
}

export default new straw();