import { Player } from '@/models/Player'
import { Socket } from 'socket.io-client'

export function getCurrentPlayer(socket: Socket, players: Player[]) {
  const [currPlayer] = players.filter((p) => p.playerId === socket.id)
  const [enemy] = players.filter((p) => p.playerId !== socket.id)

  return { currPlayer, enemy }
}
