import qs from 'qs';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { history } from 'core/mz';
import { message } from 'antd';

axios.defaults.withCredentials = true; //发起请求携带cookie(CROS跨域需要服务端的支持)
axios.defaults.headers.common['X-Origin'] = 'test.loreal.visualmaster.com.cn/loreal-red';

// 实例话
const axiosInstance: AxiosInstance = axios.create({
    // baseURL = 'http://localhost:3002'
    //超时时间
    timeout: 5000
});

/**
 * 取消重复请求
 */
function generateReqKey(config) {
    const { method, url, params, data } = config;
    return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}
const pendingRequest = new Map();
function addPendingRequest(config) {
    const requestKey = generateReqKey(config);
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pendingRequest.has(requestKey)) {
                pendingRequest.set(requestKey, cancel);
            }
        });
}
function removePendingRequest(config) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
        const cancelToken = pendingRequest.get(requestKey);
        cancelToken(requestKey);
        pendingRequest.delete(requestKey);
    }
}

//请求拦截
const requestIdx = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
        addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
        // 设置请求头
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            //将token放到请求头发送给服务器,将tokenkey放在请求头中
            config.headers['accessToken'] = token;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);
//清除请求拦截器
if (requestIdx !== 0) {
    axios.interceptors.request.eject(requestIdx);
}

// TODO:后序需要修改的登录方案
const goLogin = () => {
    history.push('/login');
};
// 响应拦截器
const responseIdx = axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            // 处理成功的响应
            removePendingRequest(response.config); // 从pendingRequest对象中移除请求
            return response;
        }
    },
    (error: AxiosError) => {
        removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
        if (axios.isCancel(error)) {
            console.log('已取消的重复请求：' + error.message);
        } else {
            // 添加异常处理
            // 身份验证失败的响应
            const { response } = error;

            // HTTP 状态码
            const status = response?.status;
            const errorMessage = response?.data?.msg || '';
            switch (status) {
                case 401:
                    message.destroy();
                    message.error(errorMessage);
                    goLogin();
                    break;
                case 201:
                case 403:
                    goLogin();
                    break;
                default:
                    message.error(errorMessage);
            }
            console.log(errorMessage, 'response-error-msg');
        }

        return Promise.reject(error);
    }
);
// 清除响应拦截器
if (responseIdx !== 0) {
    axios.interceptors.response.eject(requestIdx);
}

const get = <T, R = ApiResponse<T>>(url: string, params?: any): Promise<R> => {
    // params['_'] = new Date().getTime();
    return axiosInstance.get(url, { params });
};

const post = <T, R = ApiResponse<T>>(url: string, data?: any): Promise<R> => {
    return axiosInstance.post(url, data);
};

const put = <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    return axiosInstance.put(url, data);
};

const delele = <T>(url: string, params?: any): Promise<ApiResponse<T>> => {
    return axiosInstance.delete(url, params);
};

export default { get, post, put, delele };
