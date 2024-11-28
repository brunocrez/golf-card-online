import { useSheetContext } from '@/hooks/useSheetContext'

export function TagRules() {
  const { setOpenSheet, setSheetType } = useSheetContext()

  return (
    <div
      className="flex justify-center items-center absolute w-20 h-10 rounded-l-lg bg-purple-600 top-16 right-0 cursor-pointer"
      onClick={() => {
        setOpenSheet(true)
        setSheetType('Regras')
      }}
    >
      <span className="text-white text-xs">regras</span>
    </div>
  )
}
