import { GetLobbyResponse } from '@/models/Lobby'
import { Trophy } from 'lucide-react'
import { LobbyPlayer } from './LobbyPlayer'

interface ScoreBoardProps {
  lobby: GetLobbyResponse | undefined
}

export function ScoreBoard({ lobby }: ScoreBoardProps) {
  const currTurn = lobby?.currentTurn
  const currPlayer = lobby?.players.find((p) => p.playerId === currTurn)

  return (
    <div className="w-full bg-slate-400 py-4 px-6 flex gap-8 overflow-x-auto">
      <div className="flex flex-col border-r-[1px] pr-6 border-r-gray-300">
        <h2 className="text-white font-bold mb-2">turno</h2>
        <LobbyPlayer
          nickname={currPlayer?.nickname ?? ''}
          image={currPlayer?.image ?? ''}
          width={10}
          height={10}
        />
      </div>
      <div className="flex flex-col border-r-[1px] pr-6 border-r-gray-300">
        <h2 className="text-white font-bold mb-2">rodadas</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx < 3 ? 'bg-green-600' : 'bg-white'
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full mb-2 w-14 h-14">
          <span className="text-yellow-400 font-bold">1º</span>
          <Trophy className="text-yellow-400" size={18} />
        </div>
        <p className="text-white font-bold">brunão</p>
        <p className="font-bold text-white">5</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full mb-2 w-14 h-14">
          <span className="text-gray-800 font-bold">2º</span>
          <Trophy className="text-gray-800" size={18} />
        </div>
        <p className="text-white font-bold">paulaa</p>
        <p className="font-bold text-white">7</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full mb-2 w-14 h-14">
          <span className="text-yellow-800 font-bold">3º</span>
          <Trophy className="text-yellow-800" size={18} />
        </div>
        <p className="text-white font-bold">felipe</p>
        <p className="font-bold text-white">12</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full mb-2 w-14 h-14">
          <span className="font-bold">4º</span>
        </div>
        <p className="text-white font-bold">felipe</p>
        <p className="font-bold text-white">44</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full mb-2 w-14 h-14">
          <span className="font-bold">5º</span>
        </div>
        <p className="text-white font-bold">felipe</p>
        <p className="font-bold text-white">44</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white flex justify-center items-center rounded-full mb-2 w-14 h-14">
          <span className="font-bold">6º</span>
        </div>
        <p className="text-white font-bold">felipe</p>
        <p className="font-bold text-white">44</p>
      </div>
    </div>
  )
}
