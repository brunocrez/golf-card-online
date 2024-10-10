import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spade, User } from 'lucide-react'
import { PickAvatar } from '@/components/PickAvatar'
import { Button } from '@/components/ui/button'
import { usePickAvatar } from '@/hooks/usePickAvatar'
import { Routes } from '@/routes'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { JoinLobbyResponse } from '@/models/Lobby'

export function MatchRoom() {
  const navigate = useNavigate()
  const props = usePickAvatar()
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const { lobby, setLobby } = useGameContext()
  const { socket } = useSocketConnection()

  useEffect(() => {
    socket.on('joined-lobby', (payload: JoinLobbyResponse) => {
      setLobby(payload)
      navigate(`${Routes.LOBBY}/${payload.id}`)
    })

    return () => {
      socket.off('joined-lobby')
    }
  })

  const handleClick = async () => {
    const { nickname } = props

    if (!nickname.length || nickname.length < 3 || nickname.length > 12) {
      props.setError('o apelido deve conter entre 3 e 12 caracteres!')
      return
    }

    const payload = {
      image: props.avatars[props.currIndex],
      nickname: props.nickname,
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
          <section>
            <PickAvatar {...props} />
          </section>
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full p-2 border-2 border-slate-300 flex justify-center items-center">
                <Spade size={64} color="#64748b" />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Partidas</p>
                <p className="text-slate-600">0/6</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full p-2 border-2 border-slate-300 flex justify-center items-center">
                <User size={64} color="#64748b" />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Jogadores</p>
                <p className="text-slate-600">2/6</p>
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
