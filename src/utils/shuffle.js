const shuffle = (array, seed) => {
  let m = array.length, t, i

  while (m) {
    i = Math.floor(random(seed) * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
    ++seed
  }

  return array
}

const random = (seed) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default shuffle
