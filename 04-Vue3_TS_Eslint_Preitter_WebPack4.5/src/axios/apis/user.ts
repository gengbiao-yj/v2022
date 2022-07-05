import { http } from '@/axios';
import qs from 'qs';
import { UserLogin } from '@/types/ResponseResult';

// 登录
function login(Data: object) {
  return http.request<UserLogin>({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(Data)
  });
}

export default { login };
