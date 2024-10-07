import { Minus } from 'lucide-react'
import { Button } from './ui/button'

interface LobbyPlayerProps {
  image: string
  nickname: string
}

export function LobbyPlayer({ image, nickname }: LobbyPlayerProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <img src={image} className="w-24 h-24" />
      <p>{nickname}</p>
      <Button className="absolute top-0 right-0 p-1 rounded-full w-9 h-9 bg-red-600 hover:bg-red-600 hover:scale-105 text-white">
        <Minus size={16} />
      </Button>
    </div>
  )
}
