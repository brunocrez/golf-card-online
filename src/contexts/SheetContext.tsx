import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

export type SheetType = 'Regras' | 'Placar' | undefined

interface SheetContextProps {
  openSheet: boolean
  setOpenSheet: Dispatch<SetStateAction<boolean>>
  sheetType: SheetType
  setSheetType: Dispatch<SetStateAction<SheetType>>
}

export const SheetContext = createContext<SheetContextProps>(
  {} as SheetContextProps,
)

interface SheetContextProviderProps {
  children: ReactNode
}

export function SheetContextProvider({ children }: SheetContextProviderProps) {
  const [openSheet, setOpenSheet] = useState(false)
  const [sheetType, setSheetType] = useState<SheetType>(undefined)

  return (
    <SheetContext.Provider
      value={{ openSheet, setOpenSheet, sheetType, setSheetType }}
    >
      {children}
    </SheetContext.Provider>
  )
}
