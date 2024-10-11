import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Routes } from '@/routes'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { GetLobbyResponse } from '@/models/Lobby'

interface FindLobbyDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function FindLobbyDialog({ open, setOpen }: FindLobbyDialogProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const { setLobby } = useGameContext()
  const { socket } = useSocketConnection()

  useEffect(() => {
    socket.on('lobby-not-found', (message: string) => {
      setError(message)
    })

    socket.on('lobby-details', (lobby: GetLobbyResponse) => {
      setError('')
      setLobby(lobby)
      navigate(`${Routes.MATCH_ROOM}/${value}`)
    })

    return () => {
      socket.off('lobby-not-found')
      socket.off('lobby-details')
    }
  }, [socket, navigate, setError, setLobby, value])

  const handleClick = () => {
    if (!value.length || value.length !== 12) {
      setError('o código da sala deve conter 12 caracteres!')
      return
    }

    socket.emit('get-lobby', value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>buscar salas disponíveis</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              placeholder="digite o código da sala"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={12}
              className={`${error ? 'border border-red-500' : ''}`}
            />
            {error ? (
              <span className="text-red-500 text-sm">{error}</span>
            ) : null}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            className="bg-indigo-500 hover:bg-indigo-500 text-white font-bold"
            onClick={handleClick}
          >
            procurar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
