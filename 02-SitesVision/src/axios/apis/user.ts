/**
 * 业务 - 注册登录模块
 */
import { http } from '@/axios/index';
import qs from 'qs';
import type { ResponseResult, UserLogin } from '@/types/ResponseResult';
import { UserLoginParams } from '@/types/RequestParams';

// 登录
function login(Data: UserLoginParams) {
  return http.request<ResponseResult<UserLogin>>({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(Data)
  });
}

export { login };
