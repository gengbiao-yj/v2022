import {images} from "../service/images";
import config from "../config";

export default abstract class modelAbstract {
  constructor(protected canvas: CanvasRenderingContext2D, protected x: number, protected y: number) {
    this.canvas.drawImage(images.get('straw')!, x, y, config.model.width, config.model.height);
  }
}