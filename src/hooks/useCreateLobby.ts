import { CreateLobbyRequest } from '@/models/Lobby'
import { createLobby } from '@/services/createLobby'
import { useQuery } from '@tanstack/react-query'

export function useCreateLobby(params: CreateLobbyRequest, enabled: boolean) {
  const { nickname } = params
  return useQuery({
    queryKey: ['useCreateLobby', nickname],
    queryFn: () => createLobby(params),
    enabled,
  })
}
