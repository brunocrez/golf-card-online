import { GetLobbyResponse } from './Lobby'

export interface CustomError {
  message: string
  success: boolean
  lobby: GetLobbyResponse
}
