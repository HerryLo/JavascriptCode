var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("tsc", function () {
    var tsResult = gulp.src("app/**/*")
        .pipe(ts({
              noImplicitAny: true
        }));
    return tsResult.js.pipe(gulp.dest('build/'));
});

gulp.task("default", ["tsc"], ()=> {
    gulp.watch('app/**/*',["tsc"])
})