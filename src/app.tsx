// import { history } from 'core/mz';

export const request = {
    errorHandler: (error: any) => {
        // 集中处理错误
        console.log(error);
    }
    // prefix: '/getCrowd4Return',
    // prefix: '/',
    // credentials: 'include',
};

//render的配置,渲染之前的权限校验
// export function render(oldRender) {
//     console.log('渲染组件的时候触发的方法');

//     oldRender();
// }

//路由切换的时候触发的方法
// export function onRouteChange() {
//     //如果用户没有登录
//     // if (!sessionStorage.getItem('token')) {
//     //     history.push('/home');
//     // }
//     console.log('路由切换的触发');
// }

/**
 * 初始化用户数据
 * 注：这里可以增加其它基本数据
 */
export async function getInitialState(): Promise<
    Partial<{
        token: string;
        permissions: string[];
        userInfo: any;
    }>
> {
    // 获取个人信息
    // const res = await auth.getInfo();
    // const { user } = res.data;
    // const permissiones: string[] = user?.permission ?? [];
    // window.sessionStorage.setItem('permissions', JSON.stringify(permissiones));
    // // 统一权限管理-获取用户拥有的权限列表
    // const resAuth = await auth.getAuthInfo();
    // // 用户信息
    // const authInfo: IProfileAuthInfoRes = resAuth.data;
    // window.sessionStorage.setItem('access_token', user.access_token);
    const data = {
        id: 5163,
        type: 'EMP',
        permissions: ['DASHBOARD', 'ADMIN'],
        token: 'xxxx',
        email: 'oukj@qq.com',
        username: 'oukaijun'
    };
    const { permissions, token } = data;
    return {
        token,
        userInfo: data,
        permissions
    };
}
