import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from '@/hooks/useGameContext'
import { Routes } from '@/routes'
import { useWindowSize } from '@/hooks/useWindowSize'

import Confetti from 'react-confetti'
import { Trophy } from 'lucide-react'
import { trophyColors } from '@/utils/trophyColors'

export function AwardPage() {
  const navigate = useNavigate()
  const { lobby } = useGameContext()
  const { width, height } = useWindowSize()

  useEffect(() => {
    console.log(lobby)
    if (!lobby) {
      return navigate(Routes.PRE_LOBBY)
    }
  }, [lobby, navigate])

  return (
    <>
      <Confetti width={width} height={height} />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="flex flex-col gap-8">
          {lobby?.scoreBoard?.slice(0, 3).map((p, idx) => (
            <div key={p.playerId} className="flex gap-5 items-center">
              <div className="bg-white flex justify-center items-center rounded-full mb-2 w-16 h-16">
                <span className="text-xs mr-1">{idx + 1}º</span>
                <Trophy size={24} className={trophyColors[idx]} />
              </div>
              <div className="flex flex-col items-center">
                <img className="w-20 h-20 mb-2" src={p.image} alt="logo" />
                <p className="text-sm mb-2">{p.nickname}</p>
                <div className="bg-green-600 text-white flex justify-center items-center rounded-full w-8 h-8">
                  <span className="text-white text-sm">{p.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
