const AWS = require('aws-sdk')
const util = require('util')
const sharp = require('sharp')
const potrace = require('potrace')
const path = require('path')
const slug = require('slug')

const s3 = new AWS.S3()

exports.handler = async (event, context, callback) => {
  let forestry, original, thumbnail, trace
  console.log('Reading options from event:\n', util.inspect(event, { depth: 5 }))
  const Bucket = event.Records[0].s3.bucket.name
  const [folder, file] = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' ')).split('/')

  if (folder !== 'forestry') {
    console.log('Image is not from forestry folder')
    return
  }

  const ext = path.extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    console.log(`Unsupported image type: ${ext}`)
    return
  }

  const type = `image/${{ png: 'png', jpg: 'jpeg', jpeg: 'jpeg' }[ext]}`

  try {
    console.log('S3 getObject', { Bucket, Key: `forestry/${file}` })
    forestry = (await s3.getObject({ Bucket, Key: `forestry/${file}` }).promise()).Body
  } catch (error) {
    console.log(error)
    return
  }

  const slugified = `${slug(path.basename(file, ext), { lower: true })}${ext}`

  try {
    original = await sharp(forestry).resize(1920).toBuffer()
    console.log('S3 putObject', { Bucket, Key: `originals/${slugified}` })
    await s3.putObject({ Bucket, Key: `originals/${slugified}`, Body: original, ContentType: type, ACL: 'public-read' }).promise()
    console.log(`Successfully resized ${Bucket}/${folder}/${file} and uploaded to ${Bucket}/originals/${slugified}`)
  } catch (error) {
    console.log(error)
    return
  }

  try {
    thumbnail = await sharp(original).resize(512).toBuffer()
    console.log('S3 putObject', { Bucket, Key: `thumbnails/${slugified}` })
    await s3.putObject({ Bucket, Key: `thumbnails/${slugified}`, Body: thumbnail, ContentType: type, ACL: 'public-read' }).promise()
    console.log(`Successfully thumbnailed ${Bucket}/${folder}/${file} and uploaded to ${Bucket}/thumbnails/${slugified}`)
  } catch (error) {
    console.log(error)
    return
  }

  try {
    trace = await new Promise((resolve, reject) => potrace.trace(thumbnail, {
      color: 'lightgray',
      optTolerance: 0.4,
      turdSize: 100,
      turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
    }, (err, svg) => err ? reject(err) : resolve(Buffer.from(svg))))
    console.log('S3 putObject', { Bucket, Key: `${slugified.slice(0, -ext.length)}.svg` })
    await s3.putObject({ Bucket, Key: `traces/${slugified.slice(0, -ext.length)}.svg`, Body: trace, ContentType: 'image/svg+xml', ACL: 'public-read' }).promise()
    console.log(`Successfully traced ${Bucket}/${folder}/${file} and uploaded to ${Bucket}/traces/${slugified.slice(0, -ext.length)}.svg`)
  } catch (error) {
    console.log(error)
    return
  }
}
