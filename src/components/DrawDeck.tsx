import { Card } from '@/models/Card'
import { Spinner } from './Spinner'

interface DrawDeckProps {
  onClick: () => void
  suspendedCard: Card | undefined
  isLoading: boolean
  drewFromDeck: boolean
}

export function DrawDeck({
  onClick,
  suspendedCard,
  isLoading,
  drewFromDeck,
}: DrawDeckProps) {
  return (
    <div
      className="w-[95px] h-[132px] relative hover:cursor-pointer"
      onClick={onClick}
    >
      {isLoading ? (
        <Spinner />
      ) : suspendedCard && drewFromDeck ? (
        <div className="card">
          <div className="card-front">
            <img
              className="w-full h-full"
              src={suspendedCard?.images.png}
              alt={suspendedCard?.code}
            />
          </div>
        </div>
      ) : (
        // Mostrar o verso do deck quando não há carta suspensa
        <div className="image-back-card w-full h-full bg-no-repeat bg-contain bg-center"></div>
      )}
    </div>
  )
}
