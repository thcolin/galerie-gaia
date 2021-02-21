import slug from 'slug'

export function fromGatsby2Filesystem (input) {
  return `src/pages/${input}`
}

export function fromFilesystem2Gatsby (input, options = { extension: true }) {
  return input.replace(/src\/pages\//, '').replace(options.extension ? '' : /\.md$/, '')
}

export function fromFilesystem2S3 (input, source = 'originals') {
  const base = input.split('/').slice(0, -2).join('/')
  const stem = slug(input.split('/').pop().split('.').slice(0, -1).join('.').replace(/°/, 'degree'), { lower: true })
  const extname = `.${input.split('.').pop().toLocaleLowerCase()}`
  return `${base}/${source}/${stem}${source === 'traces' ? '.svg' : extname}`
}

export default {
  fromGatsby2Filesystem,
  fromFilesystem2Gatsby,
  fromFilesystem2S3,
}
