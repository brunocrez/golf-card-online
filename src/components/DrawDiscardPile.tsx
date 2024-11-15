import { Card } from '@/models/Card'
import { CreateLobbyResponse } from '@/models/Lobby'
import { cardSize } from '@/utils/cardSize'

interface DrawDiscardPileProps {
  lobby: CreateLobbyResponse | undefined
  isReplaceMode: boolean
  drewFromDeck: boolean
  onClick: (card: Card | undefined) => void
}

export function DrawDiscardPile({
  lobby,
  isReplaceMode,
  drewFromDeck,
  onClick,
}: DrawDiscardPileProps) {
  const lastCardFromPile =
    lobby && lobby.discardPile[lobby.discardPile.length - 1]

  const setStyle = () => {
    let style = `${cardSize} hover:cursor-pointer `

    if (isReplaceMode && !drewFromDeck) {
      style += 'transform scale-110 shadow-lg'
    }

    if (drewFromDeck) {
      style += 'highlight-aura'
    }

    return style
  }

  return (
    <div className={setStyle()} onClick={() => onClick(lastCardFromPile)}>
      <img className="w-full h-full" src={lastCardFromPile?.images.png} />
    </div>
  )
}
