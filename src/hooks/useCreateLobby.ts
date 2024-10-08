import { useNavigate } from 'react-router-dom'
import { CreateLobbyRequest } from '@/models/Lobby'
import { createLobby } from '@/services/createLobby'
import { useMutation } from '@tanstack/react-query'
import { useGameContext } from './useGameContext'
import { Routes } from '@/routes'

export function useCreateLobby(payload: CreateLobbyRequest) {
  const navigate = useNavigate()
  const { setLobby } = useGameContext()

  return useMutation({
    mutationKey: ['useCreateLobby', payload.nickname],
    mutationFn: () => createLobby(payload),
    onSuccess: (data) => {
      setLobby({ ...data })
      navigate(`${Routes.LOBBY}/${data.id}`)
    },
  })
}
