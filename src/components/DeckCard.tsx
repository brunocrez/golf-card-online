import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { useEffect, useState } from 'react'

interface DeckCardProps {
  image: string
  alt: string
  faceUp: boolean
  code: string
  isCurrentPlayer: boolean
}

export function DeckCard({
  image,
  alt,
  faceUp,
  code,
  isCurrentPlayer,
}: DeckCardProps) {
  const { socket } = useSocketConnection()
  const { lobby } = useGameContext()
  const [isFaceDown, setIsFaceDown] = useState(!faceUp)

  const handleFlip = () => {
    if (!isFaceDown || !isCurrentPlayer) {
      return
    }

    if (lobby?.currentTurn !== socket.id) {
      return
    }

    const payload = {
      card: code,
      playerId: socket.id,
      lobbyId: lobby?.id ?? '',
    }

    setIsFaceDown((prev) => !prev)
    socket.emit('flip-card', payload)
  }

  useEffect(() => {
    setIsFaceDown(!faceUp)
  }, [faceUp])

  const cardClasses = `card hover:cursor-pointer ${isFaceDown ? 'flipped' : ''}`

  return (
    <div className="card-container" onClick={handleFlip}>
      <div className={cardClasses}>
        <div className="card-front">
          <img className="w-full h-full" src={image} alt={alt} />
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  )
}
