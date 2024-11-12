import { Minus } from 'lucide-react'
import { Button } from './ui/button'

interface LobbyPlayerProps {
  image: string
  nickname: string
  width?: number
  height?: number
  kickPlayer?: boolean
}

export function LobbyPlayer({
  image,
  nickname,
  width = 20,
  height = 20,
  kickPlayer = false,
}: LobbyPlayerProps) {
  return (
    <div className="flex items-center flex-col gap-2 relative">
      <img src={image} className={`w-${width} h-${height}`} />
      <p className="text-center text-slate-600">{nickname}</p>
      {kickPlayer && (
        <Button className="absolute top-0 right-0 p-1 rounded-full w-9 h-9 bg-red-600 hover:bg-red-600 hover:scale-105 text-white">
          <Minus size={16} />
        </Button>
      )}
    </div>
  )
}
