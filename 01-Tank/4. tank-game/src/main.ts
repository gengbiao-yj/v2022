import './style.scss'
import config from './config'
import straw from './canvas/straw'
import {images,promises} from "./service/images";

const app = document.querySelector<HTMLDivElement>('#app')!
app.style.width = config.canvas.width + 'px';
app.style.height = config.canvas.height + 'px';

async function bootstrap() {
  await Promise.all(promises);
  straw.render();
  console.log(images.get('straw'));
}
void bootstrap();
