import Axios from '@/axios/Axios';
import { BASE_URL, urlKey } from '@/axios/config';
const http = new Axios({
  baseURL: BASE_URL.get(process.env.NODE_ENV as urlKey),
  timeout: 100000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    time: new Date().getTime(),
    token: sessionStorage.token || '',
    timestamp: sessionStorage.timestamp || '',
    mode: 'no-cors'
  }
});

export { http };
