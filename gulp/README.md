### Gulp

Gulp.js 是一个自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务。

** 先来进行简单的压缩和丑化 **
```javascript
/* 可使用gulp编译压缩文件 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    /* 以上依赖必须使用npm安装 */

//压缩css
gulp.task('minifycss', function () {
    return gulp.src('static/css/!*.css')    //需要操作的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('dist/css'));   //输出文件夹
});
//压缩,合并 js
gulp.task('minifyjs', function () {
    return gulp.src('./js/ldzf.js')      //需要操作的文件
        .pipe(uglify())    //压缩
        .pipe(rename({suffix: ''}))   //rename压缩后的文件名
        .pipe(gulp.dest('./dist'));       //输出到文件夹
});

//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default', [], function () {
    gulp.start('minifyjs');
});
```
