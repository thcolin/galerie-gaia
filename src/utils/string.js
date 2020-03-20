export function truncate (str, limit = 200, options = { ellipsis: '...' }) {
  const sentences = str.split(/[\.\,\;\?\!]+/)
  const position = Math.abs(sentences.reduce((length, sentence) =>
    length < 0 ?
    length :
    limit > length + sentence.length ?
    length + sentence.length + 1 :
    -Math.abs(length),
    0,
  ))

  return position === str.length ? str : `${str.substring(0, position - 1).trimEnd()}${position > 1 ? options.ellipsis : ''}`
}
