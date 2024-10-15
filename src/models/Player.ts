import { Card } from './Card'

export interface Player {
  playerId: string
  nickname: string
  image: string
  score: number
  cards: Card[] | undefined
  isHost: boolean
  movesLeft: number
}
