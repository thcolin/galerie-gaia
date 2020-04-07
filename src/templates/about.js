import React from 'react'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import Contact from 'components/Contact'
import theme from 'theme'

const About = ({ ...props }) => {
  const { pageContext: { frontmatter } } = props

  return (
    <Layout {...props}>
      <SEO {...frontmatter.seo} pageContext={props.pageContext} />
      <section css={About.styles.element}>
        <h1>{frontmatter.title}</h1>
        <div>
          {frontmatter.content.map(({ column, contact }, index) => (
            <article key={index}>
              <RichText children={column} />
              {contact.display && (
                <Contact
                  id="uT-oykFnR_MeNQndwoxtc"
                  placeholder={contact.placeholder}
                  toggle={true}
                  inputs={[
                    {
                      name: 'subject',
                      value: frontmatter.title,
                    }
                  ]}
                />
              )}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

About.styles = {
  element: {
    padding: '2rem',
    '>div': {
      display: 'flex',
      [theme.medias.small]: {
        flexDirection: 'column',
      },
      '>article': {
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
    }
  },
}

export default About
