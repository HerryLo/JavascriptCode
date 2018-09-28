/* 可使用gulp编译压缩文件 dist为所压缩文件的目录 */
const gulp = require('gulp');
const minifycss = require('gulp-clean-css'); //压缩css
const uglify = require('gulp-uglify'); //混淆代码
const imagemin = require('gulp-imagemin'); //压缩图片
const htmlmin = require('gulp-htmlmin'); //压缩html
const rename = require('gulp-rename');

const babel = require("gulp-babel"); //babel编译
const strip = require('gulp-strip-comments'); //删除注释
const sourcemaps = require('gulp-sourcemaps');
const temUrl = 'activity';

gulp.task('testHtmlmin', function () {
    const options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true, //压缩HTML
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
        //collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        //removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    };
    gulp.src(`./${temUrl}/*.html`)
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

//压缩css
gulp.task('minifycss', function () {
    return gulp.src(`./${temUrl}/css/*.css`) //需要操作的文件
        .pipe(rename({
            suffix: ''
        })) //rename压缩后的文件名
        .pipe(minifycss()) //执行压缩
        .pipe(gulp.dest('dist/css')); //输出文件夹
});
//压缩,合并 js
gulp.task('minifyjs', function () {
    return gulp.src([`./${temUrl}/js/*.js`]) //需要操作的文件
        .pipe(sourcemaps.init())
        .pipe(strip())  //去除注释
        .pipe(babel({
			presets: ['env']
		}))
        .pipe(sourcemaps.write({addComment: false}))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist/js')); //输出到文件夹
});

// 压缩图片
gulp.task('testImagemin', function () {
    gulp.src(`./${temUrl}/img/*.{png,jpg,gif,ico}`)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

//默认命令，在cmd中输入npm run dev 监听gulp打包
gulp.task('watch', function () {
    gulp.watch(`./${temUrl}/*.html`, ['testHtmlmin']);
    gulp.watch(`./${temUrl}/js/*.js`, ['minifyjs']);
    gulp.watch(`./${temUrl}/css/*.css`, ['minifycss']);
    gulp.watch(`./${temUrl}/img/*.{png,jpg,gif,ico}`, ['testImagemin']);
})
//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default', ['testHtmlmin', 'minifyjs', 'testImagemin', 'minifycss', 'watch']);