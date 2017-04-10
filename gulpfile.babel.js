'use strict';

//General
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import flatten from 'gulp-flatten';
import rename from 'gulp-rename';
import header from 'gulp-header';
import del from 'del';
import tap from 'gulp-tap';
import lazypipe from 'lazypipe';
import browserSync from 'browser-sync';

//JS
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

//CSS
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import minify from 'gulp-cssnano';
import prefix from 'gulp-autoprefixer';

//Config files
const configs = require('./configs.json');
const packages = require('./package.json');

const headerCredits = {
  full: '/*!\n' +
    ' * <%= package.name %> v<%= package.version %>: <%= package.description %>\n' +
    ' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
    ' * ISC License\n' +
    ' * <%= package.repository.url %>\n' +
    ' */\n\n',
  min: '/*!' +
    ' <%= package.name %> v<%= package.version %>' +
    ' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
    ' | MIT License' +
    ' | <%= package.repository.url %>' +
    ' */\n'
};

// Clean dist folder
gulp.task('clean:dist', () => {
  del.sync([
    configs.output
  ]);
});

// Remove prexisting content from docs folder
gulp.task('clean:docs', () => {
  return del.sync(`${configs.demo.output}/dist/`);
});

// Copy distribution files to docs
gulp.task('copy:dist', ['compile', 'clean:docs'], () => {
  return gulp.src(configs.output + '/**')
    .pipe(plumber())
    .pipe(gulp.dest(configs.demo.output + '/dist'));
});

// Process, lint, and minify Sass files
gulp.task('build:styles', ['clean:dist'], () => {
  return gulp.src(configs.styles.input)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: true
    }))
    .pipe(flatten())
    .pipe(prefix({
      browsers: ['last 2 version', '> 1%'],
      cascade: true,
      remove: true
    }))
    .pipe(header(headerCredits.full, {
      package: packages
    }))
    .pipe(gulp.dest(configs.styles.output))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minify({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(header(headerCredits.min, {
      package: packages
    }))
    .pipe(gulp.dest(configs.styles.output));
});

// Lint, minify, and concatenate scripts
gulp.task('build:scripts', ['clean:dist'], () => {
  var jsTasks = lazypipe()
    .pipe(header, headerCredits.full, {
      package: packages
    })
    .pipe(gulp.dest, configs.scripts.output)
    .pipe(rename, {
      suffix: '.min'
    })
    .pipe(uglify)
    .pipe(header, headerCredits.min, {
      package: packages
    })
    .pipe(gulp.dest, configs.scripts.output)

  return gulp.src(configs.scripts.input)
    .pipe(plumber())
    .pipe(tap(function (file, t) {
      if (file.isDirectory()) {
        var name = file.relative + '.js';
        return gulp.src(file.path + '/*.js')
          .pipe(concat(name))
          .pipe(jsTasks());
      }
    }))
    .pipe(jsTasks());
});

gulp.task('build:demo', ['copy:dist', 'listen:demo']);

gulp.task('listen:demo', ['build:styles'], () => {
  browserSync.init({
    server: configs.demo.output
  });  
});

gulp.task('compile', ['build:scripts', 'build:styles']);