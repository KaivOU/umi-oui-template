import routes from '../../config/routes';
import proxy from '../../config/proxy';
import { resolve } from 'path';
import { IConfigFromPlugins } from '@@/core/pluginConfig';
import { IConfig } from '@umijs/types';
// import CompressionPlugin from 'compression-webpack-plugin';

const { UMI_ENV } = process.env;
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isDev = UMI_ENV === 'dev';

export default function MzConfig(config: IConfigFromPlugins | IConfig) {
    const defaultConfig = {
        // 开启antd
        antd: {},
        // 按需加载，把构建产物进行拆分
        dynamicImport: {},
        // 设置 node_modules 目录下依赖文件的编译方式。默认是 all，全部编译，可切换为 none，默认编译 es5-imcompatible-versions 里声明的依赖
        // 前者速度较慢，但可规避常见的兼容性等问题，后者反之。
        nodeModulesTransform: {
            type: 'none',
            exclude: []
        },
        // 启动cssmodules的驼峰写法
        cssLoader: {
            localsConvention: 'camelCase'
        },
        locale: {
            default: 'zh-CN',
            antd: true,
            // default true, when it is true, will use `navigator.language` overwrite default
            baseNavigator: true,
            baseSeparator: '-'
        },
        // targets: {
        //     ie: 11
        // }
        publicPath: '/',
        // 打包输出的dist路径
        outputPath: '/dist/www/',
        // 允许位置来源图片，微信来源的图片等
        metas: [
            {
                name: 'referrer',
                content: 'never'
            }
        ],
        alias: {
            core: resolve(__dirname, '../')
        },
        // 启动快速刷新
        fastRefresh: {},
        theme: {
            'primary-color': '#00a1d2'
        },
        // 忽略 moment 的 locale 文件，用于减少尺寸
        ignoreMomentLocale: true,
        // chainWebpack(config: any, args: any) {
        //     config.module
        //         .rule('woff')
        //         .test(/.(woff|eot|woff2|ttf)$/)
        //         .use('file-loader')
        //         .loader('file-loader');

        //     if (!isDev) {
        //         config.devtool = false;
        //         config.plugin('CompressionPlugin').use(
        //             new CompressionPlugin({
        //                 algorithm: 'gzip',
        //                 test: productionGzipExtensions,
        //                 // 只处理大于xx字节 的文件，默认：0
        //                 threshold: 10240,
        //                 // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
        //                 minRatio: 0.8, // 默认: 0.8
        //                 // 是否删除源文件，默认: false
        //                 deleteOriginalAssets: false
        //             })
        //         );
        //     }

        //     config.merge({
        //         optimization: {
        //             minimize: false,
        //             splitChunks: {
        //                 chunks: 'all',
        //                 minSize: 30000,
        //                 minChunks: 3,
        //                 automaticNameDelimiter: '.',
        //                 cacheGroups: {
        //                     react: {
        //                         name: 'react',
        //                         priority: 20,
        //                         test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/
        //                     },
        //                     antd: {
        //                         name: 'antd',
        //                         priority: 20,
        //                         test: /[\\/]node_modules[\\/](antd|@ant-design\/icons)[\\/]/
        //                     }
        //                 }
        //             }
        //         }
        //     });
        // },
        routes: routes,
        // @ts-ignore
        proxy: proxy[UMI_ENV || 'dev'],
        title: 'umi'
    };
    return { ...defaultConfig, ...config };
}
