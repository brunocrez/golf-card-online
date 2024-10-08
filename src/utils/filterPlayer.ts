import { CreateLobbyResponse } from '@/models/Lobby'
import { IPlayer } from '@/models/Player'

export function filterPlayer(data: CreateLobbyResponse | undefined) {
  if (!data) {
    return
  }

  const { host, players } = data

  const hostPlayer = players.find((player: IPlayer) => player.id === host)
  const regularPlayers = players.filter((player) => player.id !== host)

  return { hostPlayer, regularPlayers }
}
