import { GetLobbyResponse } from '@/models/Lobby'
import { AxiosResponse } from 'axios'
import { api } from './api/api-routes'

export async function getLobby(lobbyId: string) {
  const response: AxiosResponse<GetLobbyResponse> =
    await api.get<GetLobbyResponse>(`/lobby/${lobbyId}`)

  return response.data
}
