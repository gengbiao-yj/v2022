// 草地 canvas 图层
import canvasAbstract from "./canvasAbstract";
import config from "../config";
import strawModel from "../model/straw";

class straw extends canvasAbstract {
  render(): void {
    super.drawModels(config.straw.num, strawModel);
  }
}

export default new straw();