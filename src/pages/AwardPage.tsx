import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from '@/hooks/useGameContext'
import { Routes } from '@/routes'
import { useWindowSize } from '@/hooks/useWindowSize'

import Confetti from 'react-confetti'
import { Trophy } from 'lucide-react'

export function AwardPage() {
  const navigate = useNavigate()
  const { lobby } = useGameContext()
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (!lobby) {
      return navigate(Routes.PRE_LOBBY)
    }
  }, [lobby, navigate])

  const [p1, p2, p3] = lobby?.scoreBoard ?? []

  return (
    <>
      <Confetti width={width} height={height} />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="flex">
          {/* Segundo Lugar */}
          <div className="bg-indigo-700 w-24 h-36 self-end rounded-t-md shadow-2xl flex flex-col items-center pt-3 relative">
            <div className="w-8 h-8 bg-slate-500 rounded-full flex justify-center items-center mb-2">
              <Trophy size={20} className="text-white" />
            </div>
            <p className="text-white font-bold text-xs mb-2">{p2?.nickname}</p>
            <span className="text-white font-bold text-xs">{p2?.score}</span>
            <div className="absolute -top-12">
              <img className="w-10 h-10" src={p2?.image} alt="avatar" />
            </div>
          </div>

          {/* Primeiro Lugar */}
          <div className="bg-indigo-700 w-24 h-44 self-end rounded-t-md shadow-2xl flex flex-col items-center pt-3 relative">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex justify-center items-center mb-2">
              <Trophy size={20} className="text-white" />
            </div>
            <p className="text-white font-bold text-xs mb-2">{p1?.nickname}</p>
            <span className="text-white font-bold text-xs">{p1?.score}</span>
            <div className="absolute -top-12">
              <img className="w-10 h-10" src={p1?.image} alt="avatar" />
            </div>
          </div>

          {/* Terceiro Lugar */}
          {p3 && (
            <div className="bg-indigo-700 w-24 h-24 self-end rounded-t-md shadow-2xl flex flex-col items-center pt-2 relative">
              <div className="w-8 h-8 bg-yellow-700 rounded-full flex justify-center items-center mb-2">
                <Trophy size={20} className="text-white" />
              </div>
              <p className="text-white font-bold text-xs mb-2">
                {p3?.nickname}
              </p>
              <span className="text-white font-bold text-xs">{p3?.score}</span>
              <div className="absolute -top-12">
                <img className="w-10 h-10" src={p3?.image} alt="avatar" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
