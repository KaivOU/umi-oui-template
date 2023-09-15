const env = process.env.UMI_ENV || 'dev';
// url前缀
const urlCongif: any = {
    dev: '/api', //https://yapi.mlamp.cn/mock/867
    test: '/services',
    prod: '/services'
};
const getUrl = (url: string) => {
    return `${urlCongif[env]}${url}`;
};
export { getUrl };
