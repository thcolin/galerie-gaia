export const getYoutubeId = (url) => {
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  return typeof arr[2] !== 'undefined' ? arr[2].split(/[^\w-]/i)[0] : arr[0]
}
