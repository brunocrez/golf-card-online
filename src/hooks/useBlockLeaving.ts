import { useCallback } from 'react'
import { BlockerFunction, useBeforeUnload, useBlocker } from 'react-router-dom'

export function useBlockLeaving(lobbyId: string) {
  const allowedPath = `/game/${lobbyId}`
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => {
      return (
        currentLocation.pathname !== nextLocation.pathname &&
        nextLocation.pathname !== allowedPath
      )
    },
    [allowedPath],
  )

  useBeforeUnload((e: BeforeUnloadEvent) => {
    e.preventDefault()
  })

  const { state, proceed, reset } = useBlocker(shouldBlock)

  return { state, proceed, reset }
}
