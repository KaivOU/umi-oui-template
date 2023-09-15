import request from '@/utils/request';
import { getUrl } from '@/utils/url-utils';

//退出
export const getLogoutUrl = getUrl('/auth/logout');

export const fetchLogout = (params?: any) => {
    return request.post(getLogoutUrl, params);
};

// export const useLogin = (options = {}) => {
//     return useRequest(login, options);
// };
