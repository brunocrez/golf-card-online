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
import { useGetLobby } from '@/hooks/useGetLobby'

interface FindRoomDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function FindRoomDialog({ open, setOpen }: FindRoomDialogProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [enabled, setEnabled] = useState(false)

  const { data, isSuccess } = useGetLobby(value, enabled)

  const handleClick = () => {
    if (!value.length || value.length !== 12) {
      setError('o código da sala deve conter 12 caracteres!')
      return
    }

    setEnabled(true)
  }

  useEffect(() => {
    if (isSuccess) {
      if (!data) {
        setError('Não encontramos nenhuma sala com esse código!')
      } else {
        setError('')
        navigate(`${Routes.MATCH_ROOM}/${value}`)
      }

      setEnabled(false)
    }
  }, [data, isSuccess, navigate, value])

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
