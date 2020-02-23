import React from 'react'
import { Redirect } from '@reach/router'

const NotFound = ({ ...props }) => (
  <Redirect to='/' />
)

export default NotFound
