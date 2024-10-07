import { useContext } from 'react'
import { GameContext } from '@/contexts/GameContext'

export function useGameContext() {
  const ctx = useContext(GameContext)

  if (!ctx) {
    throw new Error('useGameContext must be used within GameContextProvider!')
  }

  return ctx
}
