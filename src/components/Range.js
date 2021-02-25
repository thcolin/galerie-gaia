import { useState } from 'react'
import { usePrevious } from 'hooks/use-previous'
import MaterialSlider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import theme from 'theme'

const ValueLabelComponent = ({ children, open, value }) => (
  <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
    {children}
  </Tooltip>
)

const styles = {
  input: {
    margin: '0 6px',
    padding: '1.125em 0',
  },
  histogram: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '2em',
    '>div': {
      flex: 1,
      display: 'block',
    },
  },
  slider: {
    root: {
      color: theme.colors.black,
      display: 'block',
      padding: 0,
    },
    disabled: {
      color: `${theme.colors.black} !important`,
      opacity: 0.5,
    },
    valueLabel: {
      '&>span': {
        color: theme.colors.black,
        '&>span': {
          color: 'white',
        },
      },
    },
    mark: {
      visibility: 'hidden',
    },
    thumb: {
      '&:hover': {
        boxShadow: '0px 0px 0px 8px rgba(0, 0, 0, 0.1)',
      },
    },
    focusVisible: {
      boxShadow: '0px 0px 0px 8px rgba(0, 0, 0, 0.1) !important',
    },
    active: {
      boxShadow: '0px 0px 0px 14px rgba(0, 0, 0, 0.1) !important',
    },
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '>label': {
      padding: '0 0 1em 0',
      fontWeight: 600,
    },
  },
}

const Slider = withStyles(styles.slider, { name: 'GaiaRange' })(MaterialSlider)

const Input = ({ values, onChange, min, max, labelize, ...props }) => {
  const [state, setState] = useState(values)
  const previous = usePrevious(values)

  if (previous && previous.join('-') === state.join('-') && previous.join('-') !== values.join('-')) {
    setState(values)
  }

  return (
    <div css={styles.input}>
      <Slider
        {...props}
        value={state}
        onChange={(e, values) => setState(values)}
        onChangeCommitted={(e, values) => onChange(values)}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        valueLabelFormat={labelize}
        ValueLabelComponent={ValueLabelComponent}
      />
    </div>
  )
}

const Range = ({ label, labelize, values, onChange, min, max, disabled, unit, ...props }) => (
  <div css={styles.element} {...props}>
    <label>
      <span>{label}</span>
      <span>&nbsp;</span>
      <small><code>({values.map(value => labelize ? labelize(value) : value).join(' // ')}{unit ? ` ${unit}` : ''})</code></small>
    </label>
    <Input
      values={values}
      onChange={onChange}
      min={min}
      max={max}
      labelize={labelize}
      disabled={disabled}
    />
  </div>
)

export default Range
