import { useEffect, useState } from 'react'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { generateAvatars } from '@/utils/generateAvatars'

export function PickAvatar() {
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
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center justify-center">
        <Button
          onClick={handleClickArrowLeft}
          className="bg-transparent hover:bg-transparent"
        >
          <CircleArrowLeft
            size={48}
            className="hover:cursor-pointer hover:scale-105"
            color="#f0abfc"
          />
        </Button>

        <img src={avatars[currIndex]} />

        <Button
          onClick={handleClickArrowRight}
          className="bg-transparent hover:bg-transparent"
        >
          <CircleArrowRight
            size={48}
            className="hover:cursor-pointer hover:scale-105"
            color="#f0abfc"
          />
        </Button>
      </div>
      <Input placeholder="digite o seu nickname" />
      <div className="flex justify-between gap-4">
        <Button className="bg-indigo-500 text-white font-bold w-44 hover:bg-indigo-400">
          criar nova sala
        </Button>
        <Button className="bg-green-500 text-white font-bold w-44 hover:bg-green-400">
          buscar sala
        </Button>
      </div>
    </div>
  )
}
