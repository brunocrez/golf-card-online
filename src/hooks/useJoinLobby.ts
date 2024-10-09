import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { joinLobby } from '@/services/joinLobby'
import { useGameContext } from './useGameContext'
import { Routes } from '@/routes'
import { JoinLobbyRequest } from '@/models/Lobby'

export function useJoinLobby(lobbyId: string, payload: JoinLobbyRequest) {
  const navigate = useNavigate()
  const { setLobby } = useGameContext()

  return useMutation({
    mutationKey: ['useJoinLobby', payload.nickname],
    mutationFn: () => joinLobby(lobbyId ?? '', payload),
    onSuccess: (data) => {
      setLobby({ ...data })
      navigate(`${Routes.LOBBY}/${lobbyId}`)
    },
  })
}
