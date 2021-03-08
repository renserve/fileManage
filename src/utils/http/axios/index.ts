// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type {AxiosResponse} from 'axios';
import type {CreateAxiosOptions, RequestOptions, Result,Authorization} from './types';
import {VAxios} from './Axios';
import {getToken} from '/@/utils/auth';
import {AxiosTransform} from './axiosTransform';
import {isArray} from 'lodash-es'
import {checkStatus} from './checkStatus';

import {useSetting} from '/@/hooks/core/useSetting';
import {useMessage} from '/@/hooks/web/useMessage';

import {RequestEnum, ResultEnum, ContentTypeEnum} from '/@/enums/httpEnum';

import {isString} from '/@/utils/is';
import {formatRequestDate} from '/@/utils/dateUtil';
import {setObjToUrlParams, deepMerge} from '/@/utils';
import {errorStore} from '/@/store/modules/error';
import {errorResult} from './const';
import store from '/@/store';
const {globSetting} = useSetting();
const prefix = globSetting.urlPrefix;
const {createMessage, createErrorModal} = useMessage();
const cache = {url:''}
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
    /**
     * @description: 处理响应数据
     */
    transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
        const {isTransformRequestResult} = options;
        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        const {config={},data} = res;
        if (!isTransformRequestResult) {
            if(config.url.indexOf('/cms/user/refresh')>-1){
                store.commit('user/commitTokenState',[`Bearer ${data.access_token}`, `Bearer ${data.refresh_token}`])
            }
            return res.data;
        }
        
        // 错误的时候返回
        const {error_code, msg} = data;
        const {url} = res.config
        if (!data) {
            // return '[HTTP] Request has no return value';
            return Promise.reject(new Error(errorResult));
        }
        //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
        // 这里逻辑可以根据项目进行修改
        // && code === ResultEnum.SUCCESS
        
        if (error_code) {
            if (msg) {
                // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                if (options.errorMessageMode === 'modal') {
                    createErrorModal({title: '错误提示', content: msg});
                } else {
                    createMessage.error(msg);
                }
            }
            return Promise.reject(new Error(msg));
        }
        createMessage.success(msg);
        cache.url=''
        return data;
    },
    
    // 请求之前处理config
    beforeRequestHook: (config, options) => {
        const {apiUrl, joinPrefix, joinParamsToUrl, formatDate} = options;
        if (joinPrefix) {
            config.url = `${prefix}${config.url}`;
        }
        
        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`;
        }
        if (config.method === RequestEnum.GET) {
            const now = new Date().getTime();
            if (!isString(config.params)) {
                config.data = {
                    // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                    params: Object.assign(config.params || {}, {
                        _t: now,
                    }),
                };
            } else {
                // 兼容restful风格
                config.url = config.url + config.params + `?_t=${now}`;
                config.params = undefined;
            }
        } else {
            if (!isString(config.params)) {
                formatDate && formatRequestDate(config.params);
                config.params && Object.keys(config.params).map(k=>{
                    if(isArray(config.params[k])){
                        config.params[k].map((v,index)=>{
                            config.params[`${k}-${index}`]=v
                        })
                        delete config.params[k]
                    }
                })
                config.data = config.params
                config.params = undefined;
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url as string, config.data);
                }
            } else {
                // 兼容restful风格
                config.url = config.url + config.params;
                config.params = undefined;
            }
        }
        return config;
    },
    
    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config) => {
        // 请求之前处理config
        const token = getToken();
        if (token) {
            // jwt token
            if(config.url.indexOf('/cms/user/refresh')>-1){
                config.headers.Authorization = token[1];
            }else {
                config.headers.Authorization = token[0];
            }
        }
        return config;
    },
    
    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: async (error: any) => {
        let {response={},message,config={}} = error || {};
        const {error_code, msg}=response.data || {};
        console.log(JSON.stringify(config.requestOptions),'error_code')
        if(error_code===10050){
            // createAxios({url:'http://127.0.0.1:5000/cms/user/refresh',method: 'get',requestOptions:{isTransformRequestResult: false}})
            if (cache.url !== config.url) {
                cache.url = config.url
                await defHttp.request(
                    {url:'/cms/user/refresh',method: 'get'},
                    {isTransformRequestResult: false}
                )
                await defHttp.request(config,config.requestOptions)
            }
            return
        }
        errorStore.setupErrorHandle(error);
        const err: string = error.toString();
        try {
            if (message.indexOf('timeout') !== -1) {
                createMessage.error('接口请求超时,请刷新页面重试!');
                return;
            }
            if (err && err.includes('Network Error')) {
                createErrorModal({
                    title: '网络异常',
                    content: '请检查您的网络连接是否正常!',
                });
                return;
            }
        } catch (error) {
            throw new Error(error);
        }
        checkStatus(error.response && error.response.status, msg);
        return Promise.reject(new Error(error));
    },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new VAxios(
        deepMerge(
            {
                timeout:1000 * 60 * 60 * 24,
                // 基础接口地址
                // baseURL: globSetting.apiUrl,
                // 接口可能会有通用的地址部分，可以统一抽取出来
                prefixUrl: prefix,
                headers: {'Content-Type': ContentTypeEnum.JSON},
                // 数据处理方式
                transform,
                // 配置项，下面的选项都可以在独立的接口请求中覆盖
                requestOptions: {
                    // 默认将prefix 添加到url
                    joinPrefix: true,
                    // 需要对返回数据进行处理
                    isTransformRequestResult: true,
                    // post请求的时候添加参数到url
                    joinParamsToUrl: false,
                    // 格式化提交参数时间
                    formatDate: true,
                    // 消息提示类型
                    errorMessageMode: 'none',
                    // 接口地址
                    apiUrl: globSetting.apiUrl,
                },
            },
            opt || {}
        )
    );
}

export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
