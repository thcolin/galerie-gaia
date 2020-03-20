import React from 'react'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import ContactForm from 'components/Contact'
import theme from 'theme'

const Contact = ({ ...props }) => {
  const { pageContext: { frontmatter } } = props

  return (
    <Layout {...props}>
      <section css={Contact.styles.map}>
        <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d677.4944216334337!2d-1.5545014000000081!3d47.21701889999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805eea43d94603f%3A0x80d16ddf85a1722f!2s4+Rue+F%C3%A9nelon%2C+44000+Nantes%2C+France!5e0!3m2!1sfr!2s!4v1426235401784' />
      </section>
      <hr />
      <section css={Contact.styles.description}>
        <h1>{frontmatter.title}</h1>
        <RichText>{frontmatter.description}</RichText>
        <strong><a href='/forestry/Dossier de Presse - Galerie Gaia.pdf' target='_blank'>Dossier de Presse</a></strong>
      </section>
      <hr />
      <section css={Contact.styles.contact}>
        <h2>Contact</h2>
        <RichText>{frontmatter.about}</RichText>
        <ContactForm id="qJR6evrvE_8YqOTqPnVUU" />
      </section>
    </Layout>
  )
}

Contact.styles = {
  map: {
    '>iframe': {
      width: '100%',
      height: '30rem',
      maxHeight: '50vh',
      padding: '1rem 1rem 0.5rem',
      border: 'none',
    },
  },
  description: {
    padding: '0 2rem',
    '>h1': {
      margin: '0 0 2rem',
      fontSize: '2rem',
      color: theme.colors.black,
    },
    '>div': {
      lineHeight: '1.5',
    },
    '>strong': {
      display: 'block',
      textAlign: 'right',
    },
  },
  contact: {
    padding: '0 2rem 1rem',
    '>h2': {
      margin: '0 0 1rem',
      fontSize: '1.5rem',
      color: theme.colors.black,
    },
    '>div': {
      lineHeight: '1.5',
    },
    '>form': {
      '>textarea': {
        height: '8rem',
      },
    },
  },
}

export default Contact
