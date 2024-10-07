import { CreateLobbyResponse } from '@/models/Lobby'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface GameContextProps {
  lobby: CreateLobbyResponse | undefined
  setLobby: Dispatch<SetStateAction<CreateLobbyResponse | undefined>>
}

export const GameContext = createContext<GameContextProps>(
  {} as GameContextProps,
)

interface GameContextProviderProps {
  children: ReactNode
}

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [lobby, setLobby] = useState<CreateLobbyResponse | undefined>(undefined)

  return (
    <GameContext.Provider value={{ lobby, setLobby }}>
      {children}
    </GameContext.Provider>
  )
}
