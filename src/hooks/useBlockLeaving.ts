import { useCallback } from 'react'
import { BlockerFunction, useBeforeUnload, useBlocker } from 'react-router-dom'

export function useBlockLeaving() {
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      return currentLocation.pathname !== nextLocation.pathname
    },
    [],
  )

  useBeforeUnload((e: BeforeUnloadEvent) => {
    e.preventDefault()
  })

  const { state, proceed, reset } = useBlocker(shouldBlock)

  return { state, proceed, reset }
}
