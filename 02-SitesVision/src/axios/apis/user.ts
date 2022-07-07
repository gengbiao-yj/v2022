/**
 * 业务 - 注册登录模块
 */
import { http } from '@/axios/index';
import qs from 'qs';
import type { ResponseResult, UserLogin } from '@/types/ResponseResult';

// 登录
function login(Data: object) {
  return http.request<ResponseResult<UserLogin>>({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(Data)
  });
}

export { login };
