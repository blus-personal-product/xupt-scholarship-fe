import { AUTH_CODE } from '@/config/auth';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as queryString from 'query-string';
import storage from '@/utils/storage';
class http {
  instance: AxiosInstance

  constructor(props?: AxiosRequestConfig) {
    this.instance = axios.create(props);
    this.instance.defaults.withCredentials = true;
    this.requestInterceptors();
    this.responseInterceptors();
  }

  cancel() {
    const source = axios.CancelToken.source();
    return source;
  }

  requestInterceptors() {
    this.instance.interceptors.request.use(
      function (config: AxiosRequestConfig) {
        // Do something before request is sent
        const authCode = storage.get({ key: AUTH_CODE, flag: false });
        if (authCode !== '') {
          config.headers = {
            ...config.headers,
            Authorization: "Bearer " + authCode,
          } as any;
        }
        return config;
      },
      function (error: AxiosError) {
        // Do something with request error
        return Promise.reject(error);
      });
  }

  responseInterceptors() {
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data.data;
      },
      function (error: AxiosError) {
        return Promise.reject(error);
      });
  }

  get<V = undefined>(url: string, params?: any, config?: AxiosRequestConfig) {
    const queryUrl = queryString.stringifyUrl({ url: url, query: params });
    return this.instance.get<V, V, AxiosRequestConfig>(queryUrl, config);
  }
  post<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.post<V, V, AxiosRequestConfig>(url, params, config);
  }
  put<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V, V, AxiosRequestConfig>(url, params, config);
  }
  delete<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V, V, AxiosRequestConfig>(url, params, config);
  }
  postFormData<V = undefined>(url: string, file: FormData) {
    return this.instance.post<V, any, AxiosRequestConfig>(url, file as any, {
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      }
    })
  }
}

const client = new http({
  baseURL: "/api"
});

export default client;