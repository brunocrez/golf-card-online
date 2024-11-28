import { useSheetContext } from '@/hooks/useSheetContext'

export function TagScore() {
  const { setOpenSheet, setSheetType } = useSheetContext()

  return (
    <div
      className="flex justify-center items-center absolute w-20 h-10 rounded-l-lg bg-green-500 top-28 right-0 cursor-pointer"
      onClick={() => {
        setOpenSheet(true)
        setSheetType('Placar')
      }}
    >
      <span className="text-white text-xs">placar</span>
    </div>
  )
}
