const Heading = ({ children, level: Level = 'h1', ...props }) => (
  <Level css={Heading.styles.element}>
    {children}
  </Level>
)

Heading.styles = {
  element: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  }
}

export default Heading
