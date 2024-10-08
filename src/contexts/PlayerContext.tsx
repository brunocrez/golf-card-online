import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

export interface Player {
  nickname: string
  image: string
  isHost: boolean
  id: string
}

interface PlayerContextProps {
  player: Player | undefined
  setPlayer: Dispatch<SetStateAction<Player | undefined>>
}

export const PlayerContext = createContext<PlayerContextProps>(
  {} as PlayerContextProps,
)

interface PlayerContextProviderProps {
  children: ReactNode
}

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [player, setPlayer] = useState<Player | undefined>(undefined)

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  )
}
