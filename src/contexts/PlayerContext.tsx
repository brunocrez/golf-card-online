import { generateAvatars } from '@/utils/generateAvatars'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

interface PlayerContextProps {
  nickname: string
  setNickname: Dispatch<SetStateAction<string>>
  avatars: string[]
  currIndex: number
  setCurrIndex: Dispatch<SetStateAction<number>>
  error: string
  setError: Dispatch<SetStateAction<string>>
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
  const [nickname, setNickname] = useState('')
  const [avatars, setAvatars] = useState<string[]>([])
  const [currIndex, setCurrIndex] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    const generatedAvatars = generateAvatars()
    setAvatars(generatedAvatars)
  }, [setAvatars])

  return (
    <PlayerContext.Provider
      value={{
        nickname,
        setNickname,
        avatars,
        currIndex,
        setCurrIndex,
        error,
        setError,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
