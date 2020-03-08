import { useState } from 'react'

const defaults = {
  initial: 0,
}

export default function usePagination (data, count, options = {}) {
  const [page, setPage] = useState(options.initial || defaults.initial)

  return {
    page,
    setPage,
    pieces: data.slice(page * count, (page + 1) * count),
    length: Math.ceil(data.length / count),
  }
}
