// <T> 定义的各个模块接口返回的数据泛型
interface ResponseResult<T> {
  code: number;
  message: string;
  data: T;
}
/*  User 模块
------------------------------------------------ */
interface UserLogin {
  positionID: number;
  token: string;
  userId: number;
  userName: string;
}

export { ResponseResult, UserLogin };
