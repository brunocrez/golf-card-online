import { Card } from '@/models/Card'
import { DeckCard } from './DeckCard'

interface PlayerBoardProps {
  cards: Card[]
}

export function PlayerBoard({ cards }: PlayerBoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2">
      {cards.map((card) => (
        <DeckCard
          key={card.code}
          image={card.images.png}
          alt={card.code}
          faceUp={card.faceUp}
        />
      ))}
    </div>
  )
}
