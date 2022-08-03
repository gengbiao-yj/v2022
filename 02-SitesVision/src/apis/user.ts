/**
 * 业务 - 注册登录模块
 */
import { http } from '@/plugin/Axios/index';
import qs from 'qs';
import type { ResponseResult, UserLogin, UserLoginParams } from '@/types/index';

// 登录
function login(Data: UserLoginParams) {
  return http.request<ResponseResult<UserLogin>>({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(Data)
  });
}

export { login };
