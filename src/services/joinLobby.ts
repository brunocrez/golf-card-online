import { AxiosResponse } from 'axios'
import { api } from './api/api-routes'
import { JoinLobbyRequest, JoinLobbyResponse } from '@/models/Lobby'

export async function joinLobby(lobbyId: string, params: JoinLobbyRequest) {
  const response: AxiosResponse<JoinLobbyResponse> =
    await api.post<JoinLobbyResponse>(`/lobby/join/${lobbyId}`, params)
  return response.data
}
