import React from 'react'
import ReactSelect from 'react-select'
import theme from 'theme'

const styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '>label': {
      display: 'inline-flex',
      padding: '0 0 1em 0',
      fontWeight: 600,
      '>span:first-child': {
        flex: 1,
      },
    },
  },
  badge: {
    backgroundColor: 'white',
    padding: '0.25em 0.375em 0.125em 0.375em',
    borderRadius: '0.25em',
    // fontFamily: theme.fonts.monospace,
    fontSize: '0.75em',
    fontWeight: 600,
    // color: theme.colors.primary,
  },
  select: {
    control: (style) => ({
      ...style,
      backgroundColor: 'transparent',
      borderColor: `${theme.colors.black} !important`,
      boxShadow: 'none',
      cursor: 'pointer',
      '>div:first-child': {
        display: 'flex',
        flexWrap: 'nowrap',
        width: 0,
        overflowX: 'auto',
        paddingTop: '5px',
        paddingBottom: '5px',
        '>input': {
          left: 0,
          margin: '2px',
          padding: '2px 0',
          transform: 'unset',
        },
      }
    }),
    placeholder: (style) => ({
      ...style,
      // color: theme.colors.smoke,
      fontSize: '0.875em',
    }),
    input: (style) => ({
      ...style,
      // color: 'white',
      fontSize: '0.875em',
    }),
    singleValue: (style) => ({
      ...style,
      // color: 'white',
      fontSize: '0.875em',
    }),
    multiValue: (style) => ({
      ...style,
      flexShrink: 0,
      backgroundColor: 'white',
    }),
    multiValueLabel: (style) => ({
      ...style,
      // color: theme.colors.primary,
    }),
    multiValueRemove: (style, props) => ({
      ...style,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      // borderLeft: `1px solid ${theme.colors.primary}`,
      marginLeft: '0.25em',
      cursor: 'pointer',
      ':hover': {
        // backgroundColor: theme.colors.tertiary,
        // color: 'white',
      },
    }),
    indicatorSeparator: (style) => ({
      ...style,
      // backgroundColor: 'white',
    }),
    loadingIndicator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (style) => ({
      ...style,
      // color: 'white',
      ':hover': {
        // color: 'white',
      }
    }),
    menu: (style) => ({
      ...style,
      // color: theme.colors.tertiary,
    }),
    menuList: (style) => ({
      ...style,
      borderRadius: '4px',
    }),
    groupHeading: (style) => ({
      ...style,
      textTransform: 'capitalize',
      paddingTop: '1em',
      paddingBottom: '1em',
      backgroundColor: theme.colors.gray,
    }),
    option: (style, props) => ({
      ...style,
      backgroundColor: props.isFocused ? theme.colors.grey : props.isSelected ? theme.colors.gray : 'white',
      fontSize: '0.875em',
      // color: (props.isSelected || props.isFocused) ? 'white' : theme.colors.tertiary,
      cursor: 'pointer',
    }),
    loadingMessage: (style) => ({
      ...style,
      fontSize: '0.875em',
      padding: '1em 0',
    }),
    noOptionsMessage: (style) => ({
      ...style,
      fontSize: '0.875em',
      padding: '1em 0',
    })
  }
}

const Select = ({ label, value, onChange, options = [], disabled, isMulti, isSearchable, ...props }) => (
  <div css={styles.element}>
    <label>{label}</label>
    <ReactSelect
      // noOptionsMessage={({ inputValue }) => !inputValue ? '🔍 Search for anything !' : '🔦 No options left'}
      {...props}
      value={value}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      isSearchable={isSearchable}
      disabled={disabled}
      styles={styles.select}
    />
  </div>
)

export default Select
