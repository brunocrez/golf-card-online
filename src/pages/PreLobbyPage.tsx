import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { PickAvatar } from '@/components/PickAvatar'
import { Button } from '@/components/ui/button'
import { usePickAvatar } from '@/hooks/usePickAvatar'
import { FindLobbyDialog } from '@/components/FindLobbyDialog'
import { useCreateLobby } from '@/hooks/useCreateLobby'

export function PreLobbyPage() {
  const props = usePickAvatar()
  const [open, setOpen] = useState(false)

  const player = {
    image: props.avatars[props.currIndex],
    nickname: props.nickname,
    playerId: uuid(),
  }

  const { mutateAsync } = useCreateLobby(player)

  const handleClickCreateLobby = async () => {
    const { nickname, setError } = props

    if (!nickname.length || nickname.length < 3 || nickname.length > 12) {
      setError('o apelido deve conter entre 3 e 12 caracteres!')
      return
    }

    setError('')
    await mutateAsync()
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
