import { CreateLobbyResponse } from '@/models/Lobby'
import { Player } from '@/models/Player'

export function filterPlayer(data: CreateLobbyResponse | undefined) {
  if (!data) {
    return
  }

  const { host, players } = data

  const hostPlayer = players.find((player: Player) => player.playerId === host)
  const regularPlayers = players.filter((player) => player.playerId !== host)

  return { hostPlayer, regularPlayers }
}
