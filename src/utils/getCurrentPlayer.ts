import { Player } from '@/models/Player'
import { Socket } from 'socket.io-client'

export function getCurrentPlayer(socket: Socket, players: Player[]) {
  const [currPlayer] = players.filter((p) => p.playerId === socket.id)
  const enemies = players.filter((p) => p.playerId !== socket.id)

  return { currPlayer, enemies }
}
