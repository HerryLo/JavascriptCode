/* 可使用gulp编译压缩文件 dist为所压缩文件的目录 */
const gulp = require('gulp');
const minifycss = require('gulp-clean-css'); //压缩css
const uglify = require('gulp-uglify'); //混淆代码
const imagemin = require('gulp-imagemin'); //压缩图片
const htmlmin = require('gulp-htmlmin'); //压缩html
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include'); //模版
const babel = require("gulp-babel"); //babel编译
const strip = require('gulp-strip-comments'); //删除注释
const sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
var connect = require('gulp-connect')

const temUrl = 'src/page';
const _include = './src/_include';
const testHtmlminSrc = [`./${temUrl}/**/*.html`, `./${temUrl}/*.html`];
const minifycssSrc = [`./${temUrl}/**/*.css`];
const minifyjsSrc = [`./${temUrl}/**/*.js`];
const testImageminSrc = [`./${temUrl}/**/*.{png,jpg,gif,ico}`];

gulp.task('webserver',function() {
    connect.server({
        livereload:true,
        port: 2333,
        root: 'dist',
    });
});

gulp.task('testHtmlmin', function () {
    const options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
        //collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        //removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    };
    gulp.src(testHtmlminSrc)
        .pipe(fileinclude({
            prefix: '@@', //变量前缀 @@include
            basepath: _include, //引用文件路径
            indent: true //保留文件的缩进
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});

//压缩css
gulp.task('minifycss', function () {
    var processors = [
        autoprefixer({
            browsers: 'last 5 version'
        }),
        pxtorem({
            rootValue: 32,
            propWhiteList: []
        })
    ];

    gulp.src(minifycssSrc) //需要操作的文件
        .pipe(rename({
            suffix: ''
        })) //rename压缩后的文件名
        .pipe(postcss(processors))
        .pipe(minifycss()) //执行压缩
        .pipe(gulp.dest('dist')); //输出文件夹
});

//压缩,合并 js
gulp.task('minifyjs', function () {
    gulp.src(minifyjsSrc) //需要操作的文件
        .pipe(sourcemaps.init())
        .pipe(strip()) //去除注释
        .pipe(babel({
            presets: ['env', 'es2015', 'stage-0'],
        }))
        .pipe(sourcemaps.write({
            addComment: false
        }))
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist')); //输出到文件夹
});

// 压缩图片
gulp.task('testImagemin', function () {
    gulp.src(testImageminSrc)
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

//默认命令，在cmd中输入npm run dev 监听gulp打包
gulp.task('watch', function () {
    gulp.watch(testHtmlminSrc, ['testHtmlmin']);
    gulp.watch(minifyjsSrc, ['minifyjs']);
    gulp.watch(minifycssSrc, ['minifycss']);
    gulp.watch(testImageminSrc, ['testImagemin']);
})

//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default', ['watch', 'webserver']);