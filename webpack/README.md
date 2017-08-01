
### 文件目录结构
src文件夹下为项目代码文件
![目录结构](https://raw.githubusercontent.com/lh199507/JavascriptCode/master/webpack/Dir.png)
* * *
### webpack基本配置文件
由于使用的是[react框架](http://www.css88.com/react/docs/hello-world.html)、[react-dom](http://www.css88.com/react/docs/react-dom.html)、[react-router@3.0.0](http://www.uprogrammer.cn/react-router-cn/docs/API.html)、[antd-mobile](https://mobile.ant.design/docs/react/introduce-cn)，所以采用如下配置，若单纯打包，配置非常简单,可参考[webpack中文文档](https://doc.webpack-china.org/concepts/)。若使用其他框架配置可能需要细微修改
```javascript
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 将样式打包为一个文件
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
        chunkFilename: './[id].chunk.js' // 将js文件异步加载
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
        /* 使用antd-mobile时 resolve必须如下配置，但通常情况 按大众配置即可 */
    }
}
```
* * *
### server.js
使用webpack-hot-middleware和webpack-dev-middleware实时编辑代码。使用express.static设置静态文件目录。
```javascript
var express = require("express");
var path = require('path');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.dev");

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(webpackHotMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
	historyApiFallback:true,
	inline:true ,  //实时刷新
	hot:true
    },
    quiet: true,
}));
var buildPath = "./__build__";
app.use(express.static(path.resolve(__dirname,buildPath)));//设置静态文件目录
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname,buildPath,'./index.html'));
});

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
```
* * *
### .babelrc文件
具体细节可参考[babel文档](http://babeljs.cn/docs/usage/babelrc/)
```javascript
/* 如下配置只是为了满足当前需要文件 */
/* Es6语法编译包括react */
{
    "presets": [
        "es2015",
        "stage-3",
        "react"
    ],
    "plugins": [
        /* */
        ["import", {
          "style": "css",
          "libraryName": "antd-mobile"
        }],
        /**/
        "transform-class-properties",
        "transform-decorators-legacy",
        "syntax-dynamic-import"
    ]
}
```
* * *
### postcss.config.js
由于wenpack中使用了postcss-loader加载器，说在配置中需要创建postcss.config.js。 
    postcss-loader可以不予使用
```javascript
/* 使用postcss-pxtorem的原因是为了兼容antd-mobile的样式问题，若使用其他框架可不予配置 */
const pxtorem = require('postcss-pxtorem');
module.exports = {
    plugins: [
        require('autoprefixer')({}),
        pxtorem({
            rootValue: 57.0,
            propWhiteList: []
        })
    ]
}
```
* * *
配置完成后即可在package.json中配置命令
![package.json命令行配置](https://raw.githubusercontent.com/lh199507/JavascriptCode/master/webpack/package.json.png)

