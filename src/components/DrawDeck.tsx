import { Spinner } from './Spinner'
import { cardSize } from '@/utils/cardSize'
import { useGameContext } from '@/hooks/useGameContext'

interface DrawDeckProps {
  onClick: () => void
  isLoading: boolean
}

export function DrawDeck({ onClick, isLoading }: DrawDeckProps) {
  const { lobby } = useGameContext()
  return (
    <div
      className={`${cardSize} relative hover:cursor-pointer`}
      onClick={onClick}
    >
      {isLoading ? (
        <Spinner />
      ) : lobby?.drawnCard ? (
        <div className={`card ${cardSize}`}>
          <div className="card-front">
            <img
              className="w-full h-full"
              src={lobby?.drawnCard?.images.png}
              alt={lobby?.drawnCard?.code}
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
