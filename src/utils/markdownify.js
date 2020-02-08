import marked from 'marked'
import htmlToReact from 'utils/htmlToReact'

export default function (markdown) {
  if (!markdown) {
    return null
  }
  return htmlToReact(marked(markdown))
};
