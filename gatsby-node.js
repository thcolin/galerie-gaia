/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const gulpfile = require('./gulpfile.js')

exports.onPreInit = async () => {
  await new Promise(resolve => {
    const stream = gulpfile.images()
    stream.on('finish', () => resolve())
  })

  await new Promise(resolve => {
    const stream = gulpfile.traces()
    stream.on('finish', () => resolve())
  })

  await new Promise(resolve => {
    const stream = gulpfile.wipe()
    stream.on('finish', () => resolve())
  })
}
