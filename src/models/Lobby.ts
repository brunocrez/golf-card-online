import { IPlayer } from './Player'

export interface CreateLobbyRequest {
  nickname: string
  playerId: string
  image: string
}
export interface CreateLobbyResponse {
  id: string
  host: string
  status: string
  maxPlayers: number
  currentPlayers: number
  rounds: number
  players: IPlayer[]
}

export type GetLobbyResponse = CreateLobbyResponse

export type JoinLobbyRequest = CreateLobbyRequest

export type JoinLobbyResponse = CreateLobbyResponse
