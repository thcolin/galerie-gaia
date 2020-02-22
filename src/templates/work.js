import React from 'react'
import { Redirect } from '@reach/router'
import resolve from 'utils/resolve'

const Work = ({ pageContext: { frontmatter }, ...props }) => (
  <Redirect to={resolve.fromFilesystem2Gatsby(frontmatter.artist)} />
)

export default Work
