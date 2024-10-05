import { useContext } from 'react'
import { PlayerContext } from '@/contexts/PlayerContext'

export function usePlayerContext() {
  const ctx = useContext(PlayerContext)

  if (!ctx) {
    throw new Error(
      'usePlayerContext must be used within PlayerContextProvider!',
    )
  }

  return ctx
}
