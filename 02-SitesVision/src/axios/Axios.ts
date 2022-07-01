import axios, { AxiosRequestConfig } from 'axios';
import { ResponseResult } from '@/types/ResponseResult';
export default class Axios {
  private instance; // 实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  /**
   * 请求动作
   * @param config 请求配置
   * <T> 泛型：定义接口返回数据 data 的类型格式
   */
  public request<T>(config: AxiosRequestConfig) {
    // <ResponseResult<T>> 泛型：定义完整的接口返回数据类型格式
    this.instance.request<ResponseResult<T>>(config);
  }
  // 拦截器
  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }
  // 请求拦截器
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  // 响应拦截器
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
}
