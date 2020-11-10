import React from 'react'
import Icon from 'components/Icon'
import data from 'data/reinsurance.json'
import theme from 'theme'

const Reinsurance = ({ ...props }) => {
  return (
    <div css={Reinsurance.styles.element}>
      {data.items.map(({ title, icon, content }, index) => (
        <div key={index} css={Reinsurance.styles.item}>
          <span style={Reinsurance.styles.icon}>
            <Icon children={icon} />
          </span>
          <label>{title}</label>
          <p>{content}</p>
        </div>
      ))}
    </div>
  )
}

Reinsurance.styles = {
  element: {
    display: 'flex',
    // margin: '2rem 0 1rem 0',
    overflowX: 'auto',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexBasis: '100%',
    minWidth: '10rem',
    margin: '0 0.5rem',
    textAlign: 'center',
    ':first-of-type': {
      marginLeft: '0',
    },
    ':last-of-type': {
      marginRight: '0',
    },
    '>span': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.smoke,
      margin: '0 0 1rem 0',
      fontSize: '2rem',
      borderRadius: '50%',
      height: '4rem',
      width: '4rem',
    },
    '>label': {
      fontWeight: 'bold',
    },
  },
}

export default Reinsurance
