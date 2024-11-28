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

interface ScoreBoard {
  nickname: string
  score: number
  playerId: string
  image: string
}

export interface CreateLobbyResponse {
  id: string
  host: string
  status: string
  maxPlayers: number
  currentPlayers: number
  players: Player[]
  rounds: number
  currentRound: number
  scoreBoard: ScoreBoard[] | undefined
  deck: Deck | undefined
  discardPile: Card[]
  currentTurn: string | undefined
  playerStartedLastTurn: string | undefined
  drawnCard: Card | undefined
}

export type GetLobbyResponse = CreateLobbyResponse

export type JoinLobbyResponse = CreateLobbyResponse
