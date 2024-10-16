import { Card } from './Card'
import { Player } from './Player'

export interface CreateLobbyRequest {
  nickname: string
  playerId: string
  image: string
}

interface Deck {
  deck_id: string
  remaining: number
}
export interface CreateLobbyResponse {
  id: string
  host: string
  status: string
  maxPlayers: number
  currentPlayers: number
  players: Player[]
  rounds: number
  deck: Deck | undefined
  discardPile: Card[]
  currentTurn: string | undefined
  isFirstTurn: boolean
  isLastTurn: boolean
  playerStartedLastTurn: string | undefined
  createdAt: Date
  updatedAt: Date
}

export type GetLobbyResponse = CreateLobbyResponse

export type JoinLobbyRequest = CreateLobbyRequest

export type JoinLobbyResponse = CreateLobbyResponse
