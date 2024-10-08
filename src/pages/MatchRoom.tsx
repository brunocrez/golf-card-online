import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { v4 as uuid } from 'uuid'
import { Spade, User } from 'lucide-react'
import { PickAvatar } from '@/components/PickAvatar'
import { Button } from '@/components/ui/button'
import { usePickAvatar } from '@/hooks/usePickAvatar'
import { Routes } from '@/routes'
import { joinLobby } from '@/services/joinLobby'
import { useGameContext } from '@/hooks/useGameContext'

export function MatchRoom() {
  const navigate = useNavigate()
  const props = usePickAvatar()
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const { setLobby } = useGameContext()

  const joiningPlayer = {
    image: props.avatars[props.currIndex],
    nickname: props.nickname,
    playerId: uuid(),
  }

  const { mutateAsync } = useMutation({
    mutationKey: ['joinLobby', props.nickname],
    mutationFn: () => joinLobby(lobbyId ?? '', joiningPlayer),
    onSuccess: (data) => {
      setLobby({ ...data })
      navigate(`${Routes.LOBBY}/${lobbyId}`)
    },
  })

  const handleClick = async () => {
    const { nickname } = props

    if (!nickname.length || nickname.length < 3 || nickname.length > 12) {
      props.setError('o apelido deve conter entre 3 e 12 caracteres!')
      return
    }

    await mutateAsync()
  }

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
