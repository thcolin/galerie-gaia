import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
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
        .filter(key => options[key].type === 'checkbox')
        .map(key => (
          <Checkbox
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
  </div>
)

Options.styles = {
  element: {
    background: 'white',
    padding: '1em 0',
    margin: '0 -1em 1em',
    zIndex: 2,
    '>div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      '>*': {
        flex: 1,
        padding: '1em',
      },
    },
    [theme.medias.small]: {
      position: 'block',
      top: 'unset',
      flexDirection: 'column',
      zIndex: 0,
      '>div': {
        flexDirection: 'column',
      },
    },
  }
}

export default Options
