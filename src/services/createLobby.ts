import { AxiosResponse } from 'axios'
import { CreateLobbyRequest, CreateLobbyResponse } from '@/models/Lobby'
import { api } from './api/api-routes'

export async function createLobby(params: CreateLobbyRequest) {
  const response: AxiosResponse<CreateLobbyResponse> =
    await api.post<CreateLobbyResponse>('/lobby', params)

  return response.data
}
