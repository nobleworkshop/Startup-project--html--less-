/* Подключаем gulp и его плагины */
var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    del = require("del"),
    //gutil = require("gulp-util"),
    minifyCss = require("gulp-minify-css"), // Сжатие CSS
    // concatCss = require("gulp-concat-css"),
    // rename = require("gulp-rename"),
    uglify = require("gulp-uglify"), // Сжатие JS
    imagemin = require("gulp-imagemin"),
    autoprefixer = require("gulp-autoprefixer"),
    filter = require("gulp-filter"),
    // ftp = require("vinyl-ftp"),
    wiredep = require("wiredep").stream,
    gulpif = require("gulp-if"),
    useref = require("gulp-useref"),
    size = require("gulp-size"), 
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    htmlmin = require('gulp-minify-html')
    ;

/* Прописываю пути, чтобы обращаться к ним по именам */
var
    paths = {
        app : {
            app : './app', // Папка с приложением - исходники
            bower : './app/bower', // Папка с bower пакетами
            html : './app/*.html', // html страницы приложения
            css : './app/css/*.css', // css стили
            js : './app/js/*.js' // js файлы
        },
        dist : {
            dist: './dist'
        }
    }


/*******************************************
 * APP - для дефолтного таска
 ******************************************/

// Запускаем локальный сервер
gulp.task("server", function () {
    browserSync.init({
        notify: false,
        port: 1000,
        server: { baseDir: paths.app.app }
    });
});

// Подключаем Bower файлы
gulp.task("wiredep-bower", function () {
    return gulp.src(paths.app.html)
        .pipe(wiredep({
            directory: paths.app.bower
            , overrides: {
                "qtip2": {
                    "main": ["./jquery.qtip.min.js", "./jquery.qtip.min.css"],
                    "dependencies": {"jquery": ">=1.6.0"}
                }
            }
            , exclude: ["bower/jquery/"]
            //, ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest(paths.app.app));
});

// Смотрим за bower.json файлом и если что-то установилось, запускаем wiredep-bower
gulp.task("bower-json", function () {
    return gulp.watch("bower.json", ["wiredep-bower"]);
});


// Таск - компиляция LESS / SASS и добавление вендорных префиксов
//gulp task 'less' для компиляции для компиляции главного LESS файла main.less
gulp.task('less', function(){
    gulp.src('app/less/main.less')  //Выберем наш main.less
        .pipe(sourcemaps.init()) // Включим sourcemaps
        .pipe(less()) //Скомпилируем
        .pipe(autoprefixer({ browsers: ['last 4 versions'] })) //Добавим вендорные префиксы
        .pipe(minifyCss()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css/'))
});

// Таск слежения за разными файлами
gulp.task("watch", function() {
    // watch([path.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });

    gulp.watch(['./app/less/**/*.less'], function(event, cb) {
        gulp.start('less');
    });

    gulp.watch([ paths.app.html, paths.app.css, paths.app.js ]).on("change", browserSync.reload);

    // watch([path.watch.js], function(event, cb) {
    //     gulp.start('js:build');
    // });
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start('image:build');
    // });
    // watch([path.watch.fonts], function(event, cb) {
    //     gulp.start('fonts:build');
    // });
});



// Дефолтный task
gulp.task("default", ["server", "wiredep-bower", "bower-json", "watch"]);

var log = function (error) {
    console.log([
        "",
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ""
    ].join("\n"));
    this.end();
}


/*******************************************
 * DIST
 ******************************************/

// Переносим CSS JS HTML в папку DIST
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.html', htmlmin()))
        .pipe(gulpif('*.css', minifyCss({compatibility: "ie8"})))
        .pipe(gulp.dest('dist'));
});


// Очищаем директорию DIST
gulp.task("clean-dist", function () {
    return del(["./dist/**", "!./dist/"]);
});

// Запускаем локальный сервер для DIST
gulp.task("dist-server", function () {
    browserSync.init({
        notify: false,
        port: 2000,
        server: { baseDir: "./dist" }
    });
});

// Перенос шрифтов
gulp.task("fonts", function() {
    gulp.src("./app/fonts/*/*.*")
        //.pipe(filter(["*.eot","*.svg","*.ttf","*.woff","*.woff2"]))
        .pipe(gulp.dest("./dist/fonts/"))
});

// Перенос картинок
gulp.task("images", function () {
    return gulp.src("./app/img/**/*")
            .pipe(imagemin({
                progressive: true,
                interlaced: true
            }))
            .pipe(gulp.dest("./dist/img"));
});

// Перенос остальных файлов (favicon и т.д.)
gulp.task("extras", function () {
    return gulp.src(["./app/*.*", "!./app/*.html"])
            .pipe(gulp.dest("./dist"));
});

// Вывод размера папки APP
gulp.task("size-app", function () {
    return gulp.src("app/**/*").pipe(size({title: "APP size: "}));
});

// Вывод размера папки DIST
gulp.task("size-dist", function () {
    return gulp.src("dist/**/*").pipe(size({title: "DIST size: "}));
});

// Запускаем локальный сервер
gulp.task("dist-server", function () {
    browserSync.init({
        notify: false,
        port: 1000,
        server: { baseDir: paths.dist.dist }
    });
});

// Сборка и вывод размера папки DIST
gulp.task("dist", ["useref", "images", "fonts", "extras"], function () {
    gulp.start("size-app");
    gulp.start("size-dist");
    gulp.start("dist-server");
});

// ФИНАЛЬНЫЙ ТАСК - Очищаем папку DIST, готовим index.html, Собираем DIST
gulp.task("build", ["clean-dist", "wiredep-bower"], function () {
    gulp.start("dist");
});




// Добавить и протестить таск с пубикацией на сервер