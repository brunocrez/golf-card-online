import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LobbyPlayer } from '@/components/LobbyPlayer'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useGameContext } from '@/hooks/useGameContext'
import { filterPlayer } from '@/utils/filterPlayer'

export function LobbyPage() {
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const { lobby, setLobby } = useGameContext()
  const res = filterPlayer(lobby)

  useEffect(() => {
    if (!lobbyId) {
      console.error('Lobby ID não está definido.')
      return
    }

    const ws = new WebSocket(`ws://localhost:8080/lobby/ws/${lobbyId}`)

    ws.onopen = () => {
      console.log(`Conectado ao WebSocket no lobby: ${lobbyId}`)
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data.type === 'playerJoined') {
        const newPlayer = data.player

        setLobby((prevLobby) => {
          if (!prevLobby) {
            return prevLobby
          }

          return {
            ...prevLobby,
            players: [...prevLobby.players, newPlayer],
            currentPlayers: prevLobby.currentPlayers + 1,
          }
        })
      }
    }

    ws.onerror = (error) => {
      console.error('Erro no WebSocket:', error)
    }

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada')
    }

    return () => {
      ws.close()
      console.log('WebSocket desconectado')
    }
  }, [lobbyId, setLobby])

  return (
    <div className="h-screen flex flex-col justify-center items-center px-5">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
          <h2
            className="text-sm sm:text-xl"
            style={{ fontFamily: "'Press Start 2P'" }}
          >
            sala: {lobbyId}
          </h2>
          <Button className="flex gap-2 w-fit bg-indigo-500 hover:bg-indigo-400">
            copiar código <Copy aria-hidden={true} />
          </Button>
        </div>
        <div className="flex items-center gap-4 border-b-2 border-slate-400 pb-6">
          <img
            src={res?.hostPlayer?.image}
            alt="avatar"
            className="w-36 h-36"
          />
          <div className="flex flex-col gap-2">
            <p>{res?.hostPlayer?.nickname}</p>
            <p>0 pontos</p>
            <div className="bg-indigo-500 text-white p-1 text-center rounded-md w-full max-w-28">
              host
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {res?.regularPlayers?.map((player) => (
            <LobbyPlayer
              key={player.id}
              image={player.image}
              nickname={player.nickname}
            />
          ))}
        </div>

        <Button className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl">
          iniciar jogo
        </Button>
      </div>
    </div>
  )
}
