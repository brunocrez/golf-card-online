import { LobbyPlayer } from '@/components/LobbyPlayer'
import { PlayerBoard } from '@/components/PlayerBoard'
import { mockedCards } from '@/mocks/cards'
import { avatar64 } from '@/utils/avatar'

export function Game() {
  return (
    <div className="h-screen flex justify-center items-center px-2">
      <div className="flex flex-col gap-4">
        <LobbyPlayer
          nickname="felipexavier"
          image={avatar64}
          width={10}
          height={10}
        />
        <PlayerBoard cards={mockedCards} />

        <div className="flex justify-center gap-4">
          <div className="w-[95px] h-[132px]">
            <img
              className="w-full h-full"
              src="https://deckofcardsapi.com/static/img/AS.png"
            />
          </div>
          <div className="image-back-card w-[95px] h-[132px] bg-no-repeat bg-contain bg-center"></div>
        </div>

        <PlayerBoard cards={mockedCards} />
        <LobbyPlayer nickname="bruno" image={avatar64} width={10} height={10} />
      </div>
    </div>
  )
}
