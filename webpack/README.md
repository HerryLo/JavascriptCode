
### 文件目录结构：
![目录结构](https://raw.githubusercontent.com/lh199507/JavascriptCode/master/webpack/Dir.png)
***

### webpack基本配置文件
```javascript
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 将样式打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var Build_path = path.resolve(__dirname, '__build__/static');
var Html_path = path.resolve(__dirname, 'src/index.html');
const Root_Path = path.resolve(__dirname);
const App_Path = path.resolve(Root_Path, './src');

/* antd-mobile 必须配置 */
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/Img'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
    //devtool: 'source-map', 开发环境 易于调试
    //devtool: 'cheap-module-source-map', 生产环境
    entry: {
        app: './src/index.js',
        /*common: ['react', 'react-router', 'react-dom']*/ 在
    开发环境中可以不用拆分，但在生产中最好拆分},
    output: {
        path: Build_path,
        filename: '[name].js',
        publicPath: './static/',
        chunkFilename: './[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [['es2015', {modules: false}]],
                      plugins: ['syntax-dynamic-import']
                    }
                },
                exclude: /^node_modules$/,
                include: [App_Path]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: ['css-loader','less-loader']})
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader'],
                    publicPath: './'
                })
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[hash:8].[name].[ext]'
                },
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                exclude: /^node_modules$/,
                include: [App_Path]
            }, {
                test: /\.(svg)$/i,
                use: ['svg-sprite-loader'],
                include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            },{
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
                use: ['url-loader']
            }/*{
             test: /\.ts$/,
             use: {
             loader: 'ts-loader'
             },
             exclude: /^node_modules$/
             },*/
        ]
    },
    plugins: [
              /*new webpack.optimize.CommonsChunkPlugin({name: 'common', filename: 'common.js'}),*/
              /*new webpack.optimize.UglifyJsPlugin({
                  include: /\.js$/,
                  minmize: true
              }),*/
              /* html文地址必须注意 */
              new HtmlWebpackPlugin({
                  filename: '../index.html', //生成的html存放路径，相对于
                  template:  Html_path ,
                  hash: false
              }),
              new ExtractTextPlugin({ filename:'./[name].css', allChunks: true })
    ],
    resolve: {
        /* 使用antd-mobile时 resolve必须如下配置，但通常情况 按大众配置即可 */
        mainFiles: ["index.web","index"],// 这里哦
        modules: ['app', 'node_modules', path.join(__dirname, '../node_modules')],
        extensions: [
            '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
            '.js',
            '.jsx',
            '.react.js',
        ],
        mainFields: [
            'browser',
            'jsnext:main',
            'main',
        ]
    }
}
```
***
