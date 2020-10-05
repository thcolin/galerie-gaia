import React from 'react'
import Select from 'components/Select'
import Range from 'components/Range'
import theme from 'theme'

const Options = ({ options, values, setValues, setPage, ...props }) => (
  <div css={Options.styles.element}>
    <div>
      {Object.keys(options)
        .filter(key => options[key].type === 'select')
        .map(key => (
          <Select
            key={key}
            {...options[key].props}
            value={values[key] || []}
            onChange={(v) => {
              setValues(values => ({ ...values, [key]: v || [] }))
              setPage(0)
            }}
          />
        ))
      }
    </div>
    <div>
      {Object.keys(options)
        .filter(key => options[key].type === 'range')
        .map(key => (
          <Range
            key={key}
            {...options[key].props}
            min={options[key].default[0]}
            max={options[key].default[1]}
            values={[(values[key] || options[key].default)[0], (values[key] || options[key].default)[1]]}
            onChange={(v) => {
              setValues(values => ({ ...values, [key]: v }))
              setPage(0)
            }}
          />
        ))
      }
    </div>
  </div>
)

Options.styles = {
  element: {
    position: 'sticky',
    top: '0',
    background: 'white',
    padding: '2em 0',
    margin: '0 0 2em',
    zIndex: 2,
    '>div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      ':not(:last-of-type)': {
        marginBottom: '2em',
      },
      '>*': {
        paddingLeft: '1em',
        paddingRight: '1em',
        ':first-of-type': {
          paddingLeft: '0em',
        },
        ':last-of-type': {
          paddingRight: '0em',
        },
      },
    },
    [theme.medias.small]: {
      position: 'block',
      top: 'unset',
      flexDirection: 'column',
      zIndex: 0,
      '>div': {
        flexDirection: 'column',
        '>*': {
          paddingLeft: '0em !important',
          paddingRight: '0em !important',
          paddingTop: '1em',
          paddingBottom: '1em',
          ':first-of-type': {
            paddingTop: '0em',
          },
          ':last-of-type': {
            paddingBottom: '0em',
          },
        },
      },
    },
  }
}

export default Options
