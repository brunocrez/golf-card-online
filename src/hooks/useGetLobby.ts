import { getLobby } from '@/services/getLobby'
import { useQuery } from '@tanstack/react-query'

export function useGetLobby(
  lobbyId: string,
  enabled?: boolean,
  refetchInterval = 5 * 60 * 1000, // 5 minutes
) {
  return useQuery({
    queryKey: ['useGetLobby', lobbyId],
    queryFn: () => getLobby(lobbyId),
    enabled,
    refetchInterval,
  })
}
