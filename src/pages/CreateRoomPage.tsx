import { LobbyPlayer } from '@/components/LobbyPlayer'
import { Button } from '@/components/ui/button'
import { usePlayerContext } from '@/hooks/usePlayerContext'
import { Copy } from 'lucide-react'

export function CreateRoomPage() {
  const { player } = usePlayerContext()

  return (
    <div className="h-screen flex flex-col justify-center items-center px-5">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
          <h2
            className="text-xs sm:text-lg"
            style={{ fontFamily: "'Press Start 2P'" }}
          >
            sala: xoiwekn2l-dpki
          </h2>
          <Button className="flex gap-2 w-fit bg-indigo-500 hover:bg-indigo-400">
            copiar código <Copy aria-hidden={true} />
          </Button>
        </div>
        <div className="flex items-center gap-4 border-b-2 border-slate-400 pb-6">
          <img src={player?.image} alt="" className="w-36 h-36" />
          <div className="flex flex-col gap-2">
            <p>{player?.nickname}</p>
            <p>0 pontos</p>
            <div className="uppercase bg-indigo-500 text-white p-1 text-center rounded-md w-full max-w-28">
              host
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          {Array.from({ length: 3 }).map((_, idx) => (
            <LobbyPlayer key={idx} />
          ))}
        </div>

        <Button className="bg-green-500 hover:bg-green-400 text-white font-bold text-xl">
          iniciar jogo
        </Button>
      </div>
    </div>
  )
}
