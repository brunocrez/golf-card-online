import { GetLobbyResponse } from '@/models/Lobby'
import { IPlayer } from '@/models/Player'

export function filterPlayer(data: GetLobbyResponse | undefined) {
  if (!data) {
    return
  }

  const { host, players } = data

  const hostPlayer = players.find((player: IPlayer) => player.id === host)
  const regularPlayers = players.filter((player) => player.id !== host)

  return { hostPlayer, regularPlayers }
}
