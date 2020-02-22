export function fromGatsby2Filesystem (input) {
  return `src/pages/${input}`
}

export function fromFilesystem2Gatsby (input, options = { extension: true }) {
  return input.replace(/src\/pages\//, '').replace(options.extension ? '' : /\.md$/, '')
}

export default {
  fromGatsby2Filesystem,
  fromFilesystem2Gatsby,
}
