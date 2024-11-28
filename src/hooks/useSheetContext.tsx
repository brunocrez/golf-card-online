import { useContext } from 'react'
import { SheetContext } from '@/contexts/SheetContext'

export function useSheetContext() {
  const ctx = useContext(SheetContext)

  if (!ctx) {
    throw new Error(
      'usePlayerContext must be used within SheetContextProvider!',
    )
  }

  return ctx
}
