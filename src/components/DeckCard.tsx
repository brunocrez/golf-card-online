import { useEffect, useState } from 'react'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { Card } from '@/models/Card'

type DeckCardProps = {
  card: Card
  isCurrentPlayer: boolean
}

export function DeckCard({ card, isCurrentPlayer }: DeckCardProps) {
  const { faceUp, code, images } = card
  const { socket } = useSocketConnection()
  const { lobby, isReplaceMode, suspendedCard, isLoading } = useGameContext()

  const [isFaceDown, setIsFaceDown] = useState(!faceUp)

  const handleClick = () => {
    if (isReplaceMode) {
      if (
        !isCurrentPlayer ||
        !suspendedCard ||
        lobby?.currentTurn !== socket.id
      ) {
        return
      }

      const payload = {
        drawnCard: suspendedCard,
        cardToReplace: card,
        playerId: socket.id,
        lobbyId: lobby?.id ?? '',
      }

      socket.emit('replace-card', payload)
      return
    }

    if (
      !isFaceDown ||
      !isCurrentPlayer ||
      lobby?.currentTurn !== socket.id ||
      isLoading
    ) {
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

  const cardClasses = `card hover:cursor-pointer ${
    isFaceDown ? 'flipped' : ''
  } ${isReplaceMode && isCurrentPlayer ? 'highlight-aura' : ''} `

  return (
    <div className="card-container" onClick={handleClick}>
      <div className={cardClasses}>
        <div className="card-front">
          <img className="w-full h-full" src={images.png} alt={code} />
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  )
}
