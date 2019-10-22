const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
// 是否为开发环境
const isDev = process.env.NODE_ENV === 'development'


const config = {
    mode: isDev ? 'development' : 'production', //开发模式
    entry: {
        app: path.resolve(__dirname, '../client/app.js') //入口文件
    },
    output: {
        path: path.resolve(__dirname, '../dist/'), // 输出路径
        filename: '[name].[hash:8].js' // 输出的文件名（带版本号）
    },
// 模块管理
    module: {
// 规则匹配，并使用loader处理
        rules: [
// 使用babel-loader来处理js文件，及jsx文件
            {
                test: /.(js|jsx)$/i,
                loader: 'babel-loader',
                exclude: path.join(__dirname, '../node_modules'),
                options:{
                    presets:[
                        "env", "react",
                    ]
                }
            }
        ]
    },
// webpack插件
    plugins: [
// 引入模板文件插件
        new HTMLPlugin({
            template: path.resolve(__dirname, '../client/index.html')
        })
    ]
};

if (isDev) {
// webpack-dev-server配置
    config.devServer = {
        headers:{"Access-Control-Allow-Origin":"*"},
        host: '0.0.0.0', // 域名
        port: 8000, // 端口
        contentBase: path.resolve(__dirname, '../dist/'), //静态文件路径
        overlay: true // 开启错误调试
    }
}

module.exports = config;

