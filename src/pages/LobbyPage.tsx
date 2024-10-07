import { useParams } from 'react-router-dom'
import { LobbyPlayer } from '@/components/LobbyPlayer'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useGetLobby } from '@/hooks/useGetLobby'
import { filterPlayer } from '@/utils/filterPlayer'

export function LobbyPage() {
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const { data } = useGetLobby(lobbyId ?? '', true, 3000)
  const result = filterPlayer(data)

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
            src={result?.hostPlayer?.image}
            alt="avatar"
            className="w-36 h-36"
          />
          <div className="flex flex-col gap-2">
            <p>{result?.hostPlayer?.nickname}</p>
            <p>0 pontos</p>
            <div className="bg-indigo-500 text-white p-1 text-center rounded-md w-full max-w-28">
              host
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {result?.regularPlayers?.map((player) => (
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
