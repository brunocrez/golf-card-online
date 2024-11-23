import { useCallback, useMemo } from 'react'
import { BlockerFunction, useBeforeUnload, useBlocker } from 'react-router-dom'

export function useBlockLeaving(lobbyId: string) {
  const allowedPaths = useMemo(() => {
    return [`/game/${lobbyId}`, '/award']
  }, [lobbyId])

  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      return (
        currentLocation.pathname !== nextLocation.pathname &&
        !allowedPaths.includes(nextLocation.pathname)
      )
    },
    [allowedPaths],
  )

  useBeforeUnload((e: BeforeUnloadEvent) => {
    e.preventDefault()
  })

  const { state, proceed, reset } = useBlocker(shouldBlock)

  return { state, proceed, reset }
}
