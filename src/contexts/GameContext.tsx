import { Card } from '@/models/Card'
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
  isReplaceMode: boolean
  setIsReplaceMode: Dispatch<SetStateAction<boolean>>
  cardToBeReplaced: Card | undefined
  setCardToBeReplaced: Dispatch<SetStateAction<Card | undefined>>
  suspendedCard: Card | undefined
  setSuspendedCard: Dispatch<SetStateAction<Card | undefined>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const GameContext = createContext<GameContextProps>(
  {} as GameContextProps,
)

interface GameContextProviderProps {
  children: ReactNode
}

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [lobby, setLobby] = useState<CreateLobbyResponse | undefined>(undefined)
  const [isReplaceMode, setIsReplaceMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [suspendedCard, setSuspendedCard] = useState<Card | undefined>(
    undefined,
  )
  const [cardToBeReplaced, setCardToBeReplaced] = useState<Card | undefined>(
    undefined,
  )

  return (
    <GameContext.Provider
      value={{
        lobby,
        setLobby,
        isReplaceMode,
        setIsReplaceMode,
        cardToBeReplaced,
        setCardToBeReplaced,
        suspendedCard,
        setSuspendedCard,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
