import { Card } from '@/models/Card'
import { DeckCard } from './DeckCard'

interface PlayerBoardProps {
  cards: Card[]
  isCurrentPlayer: boolean
}

export function PlayerBoard({ cards, isCurrentPlayer }: PlayerBoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2">
      {cards.map((card) => (
        <DeckCard
          key={card.code}
          code={card.code}
          image={card.images.png}
          alt={card.code}
          faceUp={card.faceUp}
          isCurrentPlayer={isCurrentPlayer}
        />
      ))}
    </div>
  )
}
