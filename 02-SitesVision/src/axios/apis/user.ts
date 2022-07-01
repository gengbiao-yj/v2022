import { http } from '@/axios';
import qs from 'qs';

class UserApi {
  // 登录
  login(Data: any) {
    return http.request<any>({
      url: '/user/login',
      method: 'post',
      data: qs.stringify(Data)
    });
  }
}

export default new UserApi();
