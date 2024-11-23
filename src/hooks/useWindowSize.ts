import { useState } from 'react'

export function useWindowSize() {
  const [width] = useState(() => window.innerWidth)
  const [height] = useState(() => window.innerHeight)

  return { width, height }
}
