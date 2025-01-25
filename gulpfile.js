import gulp from "gulp"
import uglify from "gulp-uglify"
import eslint from "gulp-eslint"
import rename from "gulp-rename"
import mocha from "gulp-mocha"
import { deleteAsync } from "del"

const paths = {
  src: "src/swiss-ssn.js",
  test: "test/swiss-ssn-test.js",
  dist: "dist",
}

// Clean dist directory
export const clean = () => deleteAsync(["dist"])

// Lint JavaScript files
export const lint = () => {
  return gulp.src([paths.src, paths.test])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
}

// Run tests
export const test = () => {
  return gulp.src(paths.test, { read: false })
    .pipe(mocha({ require: ["@babel/register"] }))
}

// Build and minify
export const build = () => {
  return gulp.src(paths.src)
    .pipe(uglify({
      output: {
        comments: "some"
      },
      compress: {
        pure_getters: true
      },
      mangle: {
        reserved: ["SwissSSN"]
      }
    }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist))
}

// Default task
export default gulp.series(clean, lint, test, build)
