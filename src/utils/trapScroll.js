const trapScroll = (enable) => {
  document.body.style['max-height'] = enable ? '100vh' : 'initial'
  document.body.style['overflow'] = enable ? 'hidden' : 'initial'
}

export default trapScroll
