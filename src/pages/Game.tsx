import { useEffect } from 'react'
import { LobbyPlayer } from '@/components/LobbyPlayer'
import { PlayerBoard } from '@/components/PlayerBoard'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { getCurrentPlayer } from '@/utils/getCurrentPlayer'
import { Card } from '@/models/Card'

export function Game() {
  const { socket } = useSocketConnection()
  const { lobby, setLobby, isReplaceMode, setIsReplaceMode, setSuspendedCard } =
    useGameContext()
  const { currPlayer, enemy } = getCurrentPlayer(socket, lobby?.players ?? [])

  useEffect(() => {
    socket.on('updated-game', (data) => {
      setLobby(data)
      setIsReplaceMode(false)
      setSuspendedCard(undefined)
    })

    return () => {
      socket.off('updated-game')
    }
  }, [socket, setLobby, setIsReplaceMode, setSuspendedCard])

  function handleClickPile(card: Card | undefined) {
    setIsReplaceMode(true)
    setSuspendedCard(card)
  }

  function exitReplaceMode() {
    setIsReplaceMode(false)
    setSuspendedCard(undefined)
  }

  const lastCardFromPile =
    lobby && lobby.discardPile[lobby.discardPile.length - 1]

  return (
    <div
      className="h-screen flex justify-center items-center px-2"
      onClick={exitReplaceMode}
    >
      {isReplaceMode && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-10" />
      )}

      <div
        className="flex flex-col gap-4 relative z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <LobbyPlayer
          nickname={enemy.nickname}
          image={enemy.image}
          width={10}
          height={10}
        />
        <PlayerBoard cards={enemy.cards ?? []} isCurrentPlayer={false} />

        <div className="flex justify-center gap-4">
          <div
            className={`w-[95px] h-[132px] hover:cursor-pointer ${
              isReplaceMode ? 'transform scale-110 shadow-lg' : ''
            }`}
            onClick={() => handleClickPile(lastCardFromPile)}
          >
            <img className="w-full h-full" src={lastCardFromPile?.images.png} />
          </div>
          <div className="image-back-card w-[95px] h-[132px] bg-no-repeat bg-contain bg-center"></div>
        </div>

        <PlayerBoard cards={currPlayer.cards ?? []} isCurrentPlayer={true} />
        <LobbyPlayer
          nickname={currPlayer.nickname}
          image={currPlayer.image}
          width={10}
          height={10}
        />
      </div>
    </div>
  )
}
