var express = require("express");
var path = require('path');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.dev");

var app = express();
var compiler = webpack(webpackConfig);
var open = require("open");
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
    open("http://127.0.0.1:3000")
});
