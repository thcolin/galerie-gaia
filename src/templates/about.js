import React, { useState } from 'react'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import theme from 'theme'

const About = ({ ...props }) => {
  const { pageContext: { frontmatter } } = props
  const [index, setIndex] = useState(0)

  return (
    <Layout {...props}>
      <section css={About.styles.element}>
        <header css={About.styles.header}>
          {frontmatter.tabs.map((tab, index) => (
            <h3 key={index}><a onClick={() => setIndex(index)}>{tab.title}</a></h3>
          ))}
        </header>
        <hr />
        <div css={About.styles.content}>
          {frontmatter.tabs.map(({ content }, i) => (
            <div key={i} style={{ display: i !== index ? 'none' : 'flex' }}>
              {content.map(({ column }, index) => (
                <RichText key={index} children={column} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

About.styles = {
  element: {
    padding: '2rem',
    '>hr': {
      margin: '1rem',
    },
  },
  header: {
    display: 'flex',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
    padding: '0 0 1rem',
    '>h3': {
      margin: 0,
      fontFamily: theme.fonts.primary,
      fontWeight: 'normal',
      textTransform: 'uppercase',
      '>a': {
        padding: '0 1rem',
        cursor: 'pointer',
      },
      ':not(:last-of-type):after': {
        display: 'inline',
        content: '"/"',
      },
    },
  },
  content: {
    display: 'flex',
    '>div': {
      [theme.medias.small]: {
        flexDirection: 'column',
      },
      '>div': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: '0 1rem',
        fontSize: '1rem',
        lineHeight: '1.5',
        ':first-of-type': {
          paddingLeft: 0,
        },
        ':last-of-type': {
          paddingRight: 0,
        },
        [theme.medias.small]: {
          padding: 0,
        },
      },
    },
  },
}

export default About
