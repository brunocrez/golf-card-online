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
          card={card}
          isCurrentPlayer={isCurrentPlayer}
        />
      ))}
    </div>
  )
}
