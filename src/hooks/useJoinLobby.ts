import { JoinLobbyRequest } from '@/models/Lobby'
import { joinLobby } from '@/services/joinLobby'
import { useQuery } from '@tanstack/react-query'

export function useJoinLobby(
  lobbyId: string,
  params: JoinLobbyRequest,
  enabled: boolean,
) {
  const { nickname } = params
  return useQuery({
    queryKey: ['useJoinLobby', nickname],
    queryFn: () => joinLobby(lobbyId, params),
    enabled,
  })
}
