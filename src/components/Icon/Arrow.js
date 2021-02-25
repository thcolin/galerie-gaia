
const Arrow = ({ direction = 'right', ...props }) => ({
  left: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' {...props}>
      <path fill='currentColor' d='M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z' />
    </svg>
  ),
  right: (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' {...props}>
      <path fill='currentColor' d='M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z' />
    </svg>
  ),
}[direction])

export default Arrow
