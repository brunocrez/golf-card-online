import { useState } from 'react'

export function usePickAvatar() {
  const [nickname, setNickname] = useState('')
  const [avatars, setAvatars] = useState<string[]>([])
  const [currIndex, setCurrIndex] = useState(0)
  const [error, setError] = useState('')

  return {
    nickname,
    setNickname,
    avatars,
    setAvatars,
    currIndex,
    setCurrIndex,
    error,
    setError,
  }
}
