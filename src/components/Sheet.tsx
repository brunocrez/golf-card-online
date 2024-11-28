import { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet as SheetRoot,
} from '@/components/ui/sheet'
import { useSheetContext } from '@/hooks/useSheetContext'

interface SheetProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
}

export function Sheet({ open, setOpen, children }: SheetProps) {
  const { sheetType } = useSheetContext()
  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-primary border-l-0">
        <SheetHeader>
          <SheetTitle className="">{sheetType}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </SheetRoot>
  )
}
