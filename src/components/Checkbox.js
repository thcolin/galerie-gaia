import theme from 'theme'

const Checkbox = ({ label, options, value, onChange, ...props }) => (
  <div css={Checkbox.styles.element}>
    <label>
      <span>{label}</span>
    </label>
    <div css={Checkbox.styles.container}>
      {Object.keys(options).map(key => (
        <label htmlFor={options[key].id} css={Checkbox.styles.checkbox}>
          <input
            type='checkbox'
            id={options[key].id}
            {...props}
            checked={value.includes(options[key].value)}
            onChange={(e) => onChange(e.target.checked ? [...value, options[key].value] : value.filter(v => v !== options[key].value))}
          />
          <span>{options[key].label}</span>
        </label>
      ))}
    </div>
  </div>
)

Checkbox.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '>label': {
      padding: '0 0 1em 0',
      fontWeight: 600,
    },
  },
  container: {
    display: 'flex',
    flex: 1,
    [theme.medias.small]: {
      flexDirection: 'row',
      '>label:not(:last-of-type)': {
        borderRight: 'none',
      },
      '>label:first-of-type': {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
      },
      '>label:last-of-type': {
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
      },
    },
    [theme.medias.medium]: {
      flexDirection: 'row',
      '>label:not(:last-of-type)': {
        borderRight: 'none',
      },
      '>label:first-of-type': {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
      },
      '>label:last-of-type': {
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
      },
    },
    [theme.medias.large]: {
      flexDirection: 'row',
      '>label:not(:last-of-type)': {
        borderRight: 'none',
      },
      '>label:first-of-type': {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
      },
      '>label:last-of-type': {
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
      },
    },
    [theme.medias.extralarge]: {
      flexDirection: 'row',
      '>label:not(:last-of-type)': {
        borderRight: 'none',
      },
      '>label:first-of-type': {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
      },
      '>label:last-of-type': {
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
      },
    },
    [theme.medias.extrasmall]: {
      flexDirection: 'column',
      '>label:not(:last-of-type)': {
        borderRight: `1px solid ${theme.colors.gray}`,
        borderBottom: 'none',
      },
      '>label:first-of-type': {
        borderTopRightRadius: '4px',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '0px',
      },
      '>label:last-of-type': {
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        borderTopRightRadius: '0px',
      },
    },
  },
  checkbox: {
    flex: 1,
    border: `1px solid ${theme.colors.gray}`,
    cursor: 'pointer',
    overflow: 'hidden',
    '>input': {
      display: 'none',
    },
    'input:checked + span': {
      backgroundColor: theme.colors.black,
      color: theme.colors.white,
    },
    '>span': {
      backgroundColor: theme.colors.white,
      display: 'flex',
      justifyContent: 'center',
      padding: '0.5em 1em',
      fontSize: '0.875rem',
      color: theme.colors.black,
      background: '#fff',
      transition: 'all 200ms ease-in-out',
      whiteSpace: 'nowrap',
    },
  },
}

export default Checkbox
