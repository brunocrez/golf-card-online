interface Props {
  scoreArray: number[]
}

export function ColumnScore({ scoreArray }: Props) {
  return (
    <div className="flex justify-between mx-6">
      {scoreArray.map((score, idx) => {
        return (
          <div
            key={idx}
            className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center  "
          >
            <span className="text-xs text-white font-bold">{score}</span>
          </div>
        )
      })}
    </div>
  )
}
