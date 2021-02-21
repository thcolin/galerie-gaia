const AWS = require('aws-sdk')
const util = require('util')
const sharp = require('sharp')
const potrace = require('potrace')
const path = require('path')
const slug = require('slug')

const s3 = new AWS.S3()

exports.handler = async (event, context, callback) => {
  let forestry
  console.log('Reading options from event:\n', util.inspect(event, { depth: 5 }))
  const Bucket = event.Records[0].s3.bucket.name
  const [folder, file] = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' ')).split('/')

  if (folder !== 'forestry') {
    console.log('Image is not from forestry folder')
    return
  }

  const ext = path.extname(file)
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) {
    console.log(`Unsupported image type: ${ext.toLowerCase()}`)
    return
  }

  try {
    console.log('S3 getObject', { Bucket, Key: `forestry/${file}` })
    forestry = await s3.getObject({ Bucket, Key: `forestry/${file}` }).promise()
  } catch (error) {
    console.log(error)
    return
  }

  const slugified = `${slug(path.basename(file, ext), { lower: true })}${ext.toLowerCase()}`
  try {
    const original = await sharp(forestry.Body).resize(1920).toBuffer()
    console.log('S3 putObject', { Bucket, Key: `originals/${slugified}` })
    await s3.putObject({ Bucket, Key: `originals/${slugified}`, Body: original, ContentType: 'image', ACL: 'public-read' }).promise()
    console.log(`Successfully resized ${Bucket}/${folder}/${file} and uploaded to ${Bucket}/originals/${slugified}`)
  } catch (error) {
    console.log(error)
    return
  }

  try {
    const original = await sharp(forestry.Body).resize(512).toBuffer()
    console.log('S3 putObject', { Bucket, Key: `thumbnails/${slugified}` })
    await s3.putObject({ Bucket, Key: `thumbnails/${slugified}`, Body: original, ContentType: 'image', ACL: 'public-read' }).promise()
    console.log(`Successfully thumbnailed ${Bucket}/${folder}/${file} and uploaded to ${Bucket}/thumbnails/${slugified}`)
  } catch (error) {
    console.log(error)
    return
  }

  try {
    const trace = await new Promise((resolve, reject) => potrace.trace(forestry.Body, {
      color: 'lightgray',
      optTolerance: 0.4,
      turdSize: 100,
      turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
    }, (err, svg) => err ? reject(err) : resolve(Buffer.from(svg))))
    console.log('S3 putObject', { Bucket, Key: `${slugified.slice(0, -ext.length)}.svg` })
    await s3.putObject({ Bucket, Key: `traces/${slugified.slice(0, -ext.length)}.svg`, Body: trace, ContentType: 'image', ACL: 'public-read' }).promise()
    console.log(`Successfully traced ${Bucket}/${folder}/${file} and uploaded to ${Bucket}/traces/${slugified.slice(0, -ext.length)}.svg`)
  } catch (error) {
    console.log(error)
    return
  }
}
