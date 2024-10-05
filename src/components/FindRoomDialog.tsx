import { Dispatch, SetStateAction, useState } from 'react'
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

interface FindRoomDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function FindRoomDialog({ open, setOpen }: FindRoomDialogProps) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')

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
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            className="bg-indigo-500 hover:bg-indigo-500 text-white font-bold"
            onClick={() => navigate(`${Routes.MATCH_ROOM}/${value}`)}
          >
            procurar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
