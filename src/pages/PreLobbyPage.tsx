import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PickAvatar } from '@/components/PickAvatar'
import { Button } from '@/components/ui/button'
import { Routes } from '@/routes'
import { usePlayerContext } from '@/hooks/usePlayerContext'
import { usePickAvatar } from '@/hooks/usePickAvatar'
import { generateRandomKey } from '@/utils/generateRandomKey'
import { FindRoomDialog } from '@/components/FindRoomDialog'

export function PreLobbyPage() {
  const navigate = useNavigate()
  const { setPlayer } = usePlayerContext()
  const props = usePickAvatar()

  const [open, setOpen] = useState(false)

  const handleClickCreateRoom = () => {
    const { nickname, setError, avatars, currIndex } = props

    if (!nickname.length || nickname.length < 3 || nickname.length > 12) {
      setError('o apelido deve conter entre 3 e 12 caracteres!')
      return
    }

    setError('')
    setPlayer?.({
      image: avatars[currIndex],
      isHost: true,
      nickname,
    })

    navigate(`${Routes.LOBBY}/${generateRandomKey()}`)
  }

  return (
    <>
      <FindRoomDialog open={open} setOpen={setOpen} />

      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-6 px-5">
          <PickAvatar {...props} />

          <div className="flex flex-col md:flex-row gap-4">
            <Button
              className="bg-indigo-500 text-white font-bold hover:bg-indigo-400 w-full"
              onClick={handleClickCreateRoom}
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
