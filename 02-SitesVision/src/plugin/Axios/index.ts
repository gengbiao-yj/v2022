import Axios from './Axios';
import { BASE_URL, urlKey } from './config';

/*  业务 - 接口封装
------------------------------------------------ */
const http = new Axios({
  baseURL: BASE_URL.get(process.env.NODE_ENV as urlKey),
  timeout: 100000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    time: new Date().getTime(),
    token: '',
    timestamp: '',
    mode: 'cors'
  }
});

export { http };
