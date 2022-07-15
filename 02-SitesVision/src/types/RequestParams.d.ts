/**
 * 各业务接口请求参数的类型集合
 */

/*  业务 - User 模块各接口的请求参数泛型
------------------------------------------------ */
interface UserLoginParams {
  loginName: string; // 账号
  pwd: string; // 密码
  browser: string; // 浏览器信息
  userName: string; // 对接系统用户
  positionID: number; // 对接系统部门ID
}

export type { UserLoginParams };
