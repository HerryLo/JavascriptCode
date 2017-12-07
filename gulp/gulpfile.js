/* 可使用gulp编译压缩文件 dist为所压缩文件的目录 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin');


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
    gulp.src('./activity/wxSuccess/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

//压缩css
gulp.task('minifycss', function () {
    return gulp.src('./activity/wxSuccess/css/*.css')    //需要操作的文件
        .pipe(rename({suffix: ''}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('dist/css'));   //输出文件夹
});
//压缩,合并 js
gulp.task('minifyjs', function () {
    return gulp.src('./activity/wxSuccess/js/*.js')      //需要操作的文件
        .pipe(uglify())    //压缩
        .pipe(rename({suffix: ''}))   //rename压缩后的文件名
        .pipe(gulp.dest('dist/js'));       //输出到文件夹
});

// 压缩图片
gulp.task('testImagemin', function () {
    gulp.src('./activity/wxSuccess/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

//默认命令，在cmd中输入npm run dev 监听gulp打包
gulp.task('watch',function () {
    gulp.watch('./activity/wxSuccess/*.html',['testHtmlmin']);
    gulp.watch('./activity/wxSuccess/js/*.js',['minifyjs']);
    gulp.watch('./activity/wxSuccess/css/*.css',['minifycss']);
    gulp.watch('./activity/wxSuccess/img/*.{png,jpg,gif,ico}',['testImagemin']);
})
//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default',['testHtmlmin', 'minifyjs', 'testImagemin', 'minifycss', 'watch']);




