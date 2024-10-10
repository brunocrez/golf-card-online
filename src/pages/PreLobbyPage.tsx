import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PickAvatar } from '@/components/PickAvatar'
import { Button } from '@/components/ui/button'
import { usePickAvatar } from '@/hooks/usePickAvatar'
import { FindLobbyDialog } from '@/components/FindLobbyDialog'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { Routes } from '@/routes'
import { CreateLobbyResponse } from '@/models/Lobby'
import { useGameContext } from '@/hooks/useGameContext'

export function PreLobbyPage() {
  const navigate = useNavigate()
  const props = usePickAvatar()
  const { socket } = useSocketConnection()
  const { setLobby } = useGameContext()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    socket.on('lobby-created', (lobby: CreateLobbyResponse) => {
      setLobby(lobby)
      navigate(`${Routes.LOBBY}/${lobby.id}`)
    })

    return () => {
      socket.off('lobby-created')
    }
  }, [socket, setLobby, navigate])

  const handleClickCreateLobby = () => {
    const { nickname, setError } = props

    if (!nickname.length || nickname.length < 3 || nickname.length > 12) {
      setError('o apelido deve conter entre 3 e 12 caracteres!')
      return
    }

    const player = {
      image: props.avatars[props.currIndex],
      nickname: props.nickname,
      playerId: socket.id,
    }

    setError('')

    socket.emit('create-lobby', player)
  }

  return (
    <>
      <FindLobbyDialog open={open} setOpen={setOpen} />

      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-6 px-5">
          <PickAvatar {...props} />

          <div className="flex flex-col md:flex-row gap-4">
            <Button
              className="bg-indigo-500 text-white font-bold hover:bg-indigo-400 w-full"
              onClick={handleClickCreateLobby}
            >
              criar nova sala
            </Button>
            <Button
              className="bg-green-500 text-white font-bold hover:bg-green-400 w-full"
              onClick={() => setOpen(true)}
            >
              buscar sala
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
