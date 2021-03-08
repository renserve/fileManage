import type { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform';

export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  //  是否处理请求结果
  isTransformRequestResult?: boolean;
  // 是否加入url
  joinPrefix?: boolean;
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal';
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}
export interface Authorization{
    access_token?: string;
    refresh_token?: string;
}
export interface Result extends Authorization{
    error_code: number;
    type: 'success' | 'error' | 'warning';
    msg: string;
    request: string;
}
// multipart/form-data：上传文件
export interface UploadFileParams {
  // 其他参数
  data?: { [key: string]: any };
  // 文件参数的接口字段名
  name?: string;
  title?: string;
  // 文件
  files: File | Blob;
  // 文件名
  filename?: string;
  [key: string]: any;
}
