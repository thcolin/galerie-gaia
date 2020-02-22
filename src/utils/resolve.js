export function fromGatsby2Filesystem (input) {
  return `src/pages/${input}`
}

export function fromFilesystem2Gatsby (input, { extension = true }) {
  return input.replace(/src\/pages\//, '').replace(extension ? '' : /\.md$/, '')
}

export default {
  fromGatsby2Filesystem,
  fromFilesystem2Gatsby,
}
