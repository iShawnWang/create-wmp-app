const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const notify = require("gulp-notify")
const del = require('del')
const plugins = gulpLoadPlugins()
const webpack = require('webpack')
const webpackStream = require('webpack-stream')

const env = process.env.NODE_ENV || 'development'
const isProduction = () => env === 'production'
const webpackConfig = {
    mode: 'production', // webpack generated js contains `eval` function when mode = development
    module: {
        rules: [{
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
            },
            exclude: /node_modules/,
        }],
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
}

gulp.task('clean', (done) => {
  return del(['dist/*']).then(() => {
    return done()
  })
})

gulp.task('compile:npm', () => {
  return gulp.src('./src/npm/*.js')
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest('./dist/npm'))
})

gulp.task('compile:js', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(plugins.newer('dist'))
        .pipe(plugins.logger({ showChange: true }))
        .pipe(plugins.babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(plugins.if(isProduction, plugins.uglify()))
        .pipe(gulp.dest('dist'))
})

gulp.task('compile:wxml', () => {
    return gulp.src(['src/**/*.wxml'])
        .pipe(plugins.newer('dist'))
        .pipe(plugins.logger({ showChange: true }))
        .pipe(plugins.if(isProduction, plugins.htmlmin({
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(gulp.dest('dist'))
})

gulp.task('compile:less', () => {
    return gulp.src(['src/**/*.less'])
        .pipe(plugins.less())
        .pipe(plugins.rename({ extname: '.wxss' }))
        .pipe(plugins.newer('dist'))
        .pipe(plugins.logger({ showChange: true }))
        .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
        .pipe(gulp.dest('dist'))
})

gulp.task('compile:json', () => {
    return gulp.src(['src/**/*.json'])
        .pipe(plugins.newer('dist'))
        .pipe(plugins.logger({ showChange: true }))
        .pipe(plugins.jsonminify())
        .pipe(gulp.dest('dist'))
})

gulp.task('compile:img', () => {
    return gulp.src(['src/**/*.{jpg,jpeg,png,gif}'])
        .pipe(plugins.newer('dist'))
        .pipe(plugins.logger({ showChange: true }))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist'))
})

gulp.task('compile', gulp.series('clean', next => {
    return gulp.series(
        'compile:npm',
        'compile:js',
        'compile:wxml',
        'compile:less',
        'compile:json',
        'compile:img')(next)
}))


gulp.task('extras', () => {
    return gulp.src([
            'src/**/*.*',
            '!src/**/*.js',
            '!src/**/*.wxml',
            '!src/**/*.less',
            '!src/**/*.json',
            '!src/**/*.{jpe?g,png,gif}'
        ])
        .pipe(gulp.dest('dist'))
})

gulp.task('build', next => gulp.series('compile', 'extras')(next))

gulp.task('watch', gulp.series('build', (callback) => {
    gulp.watch('src/**/*.js', gulp.parallel('compile:js'))
    gulp.watch('src/**/*.wxml', gulp.parallel('compile:wxml'))
    gulp.watch('src/**/*.less', gulp.parallel('compile:less'))
    gulp.watch('src/**/*.json', gulp.parallel('compile:json'))
    gulp.watch('src/**/*.{jpe?g,png,gif}', gulp.parallel('compile:img'))
}))

gulp.task('default', gulp.parallel('watch'))