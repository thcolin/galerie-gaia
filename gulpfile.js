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
const slug = require('slug')
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
      .pipe(filter(file => !fs.existsSync(`${__dirname}/static/cdn/${slug(file.stem, { lower: true })}${file.extname}`)))
      .pipe(filter(file => sizeOf(file.path).width <= 1920))
      .pipe(rename(path => {
        path.basename = slug(path.basename, { lower: true })
        path.extname = path.extname.toLowerCase()
      }))
      .pipe(debug({ title: 'image-min:' }))
      .pipe(imgmin([
        imgmin.mozjpeg(),
        imgmin.optipng(),
      ])),
    src(`${__dirname}/static/forestry/*.{png,jpg,jpeg,PNG,JPG,JPEG}`)
      .pipe(filter(file => !fs.existsSync(`${__dirname}/static/cdn/${slug(file.stem, { lower: true })}${file.extname}`)))
      .pipe(filter(file => sizeOf(file.path).width > 1920))
      .pipe(rename(path => {
        path.basename = slug(path.basename, { lower: true })
        path.extname = path.extname.toLowerCase()
      }))
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
    .pipe(filter(file => !fs.existsSync(`${__dirname}/static/cdn/${slug(file.stem, { lower: true })}.svg`)))
    .pipe(rename(path => {
        path.basename = slug(path.basename, { lower: true })
        path.extname = path.extname.toLowerCase()
    }))
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
  const source = fs.readdirSync(`${__dirname}/static/forestry`)
    .filter(file => ['jpg', 'jpeg', 'png'].includes(file.split('.').pop().toLocaleLowerCase()))
    .map(file => slug(file.split('.').slice(0, -1).join('.'), { lower: true }))

  const svg = src(`${__dirname}/static/cdn/*.svg`)
    .pipe(filter(file => !source.includes(file.stem)))

  const min = src(`${__dirname}/static/cdn/*.{png,jpg,jpeg}`)
    .pipe(filter(file => !source.includes(file.stem)))

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
