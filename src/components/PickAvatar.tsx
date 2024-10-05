import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { generateAvatars } from '@/utils/generateAvatars'
import { Routes } from '@/routes'

export function PickAvatar() {
  const navigate = useNavigate()
  const [currIndex, setCurrIndex] = useState(0)
  const [avatars, setAvatars] = useState<string[]>([])

  useEffect(() => {
    const generatedAvatars = generateAvatars()
    setAvatars(generatedAvatars)
  }, [])

  const handleClickArrowLeft = () => {
    if (currIndex > 0) {
      setCurrIndex((prev) => prev - 1)
    }
  }

  const handleClickArrowRight = () => {
    if (currIndex < avatars.length - 1) {
      setCurrIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-col gap-6 px-5">
      <h2
        className="text-center md:text-xl"
        style={{ fontFamily: "'Press Start 2P'" }}
      >
        escolha seu avatar
      </h2>
      <div className="flex gap-4 items-center justify-center">
        <Button
          onClick={handleClickArrowLeft}
          className="bg-transparent hover:bg-transparent p-0"
        >
          <CircleArrowLeft
            size={48}
            className="hover:cursor-pointer hover:scale-105"
            color="var(--light-pink)"
          />
        </Button>

        <img
          src={avatars[currIndex]}
          alt="avatar"
          className="w-36 h-36 md:w-full md:h-full"
        />

        <Button
          onClick={handleClickArrowRight}
          className="bg-transparent hover:bg-transparent p-0"
        >
          <CircleArrowRight
            size={48}
            className="hover:cursor-pointer hover:scale-105"
            color="var(--light-pink)"
          />
        </Button>
      </div>
      <Input placeholder="digite o seu apelido" />

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Button
          className="bg-indigo-500 text-white font-bold hover:bg-indigo-400 w-full"
          onClick={() => navigate(Routes.CREATE_ROOM)}
        >
          criar nova sala
        </Button>
        <Button className="bg-green-500 text-white font-bold hover:bg-green-400 w-full">
          buscar sala
        </Button>
      </div>
    </div>
  )
}
