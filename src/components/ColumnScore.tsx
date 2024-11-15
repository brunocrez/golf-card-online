interface Props {
  scoreArray: number[]
}

export function ColumnScore({ scoreArray }: Props) {
  return (
    <>
      {scoreArray.map((score, idx) => {
        return (
          <div
            key={idx}
            className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center justify-self-center"
          >
            <span className="text-white font-bold" style={{ fontSize: '10px' }}>
              {score}
            </span>
          </div>
        )
      })}
    </>
  )
}
