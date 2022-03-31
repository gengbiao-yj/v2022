import './style.css'
class BlackBorad {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private app = el.getContext('2d')!,
    private width: number = el.width,
    private height: number = el.height,
    private btns: HTMLDivElement = document.createElement('div'),
    private bgColor: string = '#000',
    private lineColor: string = '#fff'
  ) {
    this.initCanvas();
    this.bindEvent();
  }

  // 初始化
  private initCanvas() {
    this.app.fillStyle = this.bgColor;
    this.app.fillRect(0, 0, this.width, this.height);
    this.btns.className = 'btn-box';
    this.el.insertAdjacentElement('afterend', this.btns);
    this.write();
  }

  // 事件绑定
  private bindEvent() {
    /**
     * 1) 这里this.drawLine若不绑定this，则this指向 el 即 canvas元素;
     * 2) bind 绑定后返回一个新函数，这里定义变量承接，方便后续解除绑定
     */
    const callBack = this.drawLine.bind(this);
    this.el.addEventListener('mousedown', () => {
      this.app.beginPath();
      this.app.strokeStyle = this.lineColor;
      this.el.addEventListener('mousemove', callBack);
    });
    document.addEventListener('mouseup', () => {
      this.el.removeEventListener('mousemove', callBack);
    })
  }

  // 笔画绘制
  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY);
    this.app.stroke();
  }

  // 加载清除按钮
  public clear() {
    const clearBtn: HTMLButtonElement = document.createElement('button');
    clearBtn.innerText = '清屏';
    this.btns.insertAdjacentElement('afterbegin', clearBtn);
    clearBtn.addEventListener('click', () => {
      this.app.fillStyle = this.bgColor;
      this.app.fillRect(0, 0, this.el.width, this.el.height);
    })
    return this;
  }

  // 加载橡皮擦
  public write() {
    const rubberBtn: HTMLButtonElement = document.createElement('button');
    rubberBtn.innerText = '写字';
    this.btns.insertAdjacentElement('afterbegin', rubberBtn);
    rubberBtn.addEventListener('click', () => {
      this.lineColor = '#fff';
      this.app.lineWidth = 1;
    })
    return this;
  }

  // 加载写字
  public rubber() {
    const rubberBtn: HTMLButtonElement = document.createElement('button');
    rubberBtn.innerText = '橡皮擦';
    this.btns.insertAdjacentElement('afterbegin', rubberBtn);
    rubberBtn.addEventListener('click', () => {
      this.lineColor = this.bgColor;
      this.app.lineWidth = 8;
    })
    return this;
  }

  // 加载截图
  public screenShort() {
    const short: HTMLButtonElement = document.createElement('button');
    const img = document.createElement('img');
    short.innerText = '截图';
    this.btns.insertAdjacentElement('afterbegin', short);
    short.addEventListener('click', () => {
      img.src = this.el.toDataURL('image/jpeg');
    })
    this.btns.insertAdjacentElement('afterend',img);
    return this;
  }

  // 修改背景色
  public setBgColor(color: string) {
    this.bgColor = color;
    this.app.fillStyle = color;
    this.app.fillRect(0, 0, this.el.width, this.el.height);
    return this;
  }

}
const blackBoard = new BlackBorad();
blackBoard.clear().rubber().screenShort();
