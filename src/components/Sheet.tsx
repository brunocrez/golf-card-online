import { Dispatch, SetStateAction } from 'react'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet as SheetRoot,
} from '@/components/ui/sheet'
import { useSheetContext } from '@/hooks/useSheetContext'
import { Trophy } from 'lucide-react'
import { useGameContext } from '@/hooks/useGameContext'

interface SheetProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function Sheet({ open, setOpen }: SheetProps) {
  const { sheetType } = useSheetContext()
  const { lobby } = useGameContext()

  function bgColor(idx: number) {
    switch (idx) {
      case 0:
        return 'bg-yellow-400'
      case 1:
        return 'bg-slate-500'
      case 2:
        return 'bg-yellow-700'
      default:
        return 'bg-slate-100'
    }
  }

  function ScoreEmtpyState() {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white rounded-lg py-5 px-3"
          >
            <div className="flex justify-center items-center w-4 h-4 p-3 sm:p-5 rounded-full bg-slate-300"></div>
            <div className="w-full h-5 bg-slate-300 rounded-md"></div>
            <div className="w-10 h-5 bg-slate-300 rounded-md"></div>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50">
          <div className="flex justify-center items-center p-1 w-12 h-12 rounded-full mb-4 bg-slate-400">
            <Trophy className="text-gray-100" />
          </div>
          <p className="text-gray-500 text-sm text-center">
            O placar ainda está vazio. Finalize uma rodada para que os pontos
            sejam exibidos!
          </p>
        </div>
      </div>
    )
  }

  function getScoreBoard() {
    if (!lobby?.scoreBoard) {
      return <ScoreEmtpyState />
    }

    return (
      <div className="flex flex-col gap-4">
        {lobby.scoreBoard.map((p, idx) => (
          <div
            key={p.playerId}
            className="flex items-center gap-4 bg-white rounded-lg border-2 border-dashed border-gray-300 py-5 px-3"
          >
            <div
              className={`flex justify-center items-center w-4 h-4 p-3 sm:p-5 rounded-full ${bgColor(
                idx,
              )}`}
            >
              <span
                className={`font-bold text-xs sm:text-base ${
                  idx < 3 ? 'text-white' : ''
                }`}
              >
                {idx + 1}º
              </span>
            </div>
            <span className="text-xs sm:text-base">{p.nickname}</span>
            <span className="ml-auto text-xs sm:text-base">{p.score} pts</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-primary border-l-0">
        <SheetHeader className="mb-4">
          <SheetTitle className="">{sheetType}</SheetTitle>
        </SheetHeader>
        {sheetType === 'Placar' ? getScoreBoard() : <span>regras!</span>}
      </SheetContent>
    </SheetRoot>
  )
}
