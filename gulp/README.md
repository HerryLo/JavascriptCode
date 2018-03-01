## Gulp

Gulp.js 是一个自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务。

  [gulp压缩丑化](#gulp进行压缩和丑化)

  [gulp与babel配合](#gulp和babel配合使用)

### gulp进行压缩和丑化
```javascript
/* 可使用gulp编译压缩文件 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    babel = require('gulp-babel');
    /* 以上依赖必须使用npm安装 */

gulp.task('testHtmlmin',function() {
    var options = {
        //removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        //collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        //removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        //removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

//压缩css
gulp.task('minifycss', function () {
    return gulp.src('./css/*.css')    //需要操作的文件
        .pipe(rename({suffix: ''}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('dist/css'));   //输出文件夹
});
//压缩,合并 js
gulp.task('minifyjs', function () {
    return gulp.src('./js/*.js')   //需要操作的文件
        .pipe(babel())
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('dist/js'));       //输出到文件夹
});

// 压缩图片
gulp.task('testImagemin', function () {
    gulp.src('./activity/gp16/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

//默认命令，在cmd中输入npm run dev 监听gulp打包
gulp.task('watch',function () {
    gulp.watch('./activity/gp16/*.html',['testHtmlmin']);
    gulp.watch('./activity/gp16/js/*.js',['minifyjs']);
    gulp.watch('./activity/gp16/css/*.css',['minifycss']);
    gulp.watch('./activity/gp16/img/*.{png,jpg,gif,ico}',['testImagemin']);
})
//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default',['testHtmlmin', 'minifyjs', 'testImagemin', 'minifycss', 'watch']);
//gulp.task('default',['testHtmlmin', 'watch']);
```
* * * *
### gulp和babel配合使用
配置.babelre文件
```javascript
{
  "presets": ["es2015", "stage-0"]
}
```
配置gulpfile.js文件
```javascript
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),  //监听
    plumber = require('gulp-plumber'),  //错误管理 提示
    sourcemaps = require('gulp-sourcemaps'),
    strip = require('gulp-strip-comments'), //删除注释
    streamify = require('gulp-streamify'); //只支持 buffer 的插件直接处理 stream
var path = {
    src: {
        js: 'src/**/*.js' // 此地址可修改
    },
    dist: {
        js: "core/" // 此地址可修改
    }
};
gulp.task('6to5', function () {
    gulp.src(path.src.js)  // 多个文件目录  参数为数组
        .pipe(watch(path.src.js))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(strip())  //去除注释
        .pipe(streamify(babel()))
        .pipe(sourcemaps.write({addComment: false}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.dist.js));
});
gulp.task('default', ['6to5'], function (){
    gulp.watch([path.src.js], [babel]);
});

在cmd中输入gulp 回车即可
```