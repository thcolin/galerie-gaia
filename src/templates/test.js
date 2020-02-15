import React from 'react'
import Layout from 'components/Layout'

const styles = {
  title: { color: 'red' },
}

const Test = ({ ...props }) => {
  console.log(props)

  return (
    <Layout {...props}>
      <h1 css={styles.title}>Hello World</h1>
    </Layout>
  )
}

export default Test
