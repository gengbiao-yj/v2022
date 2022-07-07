/*  业务 - <T> 定义的各个模块接口返回的数据泛型
------------------------------------------------ */
interface ResponseResult<T> {
  code: number;
  message: string;
  data: T;
}

/*  业务 - User 模块
------------------------------------------------ */
interface UserLogin {
  positionID: number;
  token: string;
  userId: number;
  userName: string;
}

/*  第三方 - 高德地图
------------------------------------------------ */
interface AmapV3IP {
  city: string; // 城市名称
  province: string; // 省份名称
  rectangle: string; // 城市所在矩形区域，左下右上对标对坐标集
  status: '0' | '1'; // 返回状态值
  adcode: string; // 城市 adcode 编码
}

export type { ResponseResult, UserLogin, AmapV3IP };
