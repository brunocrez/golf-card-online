import { Card } from '@/models/Card'
import { DeckCard } from './DeckCard'
import { ColumnScore } from './ColumnScore'

interface PlayerBoardProps {
  cards: Card[]
  isCurrentPlayer: boolean
  scoreArray: number[]
  scorePosition: 'top' | 'bottom'
}

export function PlayerBoard({
  cards,
  isCurrentPlayer,
  scoreArray,
  scorePosition,
}: PlayerBoardProps) {
  const gridTemplateRows =
    scorePosition === 'top' ? '24px auto auto' : 'auto auto 24px'

  return (
    <div
      className="grid grid-cols-3 grid-rows-3 gap-2 justify-center"
      style={{ gridTemplateRows }}
    >
      {scorePosition === 'top' && <ColumnScore scoreArray={scoreArray} />}

      {cards.map((card) => (
        <DeckCard
          key={card.code}
          card={card}
          isCurrentPlayer={isCurrentPlayer}
        />
      ))}

      {scorePosition === 'bottom' && <ColumnScore scoreArray={scoreArray} />}
    </div>
  )
}
