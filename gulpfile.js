const { src, dest, series } = require('gulp')
const merge = require('merge-stream')
const filter = require('gulp-filter')
const debug = require('gulp-debug')
const rename = require('gulp-rename')
const sizeOf = require('image-size')
const resizer = require('gulp-images-resizer')
const imgmin = require('gulp-imagemin')
const through = require('through2')
const clean = require('gulp-clean')
const Potrace = require('potrace')
const fs = require('fs')

function trace () {
  return through.obj(function (file, encoding, callback) {
    Potrace.trace(file.contents, {
      color: 'lightgray',
      optTolerance: 0.4,
      turdSize: 100,
      turnPolicy: Potrace.Potrace.TURNPOLICY_MAJORITY,
    }, (err, svg) => {
      if (err) {
        throw err
      }

      file.extname = '.svg'
      file.contents = Buffer.from(svg)
      this.push(file)

      callback()
    })
  })
}

function images () {
  return merge(
    src(`${__dirname}/static/forestry/*.{png,jpg,jpeg,PNG,JPG,JPEG}`)
      .pipe(rename(path => {
        path.extname = path.extname.toLowerCase()
      }))
      .pipe(filter(file => !fs.existsSync(`${__dirname}/static/cdn/${file.basename}`)))
      .pipe(filter(file => sizeOf(file.path).width <= 1920))
      .pipe(debug({ title: 'image-min:' }))
      .pipe(imgmin([
        imgmin.mozjpeg(),
        imgmin.optipng(),
      ])),
    src(`${__dirname}/static/forestry/*.{png,jpg,jpeg,PNG,JPG,JPEG}`)
      .pipe(rename(path => {
        path.extname = path.extname.toLowerCase()
      }))
      .pipe(filter(file => !fs.existsSync(`${__dirname}/static/cdn/${file.basename}`)))
      .pipe(filter(file => sizeOf(file.path).width > 1920))
      .pipe(debug({ title: 'image-resize:' }))
      .pipe(resizer({ width: 1920 }))
      .pipe(debug({ title: 'image-min:' }))
      .pipe(imgmin([
        imgmin.mozjpeg(),
        imgmin.optipng(),
      ])),
  )
    .pipe(dest(`${__dirname}/static/cdn`))
}

function traces () {
  return src(`${__dirname}/static/cdn/*.{png,jpg,jpeg,PNG,JPG,JPEG}`)
    .pipe(rename(path => {
      path.extname = path.extname.toLowerCase()
    }))
    .pipe(filter(file => !fs.existsSync(`${__dirname}/static/cdn/${file.stem}.svg`)))
    .pipe(debug({ title: 'trace-resize:' }))
    .pipe(resizer({ width: 500 }))
    .pipe(debug({ title: 'trace-process:' }))
    .pipe(trace())
    .pipe(debug({ title: 'trace-min:' }))
    .pipe(imgmin([
      imgmin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(dest(`${__dirname}/static/cdn`))
}

function wipe () {
  const svg = src(`${__dirname}/static/cdn/*.svg`)
    .pipe(filter(file => (
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.png`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.jpg`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.jpeg`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.PNG`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.JPG`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.JPEG`)
    )))

  const min = src(`${__dirname}/static/cdn/*.{png,jpg,jpeg}`)
    .pipe(filter(file => (
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.png`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.jpg`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.jpeg`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.PNG`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.JPG`) &&
      !fs.existsSync(`${__dirname}/static/forestry/${file.stem}.JPEG`)
    )))

  return merge(svg, min)
    .pipe(debug({ title: 'wipe:' }))
    .pipe(clean())
}

exports.images = images
exports.traces = traces
exports.wipe = wipe

exports.default = series(
  images,
  traces,
  wipe
)
