const { src, dest, series } = require('gulp')
const merge = require('merge-stream')
const filter = require('gulp-filter')
const imgresize = require('gulp-jimp-resize')
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
  return src(`${__dirname}/static/images/*.{png,jpg,jpeg}`)
    .pipe(filter(file => !file.stem.match(/-min$/)))
    .pipe(imgresize({
      sizes: [
        { suffix: 'min', width: 1920, upscale: false },
      ],
    }))
    .pipe(imgmin([
      imgmin.mozjpeg({ quality: 90, progressive: true }),
      imgmin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(dest('./'))
}

function traces () {
  return src(`${__dirname}/static/images/*-min.{png,jpg,jpeg}`)
    .pipe(filter(file => !fs.existsSync(file.path.replace(/\..+$/, '.svg'))))
    .pipe(trace())
    .pipe(imgmin([
      imgmin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(dest(`${__dirname}/static/images`))
}

function wipe () {
  const svg = src(`${__dirname}/static/images/*.svg`)
    .pipe(filter(file => (
      !fs.existsSync(file.path.replace(/-min\..+$/, '.png')) &&
      !fs.existsSync(file.path.replace(/-min\..+$/, '.jpg')) &&
      !fs.existsSync(file.path.replace(/-min\..+$/, '.jpeg'))
    )))

  const min = src(`${__dirname}/static/images/*-min.{png,jpg,jpeg}`)
    .pipe(filter(file => !fs.existsSync(file.path.replace(/-min/, ''))))

  return merge(svg, min)
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
