declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
    export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
    const url: string;
    export default url;
}

interface IDefaultData {
    // 添加任意值, T不传时也不会提示报错
    [keyword: string]: any;
}
// 通用接口返回类型
declare interface ApiResponse<T> {
    data: T & IDefaultData;
    code: number | string;
    message: string;
    msg: string;
}
