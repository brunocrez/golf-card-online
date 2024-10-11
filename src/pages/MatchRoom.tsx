import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spade, User } from 'lucide-react'
import { PickAvatar } from '@/components/PickAvatar'
import { Button } from '@/components/ui/button'
import { Routes } from '@/routes'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { JoinLobbyResponse } from '@/models/Lobby'
import { IError } from '@/models/Error'
import { useToast } from '@/hooks/use-toast'
import { usePlayerContext } from '@/hooks/usePlayerContext'

export function MatchRoom() {
  const navigate = useNavigate()
  const { nickname, setError, avatars, currIndex } = usePlayerContext()
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const { lobby, setLobby } = useGameContext()
  const { socket } = useSocketConnection()
  const { toast } = useToast()

  useEffect(() => {
    socket.on('joined-lobby', (payload: JoinLobbyResponse) => {
      setLobby(payload)
      navigate(`${Routes.LOBBY}/${payload.id}`)
    })

    socket.on('full-lobby', (payload: IError) => {
      setLobby(payload.lobby)
      toast({
        title: payload.message,
        className: 'bg-red-500 text-white font-bold',
        duration: 3 * 1000, // 3 seconds
      })
    })

    return () => {
      socket.off('joined-lobby')
      socket.off('full-lobby')
    }
  }, [setLobby, navigate, socket, toast])

  const handleClick = async () => {
    if (!nickname.length || nickname.length < 3 || nickname.length > 12) {
      setError('o apelido deve conter entre 3 e 12 caracteres!')
      return
    }

    const payload = {
      image: avatars[currIndex],
      nickname: nickname,
      playerId: socket.id,
      lobbyId,
    }

    socket.emit('join-lobby', payload)
  }

  useEffect(() => {
    if (!lobby) {
      navigate(Routes.PRE_LOBBY)
    }
  }, [lobby, navigate])

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-12">
          <PickAvatar />
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full p-2 border-2 border-slate-300 flex justify-center items-center">
                <Spade size={64} color="#64748b" />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Partidas</p>
                <p className="text-slate-600">0/{lobby?.rounds}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full p-2 border-2 border-slate-300 flex justify-center items-center">
                <User size={64} color="#64748b" />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Jogadores</p>
                <p className="text-slate-600">
                  {lobby?.currentPlayers}/{lobby?.maxPlayers}
                </p>
              </div>
            </div>
          </section>
        </div>
        <Button
          className="py-6 bg-indigo-500 text-white font-bold hover:bg-indigo-400"
          onClick={handleClick}
        >
          entrar na sala
        </Button>
      </div>
    </div>
  )
}
