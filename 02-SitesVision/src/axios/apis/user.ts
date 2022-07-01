import { http } from '@/axios';
import qs from 'qs';

class UserApi {
  login(Data: any) {
    return http.request<any>({
      url: '/user/login',
      method: 'post',
      data: qs.stringify(Data)
    });
  }
}

export default new UserApi();
