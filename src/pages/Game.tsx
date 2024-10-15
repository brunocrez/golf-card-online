import { LobbyPlayer } from '@/components/LobbyPlayer'
import { PlayerBoard } from '@/components/PlayerBoard'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { getCurrentPlayer } from '@/utils/getCurrentPlayer'
import { useEffect } from 'react'

export function Game() {
  const { socket } = useSocketConnection()
  const { lobby, setLobby } = useGameContext()
  const { currPlayer, enemy } = getCurrentPlayer(socket, lobby?.players || [])

  useEffect(() => {
    socket.on('updated-game', (data) => {
      setLobby(data)
    })

    return () => {
      socket.off('updated-game')
    }
  }, [socket, setLobby])

  return (
    <div className="h-screen flex justify-center items-center px-2">
      <div className="flex flex-col gap-4">
        <LobbyPlayer
          nickname={enemy.nickname}
          image={enemy.image}
          width={10}
          height={10}
        />
        <PlayerBoard cards={enemy.cards ?? []} isCurrentPlayer={false} />

        <div className="flex justify-center gap-4">
          <div className="w-[95px] h-[132px]">
            <img
              className="w-full h-full"
              src="https://deckofcardsapi.com/static/img/AS.png"
            />
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
