import { AxiosResponse } from 'axios'
import { api } from './api/api-routes'
import { JoinLobbyRequest } from '@/models/Lobby'

export async function joinLobby(lobbyId: string, params: JoinLobbyRequest) {
  const response: AxiosResponse<{ message: string }> = await api.post<{
    message: string
  }>(`/lobby/join/${lobbyId}`, params)
  return response.data
}
