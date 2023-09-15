import request from '@/utils/request';
import { getLoginUrl } from '@/service/urlConfig/login';

export default () => {
    const fetchLogin = async (
        params: { userAccount: string; password: string },
        callBack: Function
    ) => {
        const res = await request.post(getLoginUrl, params);

        const code = res.code;
        if (code === 'A0220') {
            if (res.message === '用户名或密码错误') {
                callBack({ text: '用户名或密码错误', status: false });
            } else if (res.message === '无产品权限') {
                callBack({ text: '无产品权限', status: false });
            }
        } else {
            sessionStorage.setItem('userName', res.data.userName);
            callBack({ text: '登陆成功', status: true });
        }
    };
    return {
        fetchLogin
    };
};
