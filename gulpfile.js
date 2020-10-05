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
const readyDirRecursiveSync = require('recursive-readdir-sync')

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

function thumbnails () {
  return src(`${__dirname}/static/cdn/*.{png,jpg,jpeg}`)
    .pipe(filter(file => !fs.existsSync(`${__dirname}/static/thumbnails/${file.stem}${file.extname.toLowerCase()}`)))
    .pipe(debug({ title: 'image-thumbnail:' }))
    .pipe(resizer({ width: 512 }))
    .pipe(debug({ title: 'image-thumbnail-min:' }))
    .pipe(imgmin([
      imgmin.mozjpeg(),
      imgmin.optipng(),
    ]))
    .pipe(dest(`${__dirname}/static/thumbnails`))
}

function traces () {
  return src(`${__dirname}/static/cdn/*.{png,jpg,jpeg}`)
    .pipe(filter(file => !fs.existsSync(`${__dirname}/static/traces/${slug(file.stem, { lower: true })}.svg`)))
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
    .pipe(dest(`${__dirname}/static/traces`))
}

function wipe () {
  const cache = {}
  const content = readyDirRecursiveSync(`${__dirname}/src/pages`)
    .filter(file => file.slice(-3) === '.md')
    .map(file => fs.readFileSync(file, 'utf-8'))
    .reduce((acc, curr) => `${acc}\n${curr}`, '')

  const used = (stem) => {
    if (Object.keys(cache).includes(stem)) {
      return cache[stem]
    }

    cache[stem] = (new RegExp(`${stem
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/[^\x00-\x7F]/g, '.+')
      .replace(/\s+/g, '\\s+')
    }`, 'ig')).test(content)
    return cache[stem]
  }

  const unused = src(`${__dirname}/static/forestry/*.{png,jpg,jpeg,PNG,JPG,JPEG}`)
    .pipe(filter(file => file.stem.slice(0, 6) !== 'assets' && !used(file.stem)))

  const min = unused
    .pipe(rename(path => {
      path.dirname = '../cdn'
      path.basename = slug(path.basename, { lower: true })
      path.extname = path.extname.toLowerCase()
    }))
    .pipe(filter(file => fs.existsSync(`${__dirname}/static/cdn/${file.stem}${file.extname}`)))

  const thumbnails = unused
    .pipe(rename(path => {
      path.dirname = '../thumbnails'
      path.basename = slug(path.basename, { lower: true })
      path.extname = path.extname.toLowerCase()
    }))
    .pipe(filter(file => fs.existsSync(`${__dirname}/static/thumbnails/${file.stem}${file.extname}`)))

  const traces = unused
    .pipe(rename(path => {
      path.dirname = '../traces'
      path.basename = slug(path.basename, { lower: true })
      path.extname = '.svg'
    }))
    .pipe(filter(file => fs.existsSync(`${__dirname}/static/traces/${file.stem}${file.extname}`)))

  return merge(
      unused,
      min,
      thumbnails,
      traces
    )
    .pipe(debug({ title: 'wipe:' }))
    .pipe(clean())
}

exports.images = images
exports.thumbnails = thumbnails
exports.traces = traces
exports.wipe = wipe

exports.default = series(
  images,
  thumbnails,
  traces,
  wipe
)
