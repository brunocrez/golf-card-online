import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Routes } from '@/routes'
import { useGameContext } from '@/hooks/useGameContext'

interface LeavingDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  proceed: (() => void) | undefined
  reset: (() => void) | undefined
}

export function LeavingDialog({
  open,
  proceed,
  setOpen,
  reset,
}: LeavingDialogProps) {
  const navigate = useNavigate()
  const { setLobby } = useGameContext()

  const handleClick = () => {
    setLobby(undefined)
    navigate(Routes.PRE_LOBBY)
    setOpen(false)
    proceed?.()
  }

  const handleClose = () => {
    reset?.()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>tem certeza de que deseja sair?</DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            className="bg-red-500 hover:bg-red-500 text-white font-bold"
            onClick={handleClick}
          >
            sair
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
