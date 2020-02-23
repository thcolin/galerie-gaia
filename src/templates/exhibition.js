import React from 'react'
import { Redirect } from '@reach/router'
import resolve from 'utils/resolve'

const Exhibition = ({ pageContext: { frontmatter }, ...props }) => (
  <Redirect to={resolve.fromFilesystem2Gatsby(frontmatter.artist, { extension: false })} />
)

export default Exhibition
