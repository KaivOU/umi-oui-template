export default {
    dev: {
        '/api': {
            // target: 'http://fotile-dashboard.yuntai-internal.mlamp.cn/',
            target: 'https://fotile-dashboard-test.miaozhen.com/',
            changeOrigin: true,
            // 默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false
            secure: false,
            // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
            logLevel: 'debug'
        }
    }
};
