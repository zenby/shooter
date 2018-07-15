"use strict";

const gulp = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp");
const sourcemaps = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp-sourcemaps");
const rename = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp-rename");
const cssmin = require("gulp-cssmin");
const browserSync = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/browser-sync").create();
const del = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/del");
const buffer = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/vinyl-buffer");
const uglify = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp-uglify");
const source = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/vinyl-source-stream");
const babelify = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/babelify");
const watchify = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/watchify");
const plumber = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/gulp-plumber");
const assign = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/lodash.assign");
const browserify = require("C:/Users/Мистер Ящерка/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/browserify");

gulp.task("clean", function() {
  return del("public");
});

gulp.task("styles", function() {
  return gulp
    .src("frontend/styles/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public"));
});

gulp.task("assets", function() {
  return gulp
    .src("frontend/assets/**", { since: gulp.lastRun("assets") })
    .pipe(gulp.dest("public"));
});

var customOpts = {
  entries: ["./frontend/js/main.js"],
  debug: true,
  transform: [["babelify", { presets: ["es2015"] }]]
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task("bundle", function() {
  return b
    .bundle()
    .on("error", function(err) {
      console.log(err.message);
      browserSync.notify(err.message, 3000);
      this.emit("end");
    })
    .pipe(plumber())
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public"));
});

gulp.task(
  "build",
  gulp.series("clean", gulp.parallel("styles", "assets", "bundle"))
);

gulp.task("watch", function() {
  gulp.watch("frontend/assets/**/*.*", gulp.series("assets"));
  gulp.watch("frontend/js/**/*.*", gulp.series("bundle"));
  gulp.watch("frontend/styles/**/*.*", gulp.series("styles"));
});

gulp.task("serve", function() {
  browserSync.init({
    server: "public"
  });
  browserSync.watch("public/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("build", gulp.parallel("watch", "serve")));
