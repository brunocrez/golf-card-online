import { useState } from 'react'

interface DeckCardProps {
  image: string
  alt: string
  faceUp: boolean
}

export function DeckCard({ image, alt, faceUp }: DeckCardProps) {
  const [isFlipped, setIsFlipped] = useState(!faceUp)

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  const cardClasses = `card hover:cursor-pointer ${isFlipped ? 'flipped' : ''}`

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
