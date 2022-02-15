import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class http {
  instance: AxiosInstance

  constructor(props?: AxiosRequestConfig) {
    this.instance = axios.create(props);
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
        return response.data;
      },
      function (error: AxiosError) {
        return Promise.reject(error);
      });
  }

  get<V = undefined>(url: string, params?: any, config?: AxiosRequestConfig) {
    return this.instance.get<V>(url, {
      params: params,
      ...(config ?? {}),
    });
  }
  post<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.post<V>(url, {
      data: params,
      ...(config ?? {}),
    });
  }
  put<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V>(url, {
      data: params,
      ...(config ?? {}),
    })
  }
  delete<V = undefined>(url: string, params: any, config?: AxiosRequestConfig) {
    return this.instance.put<V>(url, {
      data: params,
      ...(config ?? {}),
    })
  }
}

const client = new http({
  baseURL: "/api"
});

export default client;